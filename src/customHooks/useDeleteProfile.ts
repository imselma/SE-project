/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { String } from "aws-sdk/clients/batch";

const useDeleteProfile = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (id: any) => axios.delete(`http://localhost:2804/api/users/${id}`));
};

export default useDeleteProfile;