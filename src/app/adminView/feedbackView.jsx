import feedbacks from "@/app/data/feedbacks.JSON"
import residents from "@/app/data/residents.JSON"
import appointments from "@/app/data/appointments.JSON"

export default function FeedbackView(){
    return (
        <div className="list">
            <h1>View Feedbacks</h1>
            {feedbacks.map((feedback, index) => (
                <FeedbackBlock key={index} feedback={feedback} />
            ))}
        </div>
    )
}

function FeedbackBlock({feedback}){
    return (
        <div className="list_item">
            <div className="list_item_piece">
                <label>Resident Name: </label>
                <p>{residents[residents.findIndex(resident => resident["id"] == feedback["residentId"])]["fullName"]}</p>
            </div>
            <div className="list_item_piece">
                <label>Service: </label>
                <p>{appointments[appointments.findIndex(appointment => appointment["appointmentId"] == feedback["appointmentId"])]["service"]}</p>
            </div>
            <div className="list_item_piece">
                <label>Appointment Date:</label>
                <p>{appointments[appointments.findIndex(appointment => appointment["appointmentId"] == feedback["appointmentId"])]["date"]}</p>
            </div>
            <div className="list_item_piece">
                <label>Feedback: </label>
                <p>{feedback["feedback"]}</p>
            </div>
        </div>
    )
}