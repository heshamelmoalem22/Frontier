import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

export function useSetting() {
    const{isLoading, data, error} = useQuery({
        queryKey: ['settings'],
        queryFn: getSettings,
    });  
    return{
        isLoading,
        data,  
        error 
    }
}