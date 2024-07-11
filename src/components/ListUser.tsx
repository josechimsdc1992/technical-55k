import { User } from "../types"
interface Props{
    users:User[],
    showColors:boolean
}

export const ListUser=({users,showColors}:Props)=>{
    return(
        <table width={'100%'}>
            <thead>
                <th>Foto</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Pais</th>
                <th>Acciones</th>
            </thead>
            <tbody>
                {users.map((user,index)=>{
                    const backgroundColor=index%2===0?'#333':'#555'
                    const color=showColors?backgroundColor:'transparent'
                    return (
                        <tr style={{backgroundColor:color}} key={user.id?.value}>
                            <td><img src={user.picture?.thumbnail}></img></td>
                        <td>{user.name?.first}</td>
                        <td>{user.name?.last}</td>
                        <td>{user.location?.country}</td>
                        <td>
                            <button>Delete</button>
                        </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}