import StatefulContainer from "../statefulContainer/statefulContainer"
import State from "../statefulContainer/state"
import AppointmentForm from "./appointmentForm"

export default function ResidentInterface(){

    function handleSubmit(event, type, appointment){
        event.preventDefault();
        if (type == "Make"){
            
        }
        else if (type == "Edit"){

        }
        else if (type == "Cancel"){

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