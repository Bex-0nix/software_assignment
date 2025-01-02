import {useEffect, useState} from 'react'
import Alert from '../alert/alert'
import timeSlots from "@/app/data/timeslots.JSON"
import residents from "@/app/data/residents.JSON"
import appointments from "@/app/data/appointments.JSON"
import requirements from "@/app/data/requirements.JSON"

let appointment = {};

export default function AppointmentForm({type, handleSubmit}){
    const services = ["certificateIssue", "idIssue"] //should be fetched from "db"
    const [alertContent, setAlertContent] = useState(null);
    const [service, setService] = useState(services[0]);
    const [reqs, setReqs] = useState(requirements[requirements.findIndex(requirement => requirement["service"] == service)]["requirements"]);

    useEffect(() => {
        setReqs(requirements[requirements.findIndex(requirement => requirement["service"] == service)]["requirements"])
    }, [service])
    
    const [inputState, setInputState] = useState({
        residentId : "",
        service : service,
        date : "",
        timeSlot : "",
    })
    
    const [fetchedAppointment, setFetchedAppointment] = useState({
        appointmentId : "",
        residentId : "",
        service : "",
        date : "",
        timeSlot : "",
    })
    
    console.log(fetchedAppointment)

    useEffect(() => {
        setInputState({
            residentId : "",
            service : service,
            date : "",
            timeSlot : "",
        }); 
        setFetchedAppointment({
            appointmentId : "",
            residentId : "",
            service : "",
            date : "",
            timeSlot : ""
        });
    }, [type])
    
    function verifyResident(){
        return true;
    }

    function verifyLimit(){
        return true;
    }

    function cacheData(){
        for (let data in fetchedAppointment){
            if (fetchedAppointment[data] == ""){
                return false;
            } 
            appointment[data] = fetchedAppointment[data];
        }
        return true;
    }

    function verifyData(){
        let title = "Form Error"
        for (let data in inputState){
            if (type == "Make"){
                if (inputState[data] == ""){
                    setAlertContent(<Alert title={title} message="Missing Input" setAlertContent={setAlertContent}/>)
                    return false;
                }
            }
            else if (type == "Reschedule"){
                if (fetchedAppointment[data] != appointment[data]){
                    setAlertContent(<Alert title={title} message={fetchedAppointment[data] == "" ? "Missing Input" : "Input Mismatch"} setAlertContent={setAlertContent}/>)
                    return false;
                }
            }
            else if (type == "Cancel"){
                if (fetchedAppointment["appointmentId"] != appointment["appointmentId"]){
                    setAlertContent(<Alert title={title} message={fetchedAppointment["appointmentId"] == "" ? "Missing Input" : "Input Mismatch"} setAlertContent={setAlertContent}/>)
                    return false;
                }
            }
        }
        
    }

    return (
        <>
            {alertContent}
            <div className='form appointment_form'>
                <h1>{type} Appointment</h1>
                <form action="">
                    {type == "Reschedule" || type == "Cancel" ? (
                        <>                            
                            <label>Appointment ID: </label>
                            <input type="text" name="appointmentId" value={fetchedAppointment["appointmentId"]} onChange={(e) => {setFetchedAppointment(fetchedAppointment => ({...fetchedAppointment, ["appointmentId"]: e.target.value}))}} />
                            <br />
                            <button onClick={(e) => {
                                e.preventDefault()
                                    const appointmentData = appointments.find(appointment => appointment["appointmentId"] === fetchedAppointment["appointmentId"]);
                                    if (appointmentData) {
                                        setFetchedAppointment(appointmentData);
                                        cacheData();
                                    }
                            }}>Search</button>
                            <br />
                        </>)
                        :
                        null
                    }
                    <label>ID Number: </label>
                    <input disabled={type == "Cancel"} type="text" name="id" value={type == "Make" ? inputState.residentId : fetchedAppointment.residentId} onChange={(e) => {type == "Make" ? setInputState(inputState => ({...inputState, residentId: e.target.value})) : setFetchedAppointment(fetchedAppointment => ({...fetchedAppointment, residentId: e.target.value}))}}/>
                    <br />
                    <label>Service: </label>
                    <select disabled={type == "Cancel"} name="service" value={type == "Make" ? service : fetchedAppointment.service} onChange={(e) => {type == "Make" ? setService(e.target.value) : setFetchedAppointment(fetchedAppointment => ({...fetchedAppointment, service: e.target.value}))}}>
                        {services.map((service, index) => (
                            <option key={index} value={service}>{service}</option>
                        ))}
                    </select>
                    {type == "Make" && (
                        <>
                            <br />
                            <br />
                            <label>Requirements: </label>
                            <br />
                            {reqs.map((req, index) => (
                                <p key={index}>{req}</p>
                            ))}
                        </>
                    )}
                    <br />
                    <label>Date: </label>
                    <input disabled={type == "Cancel"} type="date" value={type == "Make" ? inputState.date : fetchedAppointment.date} onChange={(e) => {type == "Make" ? setInputState(inputState => ({...inputState, date: e.target.value})) : setFetchedAppointment(fetchedAppointment => ({...fetchedAppointment, date: e.target.value}))}}/>
                    <br />
                    <label>Pick Time: </label>
                    <select disabled={type == "Cancel"} name="timeSlots" value={type == "Make" ? inputState.timeSlot : fetchedAppointment.timeSlot} onChange={(e) => {type == "Make" ? setInputState(inputState => ({...inputState, timeSlot: e.target.value})) : setFetchedAppointment(fetchedAppointment => ({...fetchedAppointment, timeSlot: e.target.value}))}}>
                        {timeSlots[0]["timeSlots"].map((slot, index) => slot[1] == "included" && (
                            <option key={index} value={slot[0]}>{slot[0]}</option>
                        ))}
                    </select>
                    <br />
                    <input type="submit" value="submit" onClick={(e) => {e.preventDefault(); verifyData() ? handleSubmit() : null}}/>
                </form>            
            </div>
        </>
    )
}
