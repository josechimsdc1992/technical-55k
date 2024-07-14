import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import { type User } from './types'
import { ListUser,SortBy } from './components/ListUser'
import { useQuery } from '@tanstack/react-query'

const fetchUsers=async (currentPage:number)=>{
  return await fetch(`https://randomuser.me/api/?results=10&seed=abc&page=${currentPage}`)
  .then(async res=>{
    if(!res.ok) throw new Error('Error en la peticion')
    return await res.json()
  })
}

function App() {
  
  const [users,setUsers]=useState<User[]>([])
  const originalUsers=useRef<User[]>([])
  const [showColors,setShowCColors]=useState(false)
  const [sorting,setSorting]=useState<SortBy>(SortBy.NONE)
  const [filterCountry,setFilterCountry]=useState<String | null>(null)
  const [showLoading,setShowLoading]=useState(false)
  const [showError,setShowError]=useState(false)
  const [page,setPage]=useState(1)
  
  const toggleColors=()=>{
    setShowCColors(!showColors)
  }

  const toggleSortByCountry=()=>{
    const newSortingValue=sorting===SortBy.NONE?SortBy.COUNTRY:SortBy.NONE
    setSorting(newSortingValue)
  }

  const handleReset=()=>{
    setUsers(originalUsers.current)
    setPage(1)
  }

  const handleDelete=(uuid:string | undefined)=>{
    if(uuid!=undefined){
      const filteredUsers=users.filter((user)=>user.login?.uuid!=uuid)
      setUsers(filteredUsers)
    }
  }

  const handleChangeSort=(sort:SortBy)=>{
    setSorting(sort)
  }

  

  useEffect(()=>{
    setShowLoading(true)
    setShowError(false)

    fetchUsers(page)
    .then(res=>{
      setUsers( prevUsers=>prevUsers.concat(res.results))
      if(page==1){
        originalUsers.current=res.results
      }
      
    })
    .catch(er=>{
      console.log(er)
      setShowError(true)
    })
    .finally(
      ()=>{
        setShowLoading(false)
      }
    )
  },[page])

  const filteredUsers=useMemo(()=>{return filterCountry!=null && filterCountry.length>0? users.filter((user=>{
    return user.location?.country.toLowerCase().includes(filterCountry.toLowerCase())
  })):users},[users,filterCountry])

  const sortedUsers=useMemo(()=>{
    if(sorting===SortBy.NONE) return filteredUsers

    const compareProperties:Record<string,(user:User)=>any>={
      [SortBy.COUNTRY]:user=>user.location?.country,
      [SortBy.NAME]:user=>user.name?.first,
      [SortBy.LAST]:user=>user.name?.last
    }
    return filteredUsers.toSorted((a,b)=>{
      const extractProperty=compareProperties[sorting]
      return extractProperty(a).localeCompare(extractProperty(b))
    })
  },[filteredUsers,sorting])

  return (
    <>
      <div>
        <h1>Prueba Tecnica</h1>
        <header>
          <button onClick={toggleColors}>Colorear</button>
          <button onClick={toggleSortByCountry}>{sorting==SortBy.COUNTRY? 'No ordenar por pais':'Ordenar por pais'}</button>
          <button onClick={handleReset}>Reset Users</button>
          <input onChange={(e)=>{
            setFilterCountry(e.target.value)
          }} placeholder='Filtra por pais'></input>
        </header>
        <main>
          {users.length>0 && <ListUser changeSorting={handleChangeSort} deleteUser={handleDelete} showColors={showColors} users={sortedUsers}></ListUser>}
          {showLoading && <p>Cargando</p>}
          {!showLoading && showError && <p>Ha habido un error</p>}
          {!showLoading && !showError && users.length===0 && <p>No hay usuarios</p>}
          {!showLoading && !showError && <button onClick={()=>{setPage(page+1)}}>Cargar Mas...</button>}
          
        </main>
        
      </div>
    </>
  )
}

export default App
