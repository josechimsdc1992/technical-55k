import { useEffect, useRef, useState } from 'react'
import './App.css'
import { type User } from './types'
import { ListUser } from './components/ListUser'

function App() {

  const [users,setUsers]=useState<Array<User>>([])
  const originalUsers=useRef<User[]>([])
  const [showColors,setShowCColors]=useState(false)
  const [sortByCountry,setSortByCountry]=useState(false)
  
  const toggleColors=()=>{
    setShowCColors(!showColors)
  }

  const toggleSortByCountry=()=>{
    setSortByCountry(prevState=>!prevState)
  }

  const handleReset=()=>{
    setUsers(originalUsers.current)
  }

  const handleDelete=(uuid:string)=>{
    const filteredUsers=users.filter((user)=>user.login?.uuid!=uuid)
    setUsers(filteredUsers)
  }

  useEffect(()=>{
    fetch('https://randomuser.me/api/?page=3&results=100&seed=abc')
    .then(async res=>await res.json())
    .then(res=>{
      setUsers(res.results)
      originalUsers.current=res.results
    })
    .catch(er=>{
      console.log(er)
    })
  },[])

  const sortedUsers=sortByCountry? users.toSorted((a,b)=>{
    return a.location?.country.localeCompare(b.location?.country)
  }):users

  return (
    <>
      <div>
        <h1>Prueba Tecnica</h1>
        <header>
          <button onClick={toggleColors}>Colorear</button>
          <button onClick={toggleSortByCountry}>{sortByCountry? 'No ordenar por pais':'Ordenar por pais'}</button>
          <button onClick={handleReset}>Reset Users</button>
        </header>
        <main>
          <ListUser deleteUser={handleDelete} showColors={showColors} users={sortedUsers}></ListUser>
        </main>
        
      </div>
    </>
  )
}

export default App
