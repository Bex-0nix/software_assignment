import { submit, getAll, getSingle, getCustom, apiRequestHandler, getCurrentDate } from '../../db';

export default async function appointmentHandler(req, res) {
  const route = "appointments";
  let extra = {}
  let dailySlots = null;
  let appointment = req.body;
  const {service, date} = req.query;
  if (req.method == "POST"){
    const timeSlotsData = await getAll("timeSlots");
    const timeSlots = timeSlotsData.data[timeSlotsData.data.findIndex(elem => elem.service == appointment.service)];
    appointment["id"] = generateUniqueAppointmentId();
    checkDuplicateId();
    verifyResident();
    verifyDate();
    verifyTimeSlot(timeSlots["timeSlots"]);
  }
  else if (req.method == "PUT" || req.method == "DELETE"){
    const appointmentData = getSingle("appointments", appointment.id);
    if (!appointmentData.data){
      res.status(200).json({message: "Invalid ID"})
    }
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
      dailySlots = deriveAvailableSlots(schedule.dailySlots);
    }
    extra["dailySlots"] = timeSlots["timeSlots"];
    console.log(extra.dailySlots)
  }
  if (req.method != "GET"){
    updateSchedule(timeSlots["timeSlots"], timeSlots.serviceProviderCount, timeSlots.lastUpdate.substring(0,10));
    
  }
  
  apiRequestHandler(req, res, route, appointment, extra);


































  async function updateSchedule(timeSlots, numberOfServiceProviders, lastUpdate){
    const schedules = await getCustom("schedules", {key: "date", value: appointment.date})
    let schedule = null;
    // const timeSlots = await get
    if (schedules.data.length == 0){
      if (req.method == "POST"){
        schedule = createNewSchedule(timeSlots, numberOfServiceProviders);
        schedule = addAppointment(schedule, numberOfServiceProviders)
        schedule.status = "open"
        const scheduleResponse = await submit(schedule, req.method, "schedules");
      }
      else{
        res.status(200).json({message: "Empty schedule"})
      }
    }
    else{
      schedule = schedules.data[schedules.data.findIndex(elem => elem.service == appointment.service)];
      if (req.method == "DELETE"){
        schedule = removeAppointment(schedule, id)
        const scheduleResponse = await submit(schedule, "PUT", "schedules");
      }
      else if (req.method == "POST"){
        schedule = addAppointment(schedule, numberOfServiceProviders);
        const scheduleResponse = await submit(schedule, "PUT", "schedules");
        
      }
      else if (req.method == "PUT"){
        schedule = addAppointment(schedule, numberOfServiceProviders) 
        const scheduleResponse = await submit(schedule, "PUT", "schedules");
        const prevAppointmentData = await getSingle("appointments", appointment.id);
        const prevAppointment = prevAppointmentData.data;
        const prevScheduleData = await getCustom("schedules", {key: date, value: prevAppointment.date});
        let prevSchedule = prevScheduleData.data[prevScheduleData.data.findIndex(elem => elem.service == prevAppointment.service)];
        if (dateIsLessThan(lastUpdate, prevAppointment)){
        }
        else {
          
        }
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
      res.status(200).json({message: "duplicate appointment"})
    }
  }
  async function verifyResident(){
    let temp = await getSingle("residents", appointment.residentId)
    if (!temp.data){
      res.status(200).json({message: "invalid resident"})
    }
  }
  function verifyTimeSlotAvailability(){
    
  }
  function addAppointment(schedule){
    let tempApps = [...schedule.dailySlots[schedule.dailySlots.findIndex(elem => elem[0] == appointment.timeSlot)][1].appointments];
    console.log(schedule.dailySlots[schedule.dailySlots.findIndex(elem => elem[0] == appointment.timeSlot)][1].appointments)
    for (let i = 0; i < tempApps.length; i++){
      if (tempApps[i] == ""){
        tempApps[i] = appointment.id
        if (i == tempApps.length - 1){
          schedule.dailySlots[schedule.dailySlots.findIndex(elem => elem[0] == appointment.timeSlot)][1].status = "full";
        }
        break;
      }
    }
    schedule.dailySlots[schedule.dailySlots.findIndex(elem => elem[0] == appointment.timeSlot)][1].appointments = [...tempApps];
    return schedule;
  }
  function rearrangeSlots(timeSlots, dailySlots ){
    let newDailySlots = [];
    let prevAppointmentSlots = [];
    for (let dailySlot of dailySlots){
      if (dailySlot[1].status != "empty"){
        prevAppointmentSlots.push(dailySlot)
      }
    }
    let arr = new Array(4).fill("")
    for (let timeSlot of timeSlots){
      newDailySlots.push([timeSlot, {
        status: "empty",
        appointments: [...arr]
      }])
    }
    for (let elem in prevAppointmentSlots){
      const matchingIntervals = findMatchingIntervals(elem[0], timeSlots)
      for (let matchingInterval of matchingIntervals){

        for (let i = 0; i < elem[1].appointments.length; i++){
          if (elem[1].appointments[i] != ""){
            newDailySlots[newDailySlots.findIndex(element => element[0] == matchingInterval)][1].appointments[i] = elem[1].appointments[i];
          }
        } 

      }
    }
    return [newDailySlots, prevAppointmentSlots];
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

    if (slot1Start < slot2End && slot1End > slot2Start){
      return true;
    }
    else {
      return false;
    }
  }
  async function verifyTimeSlot(timeSlots){
    console.log(appointment.timeSlot)
    let found = false;
    for (let timeSlot of timeSlots){
      if (timeSlot[0] == appointment.timeSlot) found = true;  
    }
    if (!found){
      res.status(200).json({message: "invalid timeslot"})
    }
  }

  function verifyDate(){
    const today = getCurrentDate();
    const appDate = {
      year : parseInt(appointment.date.substring(0, 4)),
      month : parseInt(appointment.date.substring(5, 7)),
      day : parseInt(appointment.date.substring(8, 10))
    };
    if ((appDate.year < today.year) || (appDate.year == today.year && appDate.month < today.month) || (appDate.year == today.year && appDate.month == today.month && appDate.day < today.day)){
      res.status(200).json({message: "invalid date"});
    }
    if (calculateMonthGap(appDate, today) > 8){
      res.status(200).json({message: "Date is past the forward limit. If available times are full, please wait patiently unitl we can accomodate your request"});
    }
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
