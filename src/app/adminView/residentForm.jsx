import { useEffect, useState } from "react"
import { useStatefulContainer } from "@/app/statefulContainer/statefulContainerContext" 
import Alert from "../alert/alert";

const resident = {};
const data = [
    ["fullName" , "Full Name"],
    ["dateOfBirth" , "Birth Date"],
    ["gender" , "Gender"],
    ["maritalStatus" , "Marital Status"],
    ["nationality" , "Nationality"],
    ["address" , "Address"],
    ["phoneNumber" , "Phone Number"],
    ["emailAddress" , "Email"],
    ["motherName" , "Mother's Name"],
    ["fatherName" , "Father's Name"],
    ["spouseName" , "Spouse's Name"],
    ["numberOfDependents" , "Number Of Dependents"],
    ["emergencyContactName" , "Emergency Contact"],
    ["emergencyContactRelationship" , "Emergency Contact Relationship"],
    ["emergencyContactPhoneNumber" , "Emergency Contact Number"],
    ["disabilityStatus" , "Disability Status"],
    ["dateOfRegistration" , "Registration Date"]
]

export default function ResidentForm({type, residents, handleSubmit}){
    const {contents} = useStatefulContainer();
    
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
    }, [type])

    const [alertContent, setAlertContent] = useState(null);

    function saveData() {
        for (let resident of residents){
            if (resident["id"] == inputState["id"] && type == "Add") {
                setAlertContent(<><Alert title="Form Alert" message="Duplicate ID" setAlertContent={setAlertContent}/></>);
                return false;
            }
        }
        data.unshift("id");
        for (let d of data) {
            if ((inputState[d[0]] == "" && type == "Add") || (d[0] != "id" && fetchedResident[d[0]] == "" && type == "Edit")) {
                data.shift()
                setAlertContent(<><Alert title="Form Alert" message="Missing Input" setAlertContent={setAlertContent}/></>);
                return false;
            }
            type == "Add" ? resident[d[0]] = inputState[d[0]] : resident[d[0]] = fetchedResident[d[0]];  
        }
        data.shift()
        return true;
    }
    
    return (
        <>
            {alertContent}
            <div className="form resident_form">
                <h1>{type} Resident</h1>
                <br />
                <form action="">
                    <label htmlFor="">ID: </label>
                    <input required type="text" name="id" value={inputState.id} onChange={(e) => {setInputState({...inputState, id: e.target.value})}}/>
                    <br />
                    
                    { type == "Remove" || type == "Edit" ? 
                        (
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
                            <br />           
                            <MoreData disabled={type == "Remove" ? true : false} editable={type == "Edit" ? true : false} fetchedResident={fetchedResident} setFetchedResident={setFetchedResident} inputState={inputState} setInputState={setInputState}/>   
                        </>
                        )  
                        : 
                        (
                            <>
                            <MoreData disabled={false} editable={false} inputState={inputState} setInputState={setInputState}/>
                            <br />           
                        </>
                    )}

                    <input type="submit" value="submit" onClick={(e) => {saveData() ? handleSubmit(e, type, resident) :  e.preventDefault();}}/>
                </form>
            </div>
        </>
    )
}

function MoreData({disabled, editable, fetchedResident, setFetchedResident, inputState, setInputState}){
    
    return(
        <>
            {data.map((d, index) => (        
                <div key={index}>        
                    <label htmlFor="">{d[1]}: </label>
                    <input required disabled={disabled && !editable} type="text" name={d[0]} value={(!editable && !disabled ? inputState[d[0]] : fetchedResident?.[d[0]]?? "")} onChange={(e) => {!editable && !disabled ? setInputState({...inputState, [d[0]] : e.target.value}) : setFetchedResident({...fetchedResident, [d[0]] : e.target.value})}}/>
                    <br />
                </div>
            ))}
        </> 
    )
}