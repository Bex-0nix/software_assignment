"use client"
import './dropdown.css'
import { useState, useRef } from "react";

export default function Dropdown(props){
    let {name, h, w, children} = props; 
    // if ({w} == undefined){
    //     let {W} = '200px';
    // }
    // if
    let [toggled, setToggled] = useState(false);
    let [arrow, setArrow] = useState('▼')
    let dropdown = useRef()
    function toggle(){
        // dropdown.current.style.width = '200px';
        if (toggled){
            dropdown.current.style.height = '0px';
            setArrow('▼');
        }
        else{
            dropdown.current.style.height = '200px';
            setArrow('▲');
        }
        setToggled(!toggled);
    }
    return (
        <div className='dropdown_outer_container'>
            <div className='dropdown_inner_container'>
                <h3 onClick={() => {toggle()}}>{name}{arrow}</h3>
                <div className="dropdown" ref={dropdown}>
                    {children}
                </div>                
            </div>                
        </div>
    )
}
