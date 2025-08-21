import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCheckIn(){
    const navigate=useNavigate();
    const queryClient=useQueryClient();
    const{mutate: checkIn,isLoading: isCheckIn}=
    useMutation({
        mutationFn:({bookingId,breakfast})=>updateBooking(bookingId,{
            status:"checked-in",
            isPaid:true,
            ...breakfast

        }),
        onSuccess:(data)=>{
            toast.success(`booking #${data.id} is checkedIn successfully`)
            queryClient.invalidateQueries({active:true})
            navigate("/")
        },
        onError:()=>toast.error(`booking  is failed to be checked`)

    })
    return { checkIn, isCheckIn };
}