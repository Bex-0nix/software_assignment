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
        <div className="form feedback_form">
            {alertContent}
            <h1>Send Feedback</h1>
            <form action="" onSubmit={handleSubmit}>
                <div className="form_item">
                    <label>Applicant ID: </label>
                    <input type="text" ref={residentId}/>
                </div>
                <div className="form_item">
                    <label>Appointment ID: </label>
                    <input type="text" ref={appointmentId}/>
                </div>
                <div className="form_item large">
                    <label>Feedback: </label>
                    <textarea ref={feedback}/>
                </div>
                <div className="form_item submit">
                    <input type="submit" value="submit" />
                </div>
            </form>
        </div>
    )
}