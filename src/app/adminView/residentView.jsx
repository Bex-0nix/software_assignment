import { useState } from 'react';
import ResidentForm from './residentForm'
import ResidentList from './residentList'
import Alert from "@/app/alert/alert"
import residents from '@/app/data/residents.JSON'


export default function ResidentView({type}){
    
    const [alertContent, setAlertContent] = useState(null)
    function handleSubmit(event, type, resident){
        event.preventDefault();
        let message;
        if (type == "Add"){
            // add to db
            residents.push(resident)
            message = "Added resident";
        }
        else if (type == "Edit"){
            residents[resident.id] = resident
            // edit db
            message = "Edited resident";
        }
        else if (type == "Remove"){
            //remove from db
            message = "Removed resident";
        }
        setAlertContent(<Alert title="Form Submitted" message={message} setAlertContent={setAlertContent} />)
    }
    
    return (
        <>
            {alertContent}
            {type == "Add" || type == "Edit" || type == "Remove" ? (
                <ResidentForm type={type} handleSubmit={handleSubmit} residents={residents}/>
            ) 
            :
            (
                <ResidentList residents={residents} handleSubmit={handleSubmit} />
            )}
        </>
    )
}