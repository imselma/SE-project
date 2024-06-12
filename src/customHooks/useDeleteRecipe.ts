/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { String } from "aws-sdk/clients/batch";

const useDeleteRecipe = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (id: any) => axios.delete(`https://se-project-abp1.onrender.com/api/recipes/${id}`));
};

export default useDeleteRecipe;