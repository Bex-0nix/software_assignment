import StatefulContainer from "../statefulContainer/statefulContainer"
import State from "../statefulContainer/state"
import AppointmentForm from "./appointmentForm"
import FeedbackForm from "./feedbackForm"
import { useState } from "react"


export default function ResidentInterface(){
    const [alertContent, setAlertContent] = useState(null)

    return (
        <>
            <StatefulContainer isMain={true}>
                <State title="Appointment">
                    <StatefulContainer>
                        <State title="Make">
                            <AppointmentForm type="Make"/>
                        </State>
                        <State title="Reschedule">
                            <AppointmentForm type="Reschedule"/>
                        </State>
                        <State title="Cancel">
                            <AppointmentForm type="Cancel"/>
                        </State>
                    </StatefulContainer>
                </State>
                <State title="Feedback">
                    <FeedbackForm />
                </State>
            </StatefulContainer>
        </>
    )
}