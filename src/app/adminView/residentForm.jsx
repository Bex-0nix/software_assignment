import { useEffect, useState } from "react"
import { useStatefulContainer } from "@/app/statefulContainer/statefulContainerContext" 
import Alert from "../alert/alert";

const resident = {};
const data = [
    ["fullName" , "Full Name", "text"],
    ["dateOfBirth" , "Birth Date", "date"],
    ["gender" , "Gender", "text"],
    ["maritalStatus" , "Marital Status", "text"],
    ["nationality" , "Nationality", "text"],
    ["address" , "Address", "text"],
    ["phoneNumber" , "Phone Number", "text"],
    ["emailAddress" , "Email", "email"],
    ["motherName" , "Mother's Name", "text"],
    ["fatherName" , "Father's Name", "text"],
    ["spouseName" , "Spouse's Name", "text"],
    ["numberOfDependents" , "Number Of Dependents", "text"],
    ["emergencyContactName" , "Emergency Contact", "text"],
    ["emergencyContactRelationship" , "Emergency Contact Relationship", "text"],
    ["emergencyContactPhoneNumber" , "Emergency Contact Number", "text"],
    ["disabilityStatus" , "Disability Status", "text"],
    ["dateOfRegistration" , "Registration Date", "date"]
]

export default function ResidentForm({type}){
    const {contents} = useStatefulContainer();
    
    const [residents, setResidents] = useState([])
    const [loading, setLoading] = useState(true)
    const [submitted, setSubmitted] = useState(true)
    const [fetchedResident, setFetchedResident] = useState(contents["data"] ? residents[residents.findIndex(resident => resident["id"] == contents["data"])] : {});
    const [inputState, setInputState] = useState({
        id: contents["data"] || "",
        fullName: "",
        dateOfBirth: "",
        gender: "",
        maritalStatus: "",
        nationality: "",
        address: "",
        phoneNumber: "",
        emailAddress: "",
        motherName: "",
        fatherName: "",
        spouseName: "",
        numberOfDependents: "",
        emergencyContactName: "",
        emergencyContactRelationship: "",
        emergencyContactPhoneNumber: "",
        disabilityStatus: "",
        dateOfRegistration: ""
    })
    
    useEffect(() => {
        async function load(){
            try {
                const response = await fetch('/api/resident', {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                if (response.ok){
                    let residentData = await response.json()
                    setResidents(residentData.data)
                    setLoading(false)
                }
                else{
                    setAlertContent(<Alert title="Form Error" message={response.message}/>)
                }
            } catch (error) {
                setAlertContent(<Alert title="Form Error" message={error.message}/>)
            }
        }
        load();
    }, [type, submitted])

    useEffect(() => {
        return () => {
            setFetchedResident({});
            setInputState({
                id: "",
                fullName: "",
                dateOfBirth: "",
                gender: "",
                maritalStatus: "",
                nationality: "",
                address: "",
                phoneNumber: "",
                emailAddress: "",
                motherName: "",
                fatherName: "",
                spouseName: "",
                numberOfDependents: "",
                emergencyContactName: "",
                emergencyContactRelationship: "",
                emergencyContactPhoneNumber: "",
                disabilityStatus: "",
                dateOfRegistration: ""
            })
            contents["data"] = null;
        }
    }, [type, submitted])

    const [alertContent, setAlertContent] = useState(null);

    function saveData() {
        for (let resident of residents){
            if (resident["id"] == inputState["id"] && type == "Add") {
                setAlertContent(<><Alert title="Form Alert" message="Duplicate ID" setAlertContent={setAlertContent}/></>);
                return false;
            }
        }
        console.log(data)
        data.unshift(["id", "hey", "nope"]);
        for (let d of data) {
            if ((inputState[d[0]] == "" && type == "Add") || (d[0] != "id" && fetchedResident[d[0]] == "" && type == "Edit")) {
                data.shift()
                setAlertContent(<><Alert title="Form Alert" message="Missing Input" setAlertContent={setAlertContent}/></>);
                return false;
            }
            type == "Add" ? resident[d[0]] = inputState[d[0]] : resident[d[0]] = fetchedResident[d[0]];  
            console.log(resident[d[0]])
        }
        data.shift()
        return true;
    }
    
    async function handleSubmit(event, type, resident){
        event.preventDefault();
        const method = type == "Add" ? "POST" : type == "Cancel" ? "DELETE" : "PUT";
        console.log(resident)
        const response = await fetch('/api/resident', ({
            method: method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(resident)
        }))
        if (response.ok){
            setAlertContent(<Alert title="Form Submitted" message={response.message} setAlertContent={setAlertContent} />)
            setSubmitted(!submitted)
        }
        else{

            setAlertContent(<Alert title="Form Error" message={response.message} setAlertContent={setAlertContent} />)
        }
        
    }

    return (
        <>
        {alertContent}
        {!loading &&

            <div className="form resident_form">
                <h1>{type} Resident</h1>
                <br />
                <form action="">
                    <div className="form_item">
                        <label htmlFor="">ID:</label>
                        <input required type="text" name="id" value={inputState.id} onChange={(e) => {setInputState({...inputState, id: e.target.value})}}/>
                        {type != "Add" ? (
                            <>
                                <button onClick={(e) => {
                                    setFetchedResident(residents[residents.findIndex(resident => resident["id"] == inputState.id)] || {
                                        fullName: "",
                                        dateOfBirth: "",
                                        gender: "",
                                        maritalStatus: "",
                                        nationality: "",
                                        address: "",
                                        phoneNumber: "",
                                        emailAddress: "",
                                        motherName: "",
                                        fatherName: "",
                                        spouseName: "",
                                        numberOfDependents: "",
                                        emergencyContactName: "",
                                        emergencyContactRelationship: "",
                                        emergencyContactPhoneNumber: "",
                                        disabilityStatus: "",
                                        dateOfRegistration: ""
                                    })
                                    if (inputState.id == "") setAlertContent(<Alert title="Form Error" message="Invalid ID" setAlertContent={setAlertContent}/>) 
                                    e.preventDefault()
                                 }}>Search</button>
                            </>
                        )
                        :
                        null}
                    </div>
                    
                    { type == "Remove" || type == "Edit" ? 
                        (
                        <>
                            <MoreData disabled={type == "Remove" ? true : false} editable={type == "Edit" ? true : false} fetchedResident={fetchedResident} setFetchedResident={setFetchedResident} inputState={inputState} setInputState={setInputState}/>   
                        </>
                        )  
                        : 
                        (
                            <>
                            <MoreData disabled={false} editable={false} inputState={inputState} setInputState={setInputState}/>
                        </>
                    )}
                    <div className="form_item submit">
                        <input type="submit" value="submit" onClick={(e) => {saveData() ? handleSubmit(e, type, resident) :  e.preventDefault();}}/>
                    </div>
                </form>
            </div>
        }
        </>
    )
}

function MoreData({disabled, editable, fetchedResident, setFetchedResident, inputState, setInputState}){
    
    return(
        <>
            {data.map((d, index) => (        
                <div key={index} className="form_item">        
                    <label htmlFor="">{d[1]}: </label>
                    <input required disabled={disabled && !editable} type={d[2]} name={d[0]} value={(!editable && !disabled ? inputState[d[0]] : fetchedResident?.[d[0]]?? "")} onChange={(e) => {!editable && !disabled ? setInputState({...inputState, [d[0]] : e.target.value}) : setFetchedResident({...fetchedResident, [d[0]] : e.target.value})}}/>
                    <br />
                </div>
            ))}
        </> 
    )
}