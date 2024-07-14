import { User } from "../types"
interface Props{
    changeSorting:(sort:SortBy)=>void
    deleteUser:(e:string | undefined)=>void,
    users:User[],
    showColors:boolean
}
export enum SortBy{
    NONE='',
    NAME='name',
    LAST='last',
    COUNTRY='country'
}

export const ListUser=({changeSorting,deleteUser,users,showColors}:Props)=>{
    return(
        <table width={'100%'}>
            <thead>
                <td>Foto</td>
                <td className="pointer" onClick={()=>{changeSorting(SortBy.NAME)}}>Nombre</td>
                <td className="pointer" onClick={()=>{changeSorting(SortBy.LAST)}}>Apellido</td>
                <td className="pointer" onClick={()=>{changeSorting(SortBy.COUNTRY)}}>Pais</td>
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