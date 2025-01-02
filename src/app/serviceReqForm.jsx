import requirements from "@/app/data/requirements.JSON"
import { useEffect, useState } from "react";


export default function ServiceRequirementForm(){
    const services = ["certificateIssue", "idIssue"];
    const [service, setService] = useState(services[0]);
    const [reqs, setReqs] = useState((requirements[requirements.findIndex(requirement => requirement.service == service)]["requirements"]));
    const [inputState, setInputState] = useState({});

    

    useEffect(() => {
        setReqs((requirements[requirements.findIndex(requirement => requirement.service == service)]["requirements"]));
    }, [service])
    
    useEffect(() => {
        return () => {
            reqs.forEach((req, index) => {
                setInputState({})
                setInputState(inputState => ({...inputState, [index]: req}))
            })
        }
    }, [reqs])
    
    return (
        <div>
            <form action="">
                <select name="services" value={service} onChange={(e) => {setService(e.target.value)}}>
                    {services.map((service, index) => (
                        <option key={index} value={service}>{service}</option>
                    ))}
                </select>
                <label>Requirements</label>
                <button onClick={(e) => {e.preventDefault(); setReqs(reqs => ([...reqs, ""]))}}>Add</button>
                <br />
                {reqs.map((req, index) =>(
                    <>
                        <br />
                        <input key={index} type="text" value={inputState[index] || req} onChange={(e) => {setInputState(inputState => ({...inputState, [index]: e.target.value}))}}/>
                        <br />
                    </>
                ))}
                <br />
                <input type="submit" value="submit" onClick={(e) => {e.preventDefault()}}/>
            </form>
        </div>
    )
}