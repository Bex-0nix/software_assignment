import RouterButton from "../statefulContainer/routerButton"

export default function ResidentListItem({resident}){
    const passedId = resident.id
    return(
        <div className="resident_view_box">
            <h1>ID: {resident["id"]}</h1>
            <h1>Name: {resident["fullName"]}</h1>
            <h1>Birth Date: {resident["dateOfBirth"]}</h1>
            <br />
            <RouterButton className="link" route="Edit Resident" data={passedId}>Edit</RouterButton>
            <RouterButton className="link" route="Remove Resident" data={passedId}>Remove</RouterButton>
            <br />
        </div>
    )
}