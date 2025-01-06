'use server'
import { submit, getAll, getSingle, getCustom, apiRequestHandler, getCurrentDate } from '../../db';

export default async function appointmentHandler(req, res) {
  const route = "appointments";
  let extra = {}
  let dailySlots = null;
  let appointment = req.body;
  const {service, date} = req.query;
  if (req.method == "POST" || req.method == "PUT" || req.method == "DELETE"){

    const timeSlotsData = await getAll("timeSlots");
    const timeSlots = timeSlotsData.data[timeSlotsData.data.findIndex(elem => elem.service == appointment.service)];
    if (req.method == "POST"){
      const dataError = await validateData(timeSlots["timeSlots"]);
      if (dataError) return res.status(400).json({message: dataError})
      appointment["id"] = generateUniqueAppointmentId();
      const error = await checkDuplicateId();
      if (error) return res.status(400).json({message: error})
    }
    else if (req.method == "PUT" || req.method == "DELETE"){
      const appointmentData = await getSingle("appointments", appointment.id);
      if (!appointmentData.data){
        return res.status(400).json({message: "Invalid ID"})

      }
    }
    const scheduleError = await updateSchedule(timeSlots["timeSlots"], timeSlots.serviceProviderCount, timeSlots.lastUpdate.substring(0,10));
    if (scheduleError) return res.status(400).json({message: scheduleError})
  }
  else if (req.method == "GET"){
    const timeSlotsData = await getAll("timeSlots");
    const timeSlots = timeSlotsData.data[timeSlotsData.data.findIndex(elem => elem.service == service)];
    const schedules = await getCustom("schedules", {key: "date", value: date})
    if (schedules.data.length == 0){
      dailySlots = [...timeSlots["timeSlots"]]
    }
    else{
      const schedule = schedules.data[schedules.data.findIndex(elem => elem.service == service)]
      schedule ? dailySlots = deriveAvailableSlots(schedule.dailySlots) : dailySlots = [...timeSlots["timeSlots"]];
    }
    extra["dailySlots"] = timeSlots["timeSlots"];
  }
  else{
    return res.status(400).json({message: "method not allowed"})
  }
  
  apiRequestHandler(req, res, route, appointment, extra);
  return;

  async function validateData(timeSlot){
    let message = null;
    message = verifyDate()
    if (message) return message;
    message = await verifyResident()
    if (message) return message;
    message = await verifyTimeSlot(timeSlot)
    if (message) return message;
    return message;
  }
  async function updateSchedule(timeSlots, numberOfServiceProviders, lastUpdate){
    const schedules = await getCustom("schedules", {key: "date", value: appointment.date})
    let schedule = null;
    schedule = schedules.data[schedules.data.findIndex(elem => elem.service == appointment.service)];
    if (!schedule){
      if (req.method == "POST"){
        schedule = createNewSchedule(timeSlots, numberOfServiceProviders);
        schedule = addAppointment(schedule, numberOfServiceProviders)
        schedule.status = "open"
        const error = verifyTimeSlotAvailability(schedule)
        if (error) return error
        const scheduleResponse = await submit(schedule, req.method, "schedules");
        if (!scheduleResponse.data) return scheduleResponse.message
      }
      else{
        return "Empty schedule";
      }
    }
    else{
      if (req.method == "DELETE"){
        schedule = removeAppointment(schedule, appointment.id, appointment.timeSlot, dateIsLessThan(lastUpdate, appointment.date))
        const scheduleResponse = await submit(schedule, "PUT", "schedules");
        if (!scheduleResponse.data) return scheduleResponse.message;
        const cancelResponse =  await submit(appointment, "POST", "cancelledAppointments");
        if (!cancelResponse.data) return cancelResponse.message;
      }
      else if (req.method == "POST"){
        const error = verifyTimeSlotAvailability(schedule)
        if (error) return error
        schedule = addAppointment(schedule, numberOfServiceProviders);
        const scheduleResponse = await submit(schedule, "PUT", "schedules");
        if (!scheduleResponse.data) return scheduleResponse.message
        
      }
      else if (req.method == "PUT"){
        const error = verifyTimeSlotAvailability(schedule)
        if (error) return error
        console.log(appointment)
        const prevAppointmentData = await getSingle("appointments", appointment.id);
        if (!prevAppointmentData.data) return prevAppointmentData.message
        const prevAppointment = prevAppointmentData.data;
        console.log(prevAppointment.date)
        const prevScheduleData = await getCustom("schedules", {key: "date", value: prevAppointment.date});
        console.log(prevScheduleData.data[0])
        // const prevScheduleData = await getAll("schedules");
        if (!prevScheduleData.data) return prevScheduleData.message
        let prevSchedule = prevScheduleData.data[prevScheduleData.data.findIndex(elem => elem.service == prevAppointment.service)];
        prevSchedule = removeAppointment(prevSchedule, prevAppointment.id, prevAppointment.timeSlot, dateIsLessThan(lastUpdate, prevAppointment.date))
        schedule = addAppointment(prevSchedule, numberOfServiceProviders) 
        const scheduleResponse = await submit(schedule, "PUT", "schedules");
      }
    }
    
  }

  function createNewSchedule(timeSlots, numberOfServiceProviders){
    let tempSlots = []
    let arr = new Array(numberOfServiceProviders).fill("")
    for (let timeSlot of timeSlots){
      tempSlots.push([timeSlot, {
        status: "empty",
        appointments: arr
      }])
    }
    return {
      date: appointment.date,
      service: appointment.service,
      status: "empty",
      updated: false,
      dailySlots: tempSlots
    }
  }
  function generateUniqueAppointmentId(){
    let id = `${appointment.service[0]}${appointment.residentId.concat(appointment.date.concat(appointment.timeSlot)).match(/\d+/g).join('')}`;
    return id;
  }
  async function checkDuplicateId(){
    let temp = await getSingle("appointments", appointment.id)
    if (temp.data){
      return "duplicate appointment";
    }
    return null;
  }
  async function verifyResident(){
    let temp = await getSingle("residents", appointment.residentId)
    if (!temp.data){
     return "invalid resident"
    }
    return null;
  }
  function verifyTimeSlotAvailability(schedule){
    let dailySlots = deriveAvailableSlots(schedule.dailySlots);
    if (dailySlots.includes(appointment.timeSlot)) return null;
    return "Unavailable timeSlot"
  }
  function addAppointment(schedule){
    let tempApps = [...schedule.dailySlots[schedule.dailySlots.findIndex(elem => elem[0] == appointment.timeSlot)][1].appointments];
    for (let i = 0; i < tempApps.length; i++){
      if (tempApps[i] == ""){
        tempApps[i] = appointment.id
        schedule.dailySlots[schedule.dailySlots.findIndex(elem => elem[0] == appointment.timeSlot)][1].status = "open"
        if (i == tempApps.length - 1){
          schedule.dailySlots[schedule.dailySlots.findIndex(elem => elem[0] == appointment.timeSlot)][1].status = "full";
        }
        break;
      }
    }
    schedule.dailySlots[schedule.dailySlots.findIndex(elem => elem[0] == appointment.timeSlot)][1].appointments = [...tempApps];
    return schedule;
  }
  function removeAppointment(schedule, id, timeSlot, updated){
    if (!updated){
      console.log(schedule)
      let appointments = schedule.dailySlots[schedule.dailySlots.findIndex(elem => elem[0] == timeSlot)][1].appointments
      appointments[appointments.findIndex(elem => elem == id)] = "";
      schedule.dailySlots[schedule.dailySlots.findIndex(elem => elem[0] == timeSlot)][1].status = "open"
      let empty = false;
      for (let appointment of appointments){
        if (appointment != ""){
          empty = true;
        }
      }
      if (empty) {
        schedule.dailySlots[schedule.dailySlots.findIndex(elem => elem[0] == timeSlot)][1].status = "empty"
      }
    }
    else{
      let updatedAppointments = schedule.updatedAppointments; 
      let appointments = updatedAppointments[updatedAppointments.findIndex(elem => elem[0] == timeSlot)][1];
      let appointmentIndex = appointments.findIndex(elem => elem == id)
      const matchingIntervals = findMatchingIntervals(timeSlot, updatedAppointments);
      let found = false; 
      for (let matchingInterval of matchingIntervals){
        if (updatedAppointments[updatedAppointments.findIndex(elem => elem[0] == matchingInterval)][1].appointments[appointmentIndex] != ""){
          found = true;
        }
      }
      if (!found){
        appointments[appointmentIndex] = "";
      }
    }
    return schedule;
  }
  function deriveAvailableSlots(dailySlots){
    let availableTimeSlots = []
    for (let dailySlot of dailySlots){
      if (dailySlot[1].status != "full"){
        availableTimeSlots.push(dailySlot[0])
      }
    }
    return availableTimeSlots;
  }
  function findMatchingIntervals(slot, timeSlots){
    let matchingIntervals = []
    for (let timeSlot of timeSlots){
      if (clashes(slot, timeSlot)){
        matchingIntervals.push(timeSlot);
      }
    }
    return matchingIntervals;
  }
  function clashes(slot1, slot2){
    const slot1StartHour = parseInt(slot1.substring(0,2))
    const slot1StartMinute = parseInt(slot1.substring(3,5))
    const slot1StartMeridian = slot1.substring(6,8)
    const slot1EndHour = parseInt(slot1.substring(11,13))
    const slot1EndMinute = parseInt(slot1.substring(14,16))
    const slot1EndMeridian = slot1.substring(17,19)
    const slot2StartHour = parseInt(slot2.substring(0,2))
    const slot2StartMinute = parseInt(slot2.substring(3,5))
    const slot2StartMeridian = slot2.substring(6,8)
    const slot2EndHour = parseInt(slot2.substring(11,13))
    const slot2EndMinute = parseInt(slot2.substring(14,16))
    const slot2EndMeridian = slot2.substring(17,19)
    if (slot1StartHour == 12 && slot1StartMeridian == "AM") slot1StartHour = 0;
    if (slot1EndHour == 12 && slot2StartMeridian == "AM") slot1EndHour = 0;
    if (slot2StartHour == 12 && slot1EndMeridian == "AM") slot2StartHour = 0;
    if (slot2EndHour == 12 && slot2EndMeridian == "AM") slot2EndHour = 0;
    let slot1Start = slot1StartHour * 60 + slot1StartMinute;
    let slot2Start = slot2StartHour * 60 + slot2StartMinute;
    let slot1End = slot1EndHour * 60 + slot1EndMinute;
    let slot2End = slot2EndHour * 60 + slot2EndMinute;

    if (slot1Start <= slot2End && slot1End >= slot2Start){
      return true;
    }
    return false;
  }
  async function verifyTimeSlot(timeSlots){
    let found = false;
    for (let timeSlot of timeSlots){
      if (timeSlot == appointment.timeSlot) found = true;  
    }
    if (!found){
      return "invalid timeslot";
    }
    return null;
  }

  function verifyDate(){
    const today = getCurrentDate();
    const appDate = {
      year : parseInt(appointment.date.substring(0, 4)),
      month : parseInt(appointment.date.substring(5, 7)),
      day : parseInt(appointment.date.substring(8, 10))
    };
    if ((appDate.year < today.year) || (appDate.year == today.year && appDate.month < today.month) || (appDate.year == today.year && appDate.month == today.month && appDate.day < today.day)){
      res.status(400).json({message: "invalid date"});
      return false;
    }
    if (calculateMonthGap(appDate, today) > 8){
      return "Date is past the forward limit. If available times are full, please wait patiently unitl we can accomodate your request";
    }
    return null;
  }

  function calculateMonthGap(date1, date2){
    let x = new Date(`${date1.month}/${date1.day}/${date1.year}`);
    let y = new Date(`${date2.month}/${date2.day}/${date2.year}`);
    let diff = Math.abs(x-y) / 1000 / 60 / 60 / 24 / 30;
    return diff;
  }

  function dateIsLessThan(date1, date2){
    let x = new Date(`${date1.month}/${date1.day}/${date1.year}`);
    let y = new Date(`${date2.month}/${date2.day}/${date2.year}`);
    return x - y < 0;
  }
}
