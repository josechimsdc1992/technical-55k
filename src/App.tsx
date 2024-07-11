import { useEffect, useState } from 'react'
import './App.css'
import { type User } from './types'
import { ListUser } from './components/ListUser'

function App() {

  const [users,setUsers]=useState<Array<User>>([])
  const [showColors,setShowCColors]=useState(false)
  
  const toggleColors=()=>{
    setShowCColors(!showColors)
  }

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
        <header>
          <button onClick={toggleColors}>Colorear</button>
        </header>
        <main>
          <ListUser showColors={showColors} users={users}></ListUser>
        </main>
        
      </div>
    </>
  )
}

export default App
