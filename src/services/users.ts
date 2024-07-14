import { Welcome } from "../types"

export const fetchProjects = async ({ pageParam }:{pageParam:Number}):Promise<Welcome> => {
    const res = await fetch(`https://randomuser.me/api/?results=10&seed=abc&page=${pageParam}&gender=female`)
    return res.json()
  }