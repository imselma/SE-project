/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import { useQuery } from "react-query";

const useIngredients = () => {
    return useQuery('recipes',
    () => axios.get("https://se-project-abp1.onrender.com/api/ingredients/").then(
        (response) => {
            const data = response.data;
            return data;
        }));
}

export default useIngredients;