import { submit, getAll, getSingle, apiRequestHandler } from "../../../db"

export default async function residentHandler(req, res){
    const route = "residents";
    let resident = req.body;
    console.log
    const verificationData = getSingle("residents", resident.id);
    const verification = verificationData.data;
    if (req.method == "POST"){
        if (verification) {
            res.status(200).json({message: "Duplicate id"})
        }
    }
    else if (req.method == "PUT" || req.method == "DELETE"){
        if (!verification) {
            res.status(200).json({message: "Id doesnt exist"})
        }
        
    }
    else{
        if (req.method != "GET"){
            res.status(200).json({message: "Method not supported"})
        }
    }
    
    
    apiRequestHandler(req, res, route, resident)

}