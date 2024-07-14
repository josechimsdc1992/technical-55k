import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { fetchProjects } from "../services/users";
import { Welcome } from "../types";
export const useUsers=()=>{
    const {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        refetch,
        status,
      } = useInfiniteQuery<Welcome,Error,InfiniteData<Welcome,unknown>,string[],number>({
        queryKey: ['projects'],
        queryFn: fetchProjects,
        initialPageParam: 0,
        getNextPageParam: (lastPage) => {
          const actualPage=lastPage?.info.page
          return actualPage>10?undefined: lastPage.info.page+1
        },
        refetchOnWindowFocus:false
      })
      return {users:data?.pages?.flatMap(page=>page.results) || [],error,fetchNextPage,hasNextPage,refetch,status}
}