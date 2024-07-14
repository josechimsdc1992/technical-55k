import { useQueryClient } from "@tanstack/react-query"
import { User } from "../types"

export const deleteUsers=async (uuid:string | undefined)=>{
    const queryclient=useQueryClient()
    await queryclient.setQueryData(['projects'],(oldData?:User[])=>{
        return oldData?.filter((user)=>user.login?.uuid!=uuid)
    })
}