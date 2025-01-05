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
        <div className="form req_form">
            <h1>Manage Service Requirements</h1>
            <form action="">
                <div className="form_item">
                    <select name="services" value={service} onChange={(e) => {setService(e.target.value)}}>
                        {services.map((service, index) => (
                            <option key={index} value={service}>{service}</option>
                        ))}
                    </select>
                </div>
                <div className="form_item">
                    <label>Requirements</label>
                    <button onClick={(e) => {e.preventDefault(); setReqs(reqs => ([...reqs, ""]))}}>Add</button>
                </div>
                <div className="form_item">
                    <ul className="input">
                        {reqs.map((req, index) =>(
                                <input key={index} type="text" value={inputState[index] || req} onChange={(e) => {setInputState(inputState => ({...inputState, [index]: e.target.value}))}}/>
                        ))}
                    </ul>
                </div>
                <div className="form_item submit">
                    <input type="submit" value="submit" onClick={(e) => {e.preventDefault()}}/>
                </div>
            </form>
        </div>
    )
}