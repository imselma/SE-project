/* eslint-disable @typescript-eslint/no-unused-vars */

import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

const useUserById = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (id: string) => axios.get(`https://se-project-abp1.onrender.com/api/users/notDTO/${id}`).then((response) => response.data),);
};

export default useUserById;