/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMutation, useQueryClient } from "react-query"
import { Ingredient } from "../utils/types";
import axios from "axios";


const useCreateIngredient = () => {
    const queryClient = useQueryClient();
    return useMutation((ingredientData: Ingredient) => 
    axios.post("http://localhost:2804/api/ingredients/addIngredient", ingredientData) )
}

export default useCreateIngredient