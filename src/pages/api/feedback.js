import {getSingle, getAll, getCustom, apiRequestHandler} from "../../../db"

export default async function feedbackHandler(req, res){
    const route = "feedbacks";
    let feedback = req.body

    if (req.method == "POST"){
        const appointmentData = await getSingle("appointments", feedback.appointmentId)
        const appointment = appointmentData.data;
        if (!appointment) return res.status(400).json({message: "invalid appointment ID"})
        const residentData = await getSingle("residents", feedback.residentId)
        const resident = residentData.data;
        if (!resident) return res.status(400).json({message: "invalid resident ID"})
    }
    else if (req.method == "GET"){
        const feedbackData = await getAll("feedbacks");
        if(feedbackData.data) return res.status(200).json({data: feedbackData.data, message: feedbackData.message})
    }
    else{
        return res.status(500).json({message: "method not allowed"})
    }

    apiRequestHandler(req, res, route, feedback, null)
} 