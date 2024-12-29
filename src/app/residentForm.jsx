import { useState } from "react"

const resident = {};

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
    
    function saveData(){
        resident["id"] = inputState.id; if (inputState.id == "") return false;
        resident["fullName"] = inputState.fullName; if (inputState.fullName == "") return false;
        resident["dateOfBirth"] = inputState.dateOfBirth; if (inputState.dateOfBirth == "") return false;
        resident["gender"] = inputState.gender; if (inputState.gender == "") return false;
        resident["maritalStatus"] = inputState.maritalStatus; if (inputState.maritalStatus == "") return false;
        resident["nationality"] = inputState.nationality; if (inputState.nationality == "") return false;
        resident["address"] = inputState.address; if (inputState.address == "") return false;
        resident["phoneNumber"] = inputState.phoneNumber; if (inputState.phoneNumber == "") return false;
        resident["emailAddress"] = inputState.emailAddress; if (inputState.emailAddress == "") return false;
        resident["motherName"] = inputState.motherName; if (inputState.motherName == "") return false;
        resident["fatherName"] = inputState.fatherName; if (inputState.fatherName == "") return false;
        resident["spouseName"] = inputState.spouseName; if (inputState.spouseName == "") return false;
        resident["numberOfDependents"] = inputState.numberOfDependents; if (inputState.numberOfDependents == "") return false;
        resident["emergencyContactName"] = inputState.emergencyContactName; if (inputState.emergencyContactName == "") return false;
        resident["emergencyContactRelationship"] = inputState.emergencyContactRelationship; if (inputState.emergencyContactRelationship == "") return false;
        resident["emergencyContactPhoneNumber"] = inputState.emergencyContactPhoneNumber; if (inputState.emergencyContactPhoneNumber == "") return false;
        resident["disabilityStatus"] = inputState.disabilityStatus; if (inputState.disabilityStatus == "") return false;
        resident["dateOfRegistration"] = inputState.dateOfRegistration; if (inputState.dateOfRegistration == "") return false;
        return true;   
    }

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

    return (
        <>
            <div className="appointment_form">
                <h1>{type} Resident</h1>
                <br />
                <form action="">
                    <label htmlFor="">id</label>
                    <input required type="text" name="id" id="id" value={inputState.id} onChange={(e) => {setInputState({...inputState, id: e.target.value})}}/>
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
                            <MoreData disabled={type == "Remove" ? true : false} fetchedResident={fetchedResident} setFetchedResident={setFetchedResident} inputState={inputState} setInputState={setInputState}/>   
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

function MoreData({disabled, fetchedResident, setFetchedResident, inputState, setInputState}){
    return(
        <>
            <label htmlFor="">fullName</label>
            <input required disabled={disabled} type="text" name="fullName" id="fullName" value={!disabled ? inputState.fullName : (fetchedResident?.fullName ?? "")} onChange={(e) => {!disabled ? setInputState({...inputState, fullName : e.target.value}) : setFetchedResident({...fetchedResident, fullName : e.target.value})}}/>
            <br />

            <label htmlFor="">dateOfBirth</label>
            <input required disabled={disabled} type="text" name="dateOfBirth" id="dateOfBirth" value={!disabled ? inputState.dateOfBirth : (fetchedResident?.dateOfBirth ?? "")} onChange={(e) => {!disabled && setInputState({...inputState, dateOfBirth : e.target.value})}}/>
            <br />

            <label htmlFor="">gender</label>
            <input required disabled={disabled} type="text" name="gender" id="gender" value={!disabled ? inputState.gender : (fetchedResident?.gender ?? "")} onChange={(e) => {!disabled && setInputState({...inputState, gender : e.target.value})}}/>
            <br />

            <label htmlFor="">maritalStatus</label>
            <input required disabled={disabled} type="text" name="maritalStatus" id="maritalStatus" value={!disabled ? inputState.maritalStatus : (fetchedResident?.maritalStatus ?? "")} onChange={(e) => {!disabled && setInputState({...inputState, maritalStatus : e.target.value})}}/>
            <br />

            <label htmlFor="">nationality</label>
            <input required disabled={disabled} type="text" name="nationality" id="nationality" value={!disabled ? inputState.nationality : (fetchedResident?.nationality ?? "")} onChange={(e) => {!disabled && setInputState({...inputState, nationality : e.target.value})}}/>
            <br />

            <label htmlFor="">address</label>
            <input required disabled={disabled} type="text" name="address" id="address" value={!disabled ? inputState.address : (fetchedResident?.address ?? "")} onChange={(e) => {!disabled && setInputState({...inputState, address : e.target.value})}}/>
            <br />

            <label htmlFor="">phoneNumber</label>
            <input required disabled={disabled} type="text" name="phoneNumber" id="phoneNumber" value={!disabled ? inputState.phoneNumber : (fetchedResident?.phoneNumber ?? "")} onChange={(e) => {!disabled && setInputState({...inputState, phoneNumber : e.target.value})}}/>
            <br />

            <label htmlFor="">emailAddress</label>
            <input required disabled={disabled} type="text" name="emailAddress" id="emailAddress" value={!disabled ? inputState.emailAddress : (fetchedResident?.emailAddress ?? "")} onChange={(e) => {!disabled && setInputState({...inputState, emailAddress : e.target.value})}}/>
            <br />

            <label htmlFor="">motherName</label>
            <input required disabled={disabled} type="text" name="motherName" id="motherName" value={!disabled ? inputState.motherName : (fetchedResident?.motherName ?? "")} onChange={(e) => {!disabled && setInputState({...inputState, motherName : e.target.value})}}/>
            <br />

            <label htmlFor="">fatherName</label>
            <input required disabled={disabled} type="text" name="fatherName" id="fatherName" value={!disabled ? inputState.fatherName : (fetchedResident?.fatherName ?? "")} onChange={(e) => {!disabled && setInputState({...inputState, fatherName : e.target.value})}}/>
            <br />

            <label htmlFor="">spouseName</label>
            <input required disabled={disabled} type="text" name="spouseName" id="spouseName" value={!disabled ? inputState.spouseName : (fetchedResident?.spouseName ?? "")} onChange={(e) => {!disabled && setInputState({...inputState, spouseName : e.target.value})}}/>
            <br />

            <label htmlFor="">numberOfDependents</label>
            <input required disabled={disabled} type="text" name="numberOfDependents" id="numberOfDependents" value={!disabled ? inputState.numberOfDependents : (fetchedResident?.numberOfDependents ?? "")} onChange={(e) => {!disabled && setInputState({...inputState, numberOfDependents : e.target.value})}}/>
            <br />

            <label htmlFor="">emergencyContactName</label>
            <input required disabled={disabled} type="text" name="emergencyContactName" id="emergencyContactName" value={!disabled ? inputState.emergencyContactName : (fetchedResident?.emergencyContactName ?? "")} onChange={(e) => {!disabled && setInputState({...inputState, emergencyContactName : e.target.value})}}/>
            <br />

            <label htmlFor="">emergencyContactRelationship</label>
            <input required disabled={disabled} type="text" name="emergencyContactRelationship" id="emergencyContactRelationship" value={!disabled ? inputState.emergencyContactRelationship : (fetchedResident?.emergencyContactRelationship ?? "")} onChange={(e) => {!disabled && setInputState({...inputState, emergencyContactRelationship : e.target.value})}}/>
            <br />

            <label htmlFor="">emergencyContactPhoneNumber</label>
            <input required disabled={disabled} type="text" name="emergencyContactPhoneNumber" id="emergencyContactPhoneNumber" value={!disabled ? inputState.emergencyContactPhoneNumber : (fetchedResident?.emergencyContactPhoneNumber ?? "")} onChange={(e) => {!disabled && setInputState({...inputState, emergencyContactPhoneNumber : e.target.value})}}/>
            <br />

            <label htmlFor="">disabilityStatus</label>
            <input required disabled={disabled} type="text" name="disabilityStatus" id="disabilityStatus" value={!disabled ? inputState.disabilityStatus : (fetchedResident?.disabilityStatus ?? "")} onChange={(e) => {!disabled && setInputState({...inputState, disabilityStatus : e.target.value})}}/>
            <br />

            <label htmlFor="">dateOfRegistration</label>
            <input required disabled={disabled} type="text" name="dateOfRegistration" id="dateOfRegistration" value={!disabled ? inputState.dateOfRegistration : (fetchedResident?.dateOfRegistration ?? "")} onChange={(e) => {!disabled && setInputState({...inputState, dateOfRegistration : e.target.value})}}/>
            <br />
        </>
    )
}