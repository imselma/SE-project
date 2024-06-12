/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { Advice } from "../utils/types";

const useAdviceById= () => {
    const queryClient = useQueryClient();

    return useMutation(
        (id: string) => axios.get<Advice>(`https://se-project-abp1.onrender.com/api/advices/notDTO/${id}`).then((response) => response.data),);
};

export default useAdviceById;