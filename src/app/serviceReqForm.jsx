import requirements from "@/app/data/requirements.JSON"
import { useEffect, useState } from "react";


export default function ServiceRequirementForm(){
    const services = ["certificateIssue", "idIssue"];
    const [service, setService] = useState(services[0]);
    const [reqs, setReqs] = useState((requirements[requirements.findIndex(requirement => requirement.service == service)]["requirements"]));
    const [inputState, setInputState] = useState({});
    
    useEffect(() => {
        setReqs((requirements[requirements.findIndex(requirement => requirement.service == service)]["requirements"]));
        return () => setInputState({})
    }, [service])
    return (
        <div>
            <form action="">
                <select name="services" onChange={(e) => {setService(e.target.value)}}>
                    {services.map((service, index) => (
                        <option key={index}>{service}</option>
                    ))}
                </select>
                <label>Requirements</label>
                <button onClick={(e) => {e.preventDefault(); setReqs(reqs => ([...reqs, (<input type="text"/>)]))}}>Add</button>
                {reqs.map((req, index) =>(
                    <>
                        <br />
                        <input key={index} type="text" value={req} onChange={(e) => {e.target.value = inputState.index }}/>
                        <br />
                    </>
                ))}
                <br />
                <input type="submit" value="submit" onClick={(e) => {e.preventDefault()}}/>
            </form>
        </div>
    )
}