import { useEffect, useState } from "react";
// import timeSlots from "./timeslots.JSON"
import Alert from "../alert/alert";

let timeSlot = {};

export default function TimeSlotForm(){
    const services = ["certificateIssue", "idIssue"];//"fetched from db"
    
    const [alertContent, setAlertContent] = useState(null);
    
    const [excludedIndeces, setExcludedIndeces] = useState([]);

    const data = [
        ["service", "Service: ", "select"], 
        ["start", "Start Time: ", "time"], 
        ["end", "End Time: ", "time"], 
        ["interval", "Interval: ", "number"]
        // ["limit", "Daily Appointment Limit: ", "number"]
    ];
    function cacheData(){
        for (let d of data){
            if (inputState[d[0]] === ""){
                setAlertContent(<Alert title="Form Error" message="Invalid Input" setAlertContent={setAlertContent}/>); 
                return false;
            } 
            timeSlot[d[0]] = inputState[d[0]];
        } 
        return true;
    }


    function saveData(){
        for (let d of data){
            if (inputState[d[0]] != timeSlot[d[0]]){
                setAlertContent(<Alert title="Form Error" message="Input Mismatch" setAlertContent={setAlertContent}/>); 
                return false;   
            }
        }
        
        let tempIntervals = intervals;
        let removed = 0;
        excludedIndeces.forEach((i) => {
            tempIntervals.splice(i - removed, 1)
            removed += 1;
        })
        timeSlot["timeSlots"] = tempIntervals;
        timeSlot["lastUpdate"] = new Date().toISOString();
        timeSlot["slots"] = [{
            date: "",
            dailySlots: ""
        }];

        return true;
    }
    function clearData(){
        timeSlot = {}
        setInputState({
            service: services[0],
            start: "",
            end: "",
            interval: ""
        });
        updateIntervals([]);
        setExcludedIndeces([]);
    }
    function handleSubmit(){
        const savedData = timeSlot;
        console.log(savedData);
        clearData();
        setAlertContent(<Alert title="Form submitted" message="Timeslot updated" setAlertContent={setAlertContent}/>)
    }

    const [inputState, setInputState] = useState({
        service : services[0],
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
        let hour = parseInt(time.substring(0,2)) * 60;
        let minute = parseInt(time.substring(3,5));

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

        return tempIntervals;
    }
    
    return(
        <div className="form time_form">
            <h1>Manage Time Slots</h1>
            {alertContent}
            <form action="">
                <div className="form_item">
                    <label>Service: </label>
                    <select required name="services" value={inputState.service} onChange={(e) => {setInputState({...inputState, service : e.target.value})}}>
                        {services.map((service, index) => (
                            <option key={index} value={service}>{service}</option>
                        ))}
                    </select>
                </div>
                {data.map((d, index) => index != 0 && (
                    <div className="form_item">
                        <span key={index}><label>{d[1]}</label>
                            <input required type={d[2]} name="start" value={inputState[d[0]]} onChange={(e) => {setInputState({...inputState, [d[0]] : e.target.value})}} />
                        </span>
                    </div>
                ))
                }
                <div className="form_item submit">
                    <button onClick={(e) => {cacheData() ? updateIntervals(calculateTimeslots(inputState.start, inputState.end, inputState.interval)) : null; e.preventDefault()}}>Generate slots</button>
                </div>
                {intervalsLength != 0 && <>
                    <div className="form_item">
                        <ul className="input">
                            <label>Pick Excluded Intervals</label>
                            <br />
                            {intervals.map((interval, index) => (
                                <span key={index}>
                                    <label>{interval[0]}: </label>
                                    <input type="checkbox" name={index} onClick={(e) => {
                                        e.target.checked ? setExcludedIndeces(prev => [...prev, index]) : setExcludedIndeces(prev => prev.filter((excludedIndex) => {excludedIndex !== index}))
                                    }}/>
                                </span>
                            ))}
                        </ul>
                    </div>
                    <div className="form_item submit">
                        <input type="submit" value="Update" onClick={(e) => {e.preventDefault(); saveData() ? handleSubmit() : null;}} />
                    </div>
                    </>
                }
            </form>
        </div>
    )
}