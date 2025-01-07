import {getSingle, getAll, getCustom, apiRequestHandler} from "../../../db"

export default async function requirementHandler(req, res){
    const route = "requirements";
    const services = ["certificateIssue", "idIddue"];
    let requirement = req.body
    if (!services.includes(requirement.service)) return res.status(400).json({message: "invalid service"})
    if (req.method != "POST" || req.method == "GET"){
        return res.status(400).json({message: "method not allowed"})
    }
    if (req.method == "GET"){
        const requirementData = await getAll("feedbacks");
        if(requirementData.data) return res.status(200).json({data: requirementData.data, message: requirementData.message})
    }

    apiRequestHandler(req, res, route, feedback, null)
} 