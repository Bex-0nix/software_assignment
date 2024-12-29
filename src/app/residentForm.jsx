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
                    <label htmlFor="">id</label>
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
            {/* {data.map((d) => {
                
            })} */}
            <label htmlFor="">fullName</label>
            <input required disabled={disabled && !editable} type="text" name="fullName" value={(fetchedResident?.fullName ?? "")} onChange={(e) => {!disabled ? setInputState({...inputState, fullName : e.target.value}) : setFetchedResident({...fetchedResident, fullName : e.target.value})}}/>
            <br />

            <label htmlFor="">dateOfBirth</label>
            <input required disabled={disabled && !editable} type="text" name="dateOfBirth" value={(fetchedResident?.dateOfBirth ?? "")} onChange={(e) => {!disabled && setInputState({...inputState, dateOfBirth : e.target.value})}}/>
            <br />

            <label htmlFor="">gender</label>
            <input required disabled={disabled && !editable} type="text" name="gender" value={(fetchedResident?.gender ?? "")} onChange={(e) => {!disabled && setInputState({...inputState, gender : e.target.value})}}/>
            <br />

            <label htmlFor="">maritalStatus</label>
            <input required disabled={disabled && !editable} type="text" name="maritalStatus" value={(fetchedResident?.maritalStatus ?? "")} onChange={(e) => {!disabled && setInputState({...inputState, maritalStatus : e.target.value})}}/>
            <br />

            <label htmlFor="">nationality</label>
            <input required disabled={disabled && !editable} type="text" name="nationality" value={(fetchedResident?.nationality ?? "")} onChange={(e) => {!disabled && setInputState({...inputState, nationality : e.target.value})}}/>
            <br />

            <label htmlFor="">address</label>
            <input required disabled={disabled && !editable} type="text" name="address" value={(fetchedResident?.address ?? "")} onChange={(e) => {!disabled && setInputState({...inputState, address : e.target.value})}}/>
            <br />

            <label htmlFor="">phoneNumber</label>
            <input required disabled={disabled && !editable} type="text" name="phoneNumber" value={(fetchedResident?.phoneNumber ?? "")} onChange={(e) => {!disabled && setInputState({...inputState, phoneNumber : e.target.value})}}/>
            <br />

            <label htmlFor="">emailAddress</label>
            <input required disabled={disabled && !editable} type="text" name="emailAddress" value={(fetchedResident?.emailAddress ?? "")} onChange={(e) => {!disabled && setInputState({...inputState, emailAddress : e.target.value})}}/>
            <br />

            <label htmlFor="">motherName</label>
            <input required disabled={disabled && !editable} type="text" name="motherName" value={(fetchedResident?.motherName ?? "")} onChange={(e) => {!disabled && setInputState({...inputState, motherName : e.target.value})}}/>
            <br />

            <label htmlFor="">fatherName</label>
            <input required disabled={disabled && !editable} type="text" name="fatherName" value={(fetchedResident?.fatherName ?? "")} onChange={(e) => {!disabled && setInputState({...inputState, fatherName : e.target.value})}}/>
            <br />

            <label htmlFor="">spouseName</label>
            <input required disabled={disabled && !editable} type="text" name="spouseName" value={(fetchedResident?.spouseName ?? "")} onChange={(e) => {!disabled && setInputState({...inputState, spouseName : e.target.value})}}/>
            <br />

            <label htmlFor="">numberOfDependents</label>
            <input required disabled={disabled && !editable} type="text" name="numberOfDependents" value={(fetchedResident?.numberOfDependents ?? "")} onChange={(e) => {!disabled && setInputState({...inputState, numberOfDependents : e.target.value})}}/>
            <br />

            <label htmlFor="">emergencyContactName</label>
            <input required disabled={disabled && !editable} type="text" name="emergencyContactName" value={(fetchedResident?.emergencyContactName ?? "")} onChange={(e) => {!disabled && setInputState({...inputState, emergencyContactName : e.target.value})}}/>
            <br />

            <label htmlFor="">emergencyContactRelationship</label>
            <input required disabled={disabled && !editable} type="text" name="emergencyContactRelationship" value={(fetchedResident?.emergencyContactRelationship ?? "")} onChange={(e) => {!disabled && setInputState({...inputState, emergencyContactRelationship : e.target.value})}}/>
            <br />

            <label htmlFor="">emergencyContactPhoneNumber</label>
            <input required disabled={disabled && !editable} type="text" name="emergencyContactPhoneNumber" value={(fetchedResident?.emergencyContactPhoneNumber ?? "")} onChange={(e) => {!disabled && setInputState({...inputState, emergencyContactPhoneNumber : e.target.value})}}/>
            <br />

            <label htmlFor="">disabilityStatus</label>
            <input required disabled={disabled && !editable} type="text" name="disabilityStatus" value={(fetchedResident?.disabilityStatus ?? "")} onChange={(e) => {!disabled && setInputState({...inputState, disabilityStatus : e.target.value})}}/>
            <br />

            <label htmlFor="">dateOfRegistration</label>
            <input required disabled={disabled && !editable} type="text" name="dateOfRegistration" value={(fetchedResident?.dateOfRegistration ?? "")} onChange={(e) => {!disabled && setInputState({...inputState, dateOfRegistration : e.target.value})}}/>
            <br />
        </>
    )
}