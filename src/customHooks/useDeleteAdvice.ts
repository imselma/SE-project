/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

const useDeleteAdvice = () => {
    const queryClient = useQueryClient();

    return useMutation(
        (id: any) => axios.delete(`http://localhost:2804/api/advices/${id}`));
};

export default useDeleteAdvice;