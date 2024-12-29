import ResidentForm from './residentForm'
import ResidentList from './residentList'
import residents from './residents.JSON'

function handleSubmit(event, type, resident){
    if (type == "List"){
        
    }
    else if (type == "Add"){
        // add to db
        residents.push(resident)
    }
    else if (type == "Edit"){
        // edit db
    }
    else if (type == "Remove"){
        //remove from db
    }
}

export default function ResidentView({type}){
    return (
        <>
            {type == "Add" || type == "Edit" || type == "Remove" ? (
                <ResidentForm type={type} handleSubmit={handleSubmit} residents={residents}/>
            ) 
            :
            (
                <ResidentList residents={residents} handleSubmit={handleSubmit} />
            )}
        </>
    )
}