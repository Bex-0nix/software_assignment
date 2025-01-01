import ResidentView from "@/app/adminView/residentView"
import StatefulContainer from "@/app/statefulContainer/statefulContainer"
import State from "@/app/statefulContainer/state"
import TimeSlotForm from "@/app/adminView/timeSlotForm"
import ServiceRequirementForm from "@/app/serviceReqForm"
import '@/app/styles/admin.css'

export default function AdminInterface(){

    return (
        <>
            <StatefulContainer isMain={true}>
                <State title="Residents">
                    <StatefulContainer>
                        <State title="List Resident">
                            <ResidentView type="List"/>
                        </State>
                        <State title="Add Resident">
                            <ResidentView type="Add"/>
                        </State>
                        <State title="Edit Resident">
                            <ResidentView type="Edit"/>
                        </State>
                        <State title="Remove Resident">
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
                    <StatefulContainer>
                        <State title="new">
                            new
                        </State>
                        <State title="old">
                            old
                        </State>
                    </StatefulContainer>
                </State>
            </StatefulContainer>
        </>
    )
}