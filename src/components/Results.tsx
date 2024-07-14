import { useUsers } from "../hooks/useUsers"

export const Result=()=>{
    const {users}= useUsers()

    return <h3>Result:{users.length}</h3>
}