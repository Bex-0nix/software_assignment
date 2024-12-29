import ResidentView from "./residentView"
import StatefulContainer from "./statefulContainer"
import State from "./state"

export default function AdminInterface(){

    return (
        <>
            <StatefulContainer isMain={true}>
                <State title="manage residents">
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
                <State title="feedbacks">
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