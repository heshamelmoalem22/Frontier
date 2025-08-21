// src/features/cabins/useCreateEditCabin.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useCreateEditCabin(onSuccessCallback) {
  const queryClient = useQueryClient();

  const { mutate: createOrEditCabin, isLoading } = useMutation({
    mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success("Cabin saved successfully!");
      queryClient.invalidateQueries({ queryKey: ["cabin"] });

      if (onSuccessCallback) onSuccessCallback();
    },
    onError: (err) => {
      toast.error(`Error: ${err.message}`);
    },
  }); 

  return { createOrEditCabin, isLoading };
}
