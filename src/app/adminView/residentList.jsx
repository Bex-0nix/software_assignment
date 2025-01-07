import { useState, useEffect } from 'react';
import ResidentListItem from './residentListItem'
import Alert from "@/app/alert/alert"

export default function ResidentList(){
    const [alertContent, setAlertContent] = useState(null)
    const [residents, setResidents] = useState([])
    const [loading, setLoading] = useState(true)
    const [submitted, setSubmitted] = useState(true)

    useEffect(() => {

        async function load(){
            try {
                const response = await fetch('/api/resident', {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                if (response.ok){
                    let residentData = await response.json()
                    console.log(residentData)
                    setResidents(residentData.data)
                    setLoading(false)
                }
                else{
                    setAlertContent(<Alert title="Form Error" message={response.message}/>)
                }
            } catch (error) {
                setAlertContent(<Alert title="Form Error" message={error.message}/>)
            }
        }

        load();
    }, [submitted])

    return (
        <>
            {alertContent}
            {!loading &&
                <div className='list resident_list'>
                    <h1>All residents</h1>
                    <div className="list_cont">
                        {residents.map((resident, index) => <ResidentListItem key={index} resident={resident} />)}
                    </div>
                </div>
            }
        </>
    )
}