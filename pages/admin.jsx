import ResidentView from "@/app/residentView"
import StatefulContainer from "@/app/statefulContainer"
import State from "@/app/state"
import TimeSlotForm from "@/app/timeSlotForm"
import '../src/app/styles/admin.css'

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
                        <State title="Edit Resdient">
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