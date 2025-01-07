import ResidentForm from './residentForm'
import ResidentList from './residentList'

export default function ResidentView({type}){
    
   
    return (
        <>
            {type == "Add" || type == "Edit" || type == "Remove" ? (
                <ResidentForm type={type}/>
            ) 
            :
            (
                <ResidentList />
            )}
        </>
    )
}