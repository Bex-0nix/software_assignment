import ResidentListItem from './residentListItem'

export default function ResidentList({residents}){
    
    return (
        <div>
            <h1>All residents</h1><br />
            {residents.map((resident, index) => <ResidentListItem key={index} resident={resident} />)}
        </div>
    )
}