import { useRef, useState } from "react";
import Alert from "../alert/alert";

export default function FeedbackForm(){
    const [alertContent, setAlertContent] = useState(null);

    const residentId = useRef();
    const appointmentId = useRef();
    const feedback = useRef();

    function verifyData(data){
        return true;
    }

    function handleSubmit(e){
        e.preventDefault();

        if (residentId.current.value == "" || appointmentId.current.value == "" || feedback.current.value == ""){
            setAlertContent(<Alert title="Form Error" message="Missing Input" setAlertContent={setAlertContent}/>)
            return;
        }
        
        const data = {
            feedbackId: "",
            residentId: residentId.current.value,
            appointmentId: appointmentId.current.value,
            feedback: feedback.current.value,
            viewed: false
        }
        
        verifyData(data) ? setAlertContent(<Alert title="Form Submitted" message="Feedback sent" setAlertContent={setAlertContent}/>) : setAlertContent(<Alert title="Form Error" message="Invalid id" setAlertContent={setAlertContent}/>)
    }

    return (
        <>
            {alertContent}
            <form action="" onSubmit={handleSubmit}>
                <br />
                <label>Applicant ID: </label>
                <input type="text" ref={residentId}/>
                <br />
                <label>Appointment ID: </label>
                <input type="text" ref={appointmentId}/>
                <br />
                <label>Feedback: </label>
                <br />
                <input type="text" ref={feedback}/>
                <br />
                <input type="submit" value="submit" />
            </form>
        </>
    )
}