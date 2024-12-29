export default function ResidentListItem({resident}){
    return(
        <div className="resident_view_box">
            <h1>
            ID: {resident["id"]}
            </h1>
            <h1>
            Name: {resident["fullName"]}
            </h1>
            <h1>
            Birth Date: {resident["dateOfBirth"]}
            </h1>
            <br />
        </div>
    )
}