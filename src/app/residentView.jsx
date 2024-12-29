import ResidentForm from './residentForm'
import ResidentList from './residentList'
import residents from './residents.JSON'

function handleSubmit(event, type, residents){
    if (type == "List"){
        
    }
    else if (type == "Add"){
        const blob = new Blob([JSON.stringify(residents, null, residents.length)], { type: 'application/json' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = './residents.JSON';
        link.click();
    }
    else if (type == "Edit"){
        
    }
    else if (type == "Remove"){
        
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