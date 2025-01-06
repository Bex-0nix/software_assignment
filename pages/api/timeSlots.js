import { getAll, getSingle, getCustom } from "../../db";

export default async function timeSlotHandler(req, res){
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
    }
}