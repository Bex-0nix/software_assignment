import {useState} from 'react'
import Alert from './alert'

export default function appointmentForm(type, handleSubmit){
    const services = ["certificateIssue", "idIssue"] //should be fetched from "db"
    const [alertContent, setAlertContent] = useState(null);
    
    const [inputState, setInputState] = useState({
        residentId : "",
        service : services[0],
        date : "",
        time : "",
    })
    
    const [fetchedAppointment, setFetchedAppointment] = useState({
        residentId : "",
        service : services[0],
        date : "",
        time : "",
    })
    
    return (
        <>
            {alertContent}
            <div className='form appointment_form'>
                <form action="">
                    
                </form>            
            </div>
        </>
    )
}
