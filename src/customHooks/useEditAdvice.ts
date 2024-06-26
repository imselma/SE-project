/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { Advice2 } from "../utils/types";

const useEditAdvice = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ id, adviceData }: { id: any; adviceData: Advice2 }) => axios.put(`http://localhost:2804/api/advices/${id}`, adviceData));
};

export default useEditAdvice;