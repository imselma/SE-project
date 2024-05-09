import axios from "axios";
import { useQuery } from "react-query";

const useIngredients = () => {
    return useQuery('recipes',
    () => axios.get("http://localhost:2804/api/ingredients/").then(
        (response) => {
            const data = response.data;
            return data;
        }));
}

export default useIngredients;