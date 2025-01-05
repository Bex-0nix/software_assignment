import ResidentListItem from './residentListItem'

export default function ResidentList({residents}){
    
    return (
        <div className='list resident_list'>
            <h1>All residents</h1>
            {residents.map((resident, index) => <ResidentListItem key={index} resident={resident} />)}
        </div>
    )
}