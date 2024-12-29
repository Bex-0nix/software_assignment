import { useState } from "react"

const resident = {};
const data = [
    "id",
    "fullName",
    "dateOfBirth",
    "gender",
    "maritalStatus",
    "nationality",
    "address",
    "phoneNumber",
    "emailAddress",
    "motherName",
    "fatherName",
    "spouseName",
    "numberOfDependents",
    "emergencyContactName",
    "emergencyContactRelationship",
    "emergencyContactPhoneNumber",
    "disabilityStatus",
    "dateOfRegistration",
]

export default function ResidentForm({type, residents, handleSubmit}){
    const [fetchedResident, setFetchedResident] = useState({
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
    });
    
    const [inputState, setInputState] = useState({
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
    
    function saveData(){
        data.some((d) => {
            resident[d] = inputState[d]; if (inputState[d] == "") return false;
        });
        return true;   
    }
    
    return (
        <>
            <div className="appointment_form">
                <h1>{type} Resident</h1>
                <br />
                <form action="">
                    <label htmlFor="">id: </label>
                    <input required type="text" name="id" value={inputState.id} onChange={(e) => {setInputState({...inputState, id: e.target.value})}}/>
                    <br />
                    
                    { type == "Remove" || type == "Edit"? 
                        (
                        <>
                            <button onClick={(e) => {
                                setFetchedResident(residents[residents.findIndex(resident => resident["id"] == inputState.id)])
                                console.log(fetchedResident);
                                e.preventDefault()
                            }}>Find</button>
                            <br />           
                            <MoreData disabled={type == "Remove" ? true : false} editable={type == "Edit" ? true : false} fetchedResident={fetchedResident} setFetchedResident={setFetchedResident} inputState={inputState} setInputState={setInputState}/>   
                        </>
                        ) 
                        : 
                        (
                            <>
                            <MoreData disabled={false} inputState={inputState} setInputState={setInputState}/>
                            <br />           
                        </>
                    )}

                    <input type="submit" value="submit" onClick={(e) => {saveData() ? handleSubmit(e, type, resident) : e.preventDefault()}}/>
                </form>
            </div>
        </>
    )
}

function MoreData({disabled, editable, fetchedResident, setFetchedResident, inputState, setInputState}){
    
    data

    return(
        <>
            {data.map((d, index) => (        
                <div key={index}>        
                    <label htmlFor="">{d}: </label>
                    <input required disabled={disabled && !editable} type="text" name={d} value={(fetchedResident?.[d] ?? "")} onChange={(e) => {!editable ? setInputState({...inputState, [d] : e.target.value}) : setFetchedResident({...fetchedResident, [d] : e.target.value})}}/>
                    <br />
                </div>
            ))}
        </> 
    )
}