import StatefulContainer from "./statefulContainer"
import State from "./state"

export default function ResidentInterface(){
    return (
        <>
            <StatefulContainer isMain={true}>
                <State title="Appointment">
                    <StatefulContainer>
                        <State title="Make Appointment">

                        </State>
                        <State title="Edit Appointment">

                        </State>
                        <State title="Cancel Appointment">

                        </State>
                    </StatefulContainer>
                </State>
                <State title="Feedback">
                
                </State>
            </StatefulContainer>
        </>
    )
}