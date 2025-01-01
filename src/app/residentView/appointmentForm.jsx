import {useState} from 'react'
import Alert from '../alert/alert'
import timeSlots from "@/app/data/timeslots.JSON"
import residents from "@/app/data/residents.JSON"
import Appointments from "@/app/data/appointments.JSON"
import Requirements from "@/app/data/requirements.JSON"

export default function AppointmentForm({type, handleSubmit}){
    const services = ["certificateIssue", "idIssue"] //should be fetched from "db"
    const [alertContent, setAlertContent] = useState(null);
    
    console.log(timeSlots)
    const [inputState, setInputState] = useState({
        residentId : "",
        service : services[0],
        date : "",
        timeSlot : "",
    })
    
    const [fetchedAppointment, setFetchedAppointment] = useState({
        residentId : "",
        service : services[0],
        date : "",
        timeslot : "",
    })
    
    function verifyResident(resident){
        return true;
    }

    function verifyLimit(resident){
        return true;
    }

    return (
        <>
            {alertContent}
            <div className='form appointment_form'>
                <h1>{type} Appointment</h1>
                <form action="">
                    {type == "Edit" || type == "Cancel" ? (
                        <>                            
                            <label>Appointment ID: </label>
                            <input type="text" name="appointmentId" />
                            <br />
                        </>)
                        :
                        null
                    }
                    <label>ID Number: </label>
                    <input type="text" name="id" />
                    <br />
                    <label>Service: </label>
                    <select name="service">
                        {services.map((service, index) => (
                            <option key={index} value="service">{service}</option>
                        ))}
                    </select>
                    <br />
                    <select name="timeSlots" >
                        {timeSlots[0]["timeSlots"].map((slot, index) => slot[1] == "included" && (
                            <option key={index} value={slot[0]}>{slot[0]}</option>
                        ))}
                    </select>
                    <br />
                    <input type="submit" value="submit" />
                </form>            
            </div>
        </>
    )
}
