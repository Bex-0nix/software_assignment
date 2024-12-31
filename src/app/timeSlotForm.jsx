import { useState } from "react";
import timeSlots from "./timeslots.JSON"

export default function TimeSlotForm(){
    console.log(timeSlots);
    const services = ["certificateIssue", "idIssue"];
    
    const [intervals, setIntervals] = useState([]);

    return(
        <form action="" style={{margin: "50px"}}>
            <br /><br />
            <br /><br />
            <label>Service: </label>
            <select required name="services">
                {services.map((service, index) => (
                    <option key={index} value={service}>{service}</option>
                ))}
            </select>
            <br />
            <label>Date: </label>
            <input required type="date" name="date" />
            <br />
            <label>Start Time: </label>
            <input required type="time" name="start" />
            <br />
            <label>End Time: </label>
            <input required type="time" name="end" />
            <br />
            <label>Interval: </label>
            <input required type="number" name="interval" placeholder="minutes" />
            <br />
            <br />
            <br />
            <label>Avoided Intervals</label>
            <div className="avoided_intervals">
                {
                    intervals.map((interval) => {
                        <>
                            <label>{interval}: </label>
                            <input type="checkbox" name={interval} />
                            <br />
                        </>
                    })
                }
            </div>
            <br />
            <input type="submit" value="Update" />
        </form>
    )
}