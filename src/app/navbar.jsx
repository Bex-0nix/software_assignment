import './navbar.css'
import Dropdown from './dropdown'

export default function Navbar(){
    return (
        <>
            <nav>
                <h1><a href="/">Home</a></h1>
                <Dropdown name="dropdown">
                    <ul>
                        <li>
                            about                        
                        </li>
                        <li>
                            pricing
                        </li>
                        <li>
                            contact
                        </li>
                        <li>
                            more
                        </li>
                    </ul>
                </Dropdown>
                <br />
            </nav>
        </>
    )
}