/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { Advice } from "../utils/types";

const useAdviceById= () => {
    const queryClient = useQueryClient();

    return useMutation(
        (id: string) => axios.get<Advice>(`http://localhost:2804/api/advice/notDTO/${id}`).then((response) => response.data),);
};

export default useAdviceById;