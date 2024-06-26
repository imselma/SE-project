/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMutation, useQueryClient } from "react-query"
import axios from "axios";


const useCreateAdvice = () => {
    const queryClient = useQueryClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return useMutation((recipeData: any) =>
        axios.post("http://localhost:2804/api/advices/addAdvice", recipeData) )
}

export default useCreateAdvice;