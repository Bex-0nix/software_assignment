import { submit, getAll, getSingle, apiRequestHandler } from "../../db"

export default async function residentHandler(req, res){
    const route = "residents";
    let resident = req.body;
    
    function generateUniqueId(resident){
        return "temp"
    }
    
    apiRequestHandler(req, res, route, resident)

}