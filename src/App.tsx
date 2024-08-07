import { useMemo, useState } from 'react'
import './App.css'
import { Welcome, type User } from './types'
import { ListUser,SortBy } from './components/ListUser'
import { Result } from './components/Results'
import { useUsers } from './hooks/useUsers'
import { InfiniteData, useMutation, useQueryClient } from '@tanstack/react-query'

function App() {

  let {
    users,
    error,
    fetchNextPage,
    hasNextPage,
    refetch,
    status,
  } =useUsers()

  const deleteUsers=async (uuid:string | undefined)=>{
    return await uuid
  }

  const queryclient=useQueryClient()

  const {mutate,isPending}=useMutation({
    mutationFn:deleteUsers,
    onSuccess:async(uuid:string | undefined)=>{
      await queryclient.setQueryData(['projects'],(oldData:InfiniteData<Welcome,number>):InfiniteData<Welcome,number>=>{
        for(let i=0;i<oldData.pages.length;i++){

          const newUsers=uuid===undefined? oldData.pages[i].results: oldData.pages[i].results?.filter((user)=>user.login?.uuid!=uuid)  
          oldData.pages[i].results=newUsers
        }
        return oldData
    })
    }
  })
  //const originalUsers=useRef<User[]>([])
  const [showColors,setShowCColors]=useState(false)
  const [sorting,setSorting]=useState<SortBy>(SortBy.NONE)
  const [filterCountry,setFilterCountry]=useState<String | null>(null)

  const toggleColors=()=>{
    setShowCColors(!showColors)
  }

  const toggleSortByCountry=()=>{
    const newSortingValue=sorting===SortBy.NONE?SortBy.COUNTRY:SortBy.NONE
    setSorting(newSortingValue)
  }

  const handleReset=async()=>{
    await refetch()
  }

  const handleDelete=(uuid:string | undefined)=>{
    if(uuid!=undefined){
      mutate(uuid)
    }
  }

  const handleChangeSort=(sort:SortBy)=>{
    setSorting(sort)
  }

  const filteredUsers=useMemo(()=>{return filterCountry!=null && filterCountry.length>0? users?.filter((user=>{
    return user.location?.country.toLowerCase().includes(filterCountry.toLowerCase())
  })):users},[users,filterCountry])

  const sortedUsers=useMemo(()=>{
    if(sorting===SortBy.NONE) return filteredUsers

    const compareProperties:Record<string,(user:User)=>any>={
      [SortBy.COUNTRY]:user=>user.location?.country,
      [SortBy.NAME]:user=>user.name?.first,
      [SortBy.LAST]:user=>user.name?.last
    }
    return filteredUsers?.toSorted((a,b)=>{
      const extractProperty=compareProperties[sorting]
      return extractProperty(a).localeCompare(extractProperty(b))
    })
  },[filteredUsers,sorting])

  return (
    <>
      <div>
        <h1>Prueba Tecnica</h1>
        <Result></Result>
        <header>
          <button onClick={toggleColors}>Colorear</button>
          <button onClick={toggleSortByCountry}>{sorting==SortBy.COUNTRY? 'No ordenar por pais':'Ordenar por pais'}</button>
          <button onClick={handleReset}>Reset Users</button>
          <input onChange={(e)=>{
            setFilterCountry(e.target.value)
          }} placeholder='Filtra por pais'></input>
        </header>
        <main>
          {users!=undefined && users.length>0 && <ListUser changeSorting={handleChangeSort} deleteUser={handleDelete} showColors={showColors} users={sortedUsers}></ListUser>}
          {status === 'pending' && <p>Cargando</p>}
          {status === 'error' && <p>Error:{error?.message}</p>}
          {status !== 'error' && status !== 'pending' && hasNextPage && <button onClick={()=>{fetchNextPage()}}>Cargar Mas...</button>}
          
        </main>
        
      </div>
    </>
  )
}


export default App
