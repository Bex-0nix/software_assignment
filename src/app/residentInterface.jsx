import StatefulContainer from "./statefulContainer"
import State from "./state"
import AppointmentForm from "./appointmentForm"

export default function ResidentInterface(){

    function handleSubmit(event, type, appointment){
        if (add == "Make"){
            
        }
        else if (add == "Edit"){

        }
        else if (add == "Cancel"){

        }
    }

    return (
        <>
            <StatefulContainer isMain={true}>
                <State title="Appointment">
                    <StatefulContainer>
                        <State title="Make Appointment">
                            <AppointmentForm type="Make"/>
                        </State>
                        <State title="Edit Appointment">
                            <AppointmentForm type="Edit"/>
                        </State>
                        <State title="Cancel Appointment">
                            <AppointmentForm type="Cancel"/>
                        </State>
                    </StatefulContainer>
                </State>
                <State title="Feedback">
                
                </State>
            </StatefulContainer>
        </>
    )
}