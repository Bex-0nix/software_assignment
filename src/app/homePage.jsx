import ResidentInterface from './residentInterface'
import AdminInterface from './adminInterface'

export default function HomePage({page}){

    return (
        <>
            {page == "Admin" ? <AdminInterface /> : <ResidentInterface />}
        </>
    )
}