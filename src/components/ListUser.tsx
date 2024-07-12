import { User } from "../types"
interface Props{
    deleteUser:(e:string)=>void,
    users:User[],
    showColors:boolean
}

export const ListUser=({deleteUser,users,showColors}:Props)=>{
    return(
        <table width={'100%'}>
            <thead>
                <td>Foto</td>
                <td>Nombre</td>
                <td>Apellido</td>
                <td>Pais</td>
                <td>Acciones</td>
            </thead>
            <tbody>
                {users.map((user,index)=>{
                    const backgroundColor=index%2===0?'#333':'#555'
                    const color=showColors?backgroundColor:'transparent'
                    return (
                        <tr style={{backgroundColor:color}} key={user.login?.uuid}>
                            <td><img src={user.picture?.thumbnail}></img></td>
                        <td>{user.name?.first}</td>
                        <td>{user.name?.last}</td>
                        <td>{user.location?.country}</td>
                        <td>
                            <button onClick={()=>{deleteUser(user.login?.uuid)}}>Delete</button>
                        </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}