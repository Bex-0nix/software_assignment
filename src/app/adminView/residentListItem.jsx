import RouterButton from "../statefulContainer/routerButton"

export default function ResidentListItem({resident}){
    const passedId = resident.id
    return(
        <div className="list_item">
            {Object.keys(resident).map((key) => (
                <div className="list_item_piece">
                    <label>{key}</label>
                    <h3>{resident[key]}</h3>
                </div>
            ))}
            <div className="list_item_links">
                <RouterButton className="link" route="Edit" data={passedId}>Edit</RouterButton>
                <RouterButton className="link" route="Remove" data={passedId}>Remove</RouterButton>
            </div>

        </div>
    )
}