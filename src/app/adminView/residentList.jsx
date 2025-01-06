import ResidentListItem from './residentListItem'

export default function ResidentList({residents}){
    
    return (
        <div className='list resident_list'>
            <h1>All residents</h1>
            <div className="list_cont">
                {residents.map((resident, index) => <ResidentListItem key={index} resident={resident} />)}
            </div>
        </div>
    )
}