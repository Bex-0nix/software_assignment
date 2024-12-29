"use client"

import { useState } from 'react'
import './page.css' 
import StatefulContainer from './statefulContainer'
import State from './state'
import RouterButton from './routerButton'
import HomePage from './homePage'
export default function Home(){
  const page = {"admin" : "Admin",
                "resident" : "Resident"
  };

  const [content, setContent] = useState(
    <>
      <button onClick={() => {
        setContent(<HomePage page={page["admin"]}/>)
      }}>Admin</button>
      <br />
      <button onClick={() => {
        setContent(<HomePage page={page["resident"]}/>)
      }}>Resident</button>
    </>
  )
  
  return (
    <>
      {content}
    </>
  )
}

