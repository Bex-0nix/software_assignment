import RouterButton from "../statefulContainer/routerButton"

export default function ResidentListItem({resident}){
    const passedId = resident.id
    return(
        <div className="list_item">
            {Object.keys(resident).map((key) => (
                <div className="list_item_piece">
                    <label>{key.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/^([a-z])/, (match) => match.toUpperCase())}:</label>
                    <h4>{resident[key]}</h4>
                </div>
            ))}
            <div className="list_item_links">
                <RouterButton route="Edit" className="router" data={passedId}>Edit</RouterButton>
                <RouterButton route="Remove" className="router" data={passedId}>Remove</RouterButton>
            </div>

        </div>
    )
}