/* eslint-disable @typescript-eslint/no-unused-vars */

import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";

export const useRecipePaginated = ({name, restriction, page, size}) => {
    return useQuery("recipes", async() => {
        const {data} = await axios.get(`http://localhost:2804/api/recipes/filterByName?name=${name}&restriction=${restriction}&page=${page}&size=${size}`);
        return data;
    })
};

export default useRecipePaginated;
