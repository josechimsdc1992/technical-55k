import { useEffect, useState } from 'react'
import './App.css'
import { type User } from './types'

function App() {

  const [users,setUsers]=useState<Array<User>>([])

  useEffect(()=>{
    fetch('https://randomuser.me/api/?page=3&results=100&seed=abc')
    .then(async res=>await res.json())
    .then(res=>{
      setUsers(res.results)
      console.log(users)
    })
    .catch(er=>{
      console.log(er)
    })
  },[])

  return (
    <>
      <div>
        <h1>Prueba Tecnica</h1>
      </div>
    </>
  )
}

export default App
