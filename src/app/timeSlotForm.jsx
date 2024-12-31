import { useState } from "react";
import timeSlots from "./timeslots.JSON"

export default function TimeSlotForm(){
    const services = ["certificateIssue", "idIssue"];//"fetched from db"
    
    const [inputState, setInputState] = useState({
        service : "",
        date : "",
        start : "",
        end : "",
        interval : 0,
    });

    const [intervals, setIntervals] = useState([]);
    const [intervalsLength, setIntervalsLength] = useState(0);
    function updateIntervals(intervals){
        setIntervals(intervals);
        setIntervalsLength(intervals.length);
    }

    function convertTimeToMinutes(time){
        console.log(time)
        let hour = parseInt(time.substring(0,2)) * 60;
        let minute = parseInt(time.substring(3,5));
        console.log(hour)
        console.log(minute)

        return hour + minute;
    }

    function convertMinuteToTime(minutes){
        let hour = Math.floor(minutes / 60);
        let minute = minutes % 60;
        let meridian = hour > 12 ? "PM" : "AM";

        return `${(hour % 12 < 10 && hour % 12 != 0) ? ('0' + (hour % 12 == 0 ? 12 : hour % 12)) : hour % 12 == 0 ? 12 : hour % 12}:${minute < 10 ? "0" + minute : minute} ${meridian}`
    }

    function calculateTimeslots(start, end, interval){
        let tempIntervals = [];
        let startTime = convertTimeToMinutes(start);
        let endTime = convertTimeToMinutes(end) + 1;
        let gap = endTime > startTime ? endTime - startTime : 1440 - startTime + endTime;
        let max = (gap / interval) - 1;
        
        for(let i = 0; i < max; i++){
            tempIntervals.push([`${convertMinuteToTime((startTime + i * interval) % 1440)} - ${convertMinuteToTime((startTime - 1 + (i + 1) * interval) % 1440)}`]);
        }

        console.log(tempIntervals);
        return tempIntervals;
    }
    
    return(
        <form action="" style={{margin: "50px"}} onSubmit={() => {}}>
            <br /><br />
            <br /><br />
            <label>Service: </label>
            <select required name="services" value={inputState.service} onChange={(e) => {setInputState({...inputState, service : e.target.value})}}>
                {services.map((service, index) => (
                    <option key={index} value={service}>{service}</option>
                ))}
            </select>
            <br />
            <label>Start Time: </label>
            <input required type="time" name="start" value={inputState.start} onChange={(e) => {setInputState({...inputState, start : e.target.value})}} />
            <br />
            <label>End Time: </label>
            <input required type="time" name="end" value={inputState.end} onChange={(e) => {setInputState({...inputState, end : e.target.value})}} />
            <br />
            <label>Interval: </label>
            <input required type="number" name="interval" placeholder="minutes" value={inputState.interval} onChange={(e) => {setInputState({...inputState, interval : e.target.value})}} />
            <br />
            <button onClick={(e) => {e.preventDefault(); updateIntervals(calculateTimeslots(inputState.start, inputState.end, inputState.interval))}}>List slots</button>
            <br />
            <br />
            {intervalsLength != 0 && 
                <div className="avoided_intervals">
                    <label>Excluded Intervals</label>
                    <br />
                        {intervals.map((interval, index) => (
                            <span key={index}>
                                <label>{interval[0]}: </label>
                                <input type="checkbox" name={interval[0]} />
                                <br />
                            </span>
                        ))}
                </div>}
            <br />
            <input type="submit" value="Update"/>
        </form>
    )
}