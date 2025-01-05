import {useEffect, useState} from 'react'
import Alert from '../alert/alert'

let appointment = {};

export default function AppointmentForm({type}){
    
    const [timeSlots, setTimeSlots] = useState([]);
    const [requirements, setRequirements] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const services = ["certificateIssue", "idIssue"] //should be fetched from "db"
    const [alertContent, setAlertContent] = useState(null);
    const [service, setService] = useState(services[0]);
    const [reqs, setReqs] = useState([]);

    useEffect(() => {
        load()
    }, [])


    async function load(){
        const timeSlotResponse = await fetch("http://localhost:8002/timeSlots", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }})
        const requirementResponse = await fetch("http://localhost:8002/requirements", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }})
        const appointmentResponse = await fetch("/api/appointment", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }})
        if (appointmentResponse.ok && requirementResponse.ok && timeSlotResponse){
            let appointmentData = await appointmentResponse.json()
            let requirementData = await requirementResponse.json()
            let timeSlotData = await timeSlotResponse.json()
            setAppointments(appointmentData)
            setRequirements(requirementData)
            setTimeSlots(timeSlotData[timeSlotData.findIndex(elem => elem["service"] == service)])
            console.log(service)
            console.log(timeSlotData[timeSlotData.findIndex(elem => elem["service"] == service)])
            setLoading(false)
        }
        else{
            console.log("failed")
        }
    }
    useEffect(() => {
        if (requirements.length > 0) {
            const selectedReq = requirements.find((req) => req.service === service);
            if (selectedReq) {
                setReqs(selectedReq.requirements);
            }
        }    
    }, [service, requirements])
    
    const [inputState, setInputState] = useState({
        residentId : "",
        service : service,
        date : "",
        timeSlot : "",
    })
    
    const [fetchedAppointment, setFetchedAppointment] = useState({
        id : "",
        residentId : "",
        service : "",
        date : "",
        timeSlot : "",
    })
    
    useEffect(() => {
        setInputState({
            residentId : "",
            service : service,
            date : "",
            timeSlot : "",
        }); 
        setFetchedAppointment({
            id : "",
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
                if (fetchedAppointment["id"] != appointment["id"]){
                    setAlertContent(<Alert title={title} message={fetchedAppointment["id"] == "" ? "Missing Input" : "Input Mismatch"} setAlertContent={setAlertContent}/>)
                    return false;
                }
            }
        }
        if (type == "Make"){
            appointment = inputState;
        }
        return true;
    }

    async function handleSubmit(event, type, appointment){
        event.preventDefault();
        console.log(appointment)
        let message = "";
        try {
            const response = await fetch('/api/appointment', {
              method: type == 'Make' ? 'POST' : type == 'Reschedule' ? 'PUT' : 'DELETE',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(appointment),
            });
      
            const data = await response.json();
            if (response.ok) {
              message = (data.message);
            } else {
              message = (data.message || 'Error submitting appointment');
            }
            console.log(data.message)
            console.log("submitted")
          } catch (error) {
            // message = ('An error occurred while submitting the appointment');
            message = error.messge
          }
          setAlertContent(<Alert title="application" message={message} setAlertContent={setAlertContent}/>);
    }

    return (
        <>
            {alertContent}
            {!loading && <>

            <div className='form appointment_form'>
                <h1>{type} Appointment</h1>
                <form action="">
                    {type == "Reschedule" || type == "Cancel" ? (
                        <div className='form_item'>                            
                            <label>Appointment ID: </label>
                            <input required type="text" name="id" value={fetchedAppointment["id"]} onChange={(e) => {setFetchedAppointment(fetchedAppointment => ({...fetchedAppointment, ["id"]: e.target.value}))}} />
                            <button onClick={(e) => {
                                e.preventDefault()
                                    const appointmentData = appointments.find(appointment => appointment["id"] === fetchedAppointment["id"]);
                                    if (appointmentData) {
                                        setFetchedAppointment(appointmentData);
                                        cacheData();
                                    }
                            }}>Search</button>
                        </div>)
                        :
                        null
                    }
                    <div className="form_item">
                        <label>ID: </label>
                            <input required disabled={type == "Cancel"} type="text" name="id" value={type == "Make" ? inputState.residentId : fetchedAppointment.residentId} onChange={(e) => {type == "Make" ? setInputState(inputState => ({...inputState, residentId: e.target.value})) : setFetchedAppointment(fetchedAppointment => ({...fetchedAppointment, residentId: e.target.value}))}}/>
                    </div>
                    <div className="form_item">
                        <label>Service: </label>
                        <select required disabled={type == "Cancel"} name="service" value={type == "Make" ? service : fetchedAppointment.service} onChange={(e) => {type == "Make" ? setService(e.target.value) : setFetchedAppointment(fetchedAppointment => ({...fetchedAppointment, service: e.target.value}))}}>
                            {services.map((service, index) => (
                                <option key={index} value={service}>{service}</option>
                            ))}
                        </select>
                    </div>
                    {type == "Make" && (
                        <div className="form_item">
                            <ul>
                                <label><big> Requirements: </big></label>
                                {reqs.map((req, index) => (
                                    <li key={index}>{req}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                    <div className="form_item">
                        <label>Date: </label>
                        <input required disabled={type == "Cancel"} type="date" value={type == "Make" ? inputState.date : fetchedAppointment.date} onChange={(e) => {type == "Make" ? setInputState(inputState => ({...inputState, date: e.target.value})) : setFetchedAppointment(fetchedAppointment => ({...fetchedAppointment, date: e.target.value}))}}/>
                    </div>
                    <div className="form_item">
                        <label>Pick Time: </label>
                        <select required disabled={type == "Cancel"} name="timeSlots" value={type == "Make" ? inputState.timeSlot : fetchedAppointment.timeSlot} onChange={(e) => {type == "Make" ? setInputState(inputState => ({...inputState, timeSlot: e.target.value})) : setFetchedAppointment(fetchedAppointment => ({...fetchedAppointment, timeSlot: e.target.value}))}}>
                            {timeSlots["timeSlots"].map((slot, index) => (
                                <option key={index} value={slot}>{slot}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form_item submit">
                        <ul >
                            {type == "Make" && <h3 style={{color: "red"}}>Please verify you fulfill all requirements prior to submitting!</h3>}
                            <input type="submit" value="submit" onClick={(e) => {verifyData() ? handleSubmit(e, type, appointment) : console.log("failed"); e.preventDefault();}}/>
                        </ul>
                    </div>
                </form>            
            </div>
        </>}</>
    )
}
