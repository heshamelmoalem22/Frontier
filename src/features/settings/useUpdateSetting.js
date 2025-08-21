import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";

export function useUpdateSetting() {
    const queryClient = useQueryClient();
    const{mutate:updateSetting,isLoading:isEditing}=useMutation({
        mutationFn: updateSettingApi,  
        onSuccess: () => {
           toast.success("Settings updated successfully");
              queryClient.invalidateQueries({ queryKey: ["settings"] });
        },
        onError: (error) => {
            toast.error(`Error updating settings: ${error.message}`);
        },
        } );  
        return{isEditing, updateSetting};
    }