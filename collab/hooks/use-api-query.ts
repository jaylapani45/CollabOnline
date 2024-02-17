import { useQuery } from "convex/react";
import { useState } from "react";

export const useApiQuery =(queryFunction:any)=>{
    const [pending,setPanding] = useState(false);
    const apiQuery = useQuery(queryFunction);

    const query = (payload:any)=>{
        setPanding(true);
        return apiQuery(payload)
        .finally(()=>setPanding(false))
        .then(()=>{return apiQuery})
        .catch(()=>{throw Error})

}
return {query,pending};
}