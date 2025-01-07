import { getAll, getSingle, getCustom, apiRequestHandler, submit } from "../../db";

export default async function timeSlotHandler(req, res){
    const services = ['certificateIssue, idIssue']
    const route = "timeSlots";
    let timeSlot = req.body;
    if (!services.includes(timeSlot.service)) return res.status(400).json({message: "invalid service"})
    
    const verificationData = await getCustom("timeSlots", {key: "service", value: timeSlot.service});
    const timeSlotData = verificationData.data[0];
    if (req.method == "PUT"){
        if (!timeSlotData) {
            return res.status(400).json({message: "timeSlot not found"})
        }
        if (timeSlotData.interval <= 0){
            return res.status(400).json({message: "invalid Interval"})
        }
    }
    else{
        res.status(200).json({message: "Method not supported"})
    }

    const schedulesData = await getCustom("schedules", {key: "service", value: timeSlot.service});
    let schedules = schedulesData.data;
    if (schedules.length > 0){
        for (let schedule of schedules){
            const data = rearrangeSlots(timeSlot, schedules.dailySlots)
            if (schedule.updatedAppointments){
                schedule.updatedAppointments.push([...data[1]]);
            }
            else{
                schedule.updatedAppointments = data[1];
            }
            schedule.dailySlots = data[0];
            const response = await submit(schedule, "PUT", "schedules");
            if (!response.data) return res.status(500).json({message: "unable to update schedule"})
        }
    }
    

    apiRequestHandler(req, res, route, timeSlot, null);
    
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
          return [newDailySlots, prevAppointmentSlots]
        }

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
    
}