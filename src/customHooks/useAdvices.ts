/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import { useQuery } from "react-query";

const useAdvices = () => {
    return useQuery('advices',
    () => axios.get("http://localhost:2804/api/advices/").then(
        (response) => {
            const data = response.data;
            console.log(data);

            return data;
        }));
}

export default useAdvices;