import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";
import toast from "react-hot-toast";

function useDeleteCabin() {
    const queryClient = useQueryClient();
    const { mutate: deleteCabin, isLoading:isDeleting } = useMutation({
    mutationFn: deleteCabinApi,
    onSuccess: () => {
      toast.success("Cabin deleted");
      queryClient.invalidateQueries({ queryKey: ["cabin"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { deleteCabin, isDeleting };
}

export default useDeleteCabin
