import {useRef} from "react"

export default function Alert({title, message, setAlertContent}){
    const alertBox = useRef();

    function handleAlert(e){
        e.preventDefault();
        if (alertBox.current && e.target !== alertBox.current){
            setAlertContent(null);
        }
        document.removeEventListener('mousedown', handleAlert);
    }

    document.addEventListener('mousedown', handleAlert);
    
    return (
        <>
            {(<div ref={alertBox} style={{border: "1px solid white"}} className="alert">
                <h1 className="alert_title">{title}</h1>
                <div className="alert_message">
                    {message}
                </div>
            </div>)}
        </>
    )
}
