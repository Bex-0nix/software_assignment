import ResidentView from "@/app/adminView/residentView"
import StatefulContainer from "@/app/statefulContainer/statefulContainer"
import State from "@/app/statefulContainer/state"
import TimeSlotForm from "@/app/adminView/timeSlotForm"
import ServiceRequirementForm from "@/app/adminView/serviceReqForm"
import FeedbackView from "@/app/adminView/feedbackView"
import '@/app/styles/admin.css'

export default function AdminInterface(){

    return (
        <>
            <StatefulContainer isMain={true}>
                <State title="Residents">
                    <StatefulContainer>
                        <State title="List">
                            <ResidentView type="List"/>
                        </State>
                        <State title="Add">
                            <ResidentView type="Add"/>
                        </State>
                        <State title="Edit">
                            <ResidentView type="Edit"/>
                        </State>
                        <State title="Remove">
                            <ResidentView type="Remove"/>
                        </State>
                    </StatefulContainer>
                </State>
                <State title="Timeslots">
                    <TimeSlotForm />
                </State>
                <State title="Service Requirements">
                    <ServiceRequirementForm />
                </State>
                <State title="Feedbacks">
                    <FeedbackView />
                </State>
            </StatefulContainer>
        </>
    )
}