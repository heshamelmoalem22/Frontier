/* eslint-disable no-undef */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Login as LoginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
    const queryClient=useQueryClient();
  const navigate = useNavigate();

  const { mutate: Login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => LoginApi({ email, password }),
    onSuccess: (user) => {
        queryClient.setQueryData(["user"],user.user)
      navigate("/dashboard");
    },
    onError: (err) => {
      console.log("error", err);
      toast.error("Provided email or password incorrect");
    }
  });

  return { Login, isLoading };
}
