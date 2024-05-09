/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMutation, useQueryClient } from "react-query"
import { Recipe } from "../utils/types";
import axios from "axios";


const useCreateRecipe = () => {
    const queryClient = useQueryClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return useMutation((recipeData: any) => 
    axios.post("http://localhost:2804/api/recipes/addRecipe", recipeData) )
}

export default useCreateRecipe