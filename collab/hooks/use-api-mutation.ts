import { useMutation } from "convex/react";
import { useState } from "react";

export const useApiMutation =(mutationFunction:any)=>{
    const [pending,setPanding] = useState(false);
    const apiMutation = useMutation(mutationFunction);

    const mutate = (payload:any)=>{
        setPanding(true);
        return apiMutation(payload)
        .finally(()=>setPanding(false))
        .then((result)=>{return result})
        .catch((error)=>{throw error})

}
return {mutate,pending};
}