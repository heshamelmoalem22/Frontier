import { useMutation, useQueryClient } from "@tanstack/react-query";
import {  updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCheckout(){
    const navigate=useNavigate();
    const queryClient=useQueryClient();
    const{mutate: checkOut,isLoading: isCheckOut}=
    useMutation({
        mutationFn:(bookingId)=>updateBooking(bookingId,{
            status: "checked-out",


        }),
        onSuccess:(data)=>{
            toast.success(`booking #${data.id} is checkedOut successfully`)
            queryClient.invalidateQueries({active:true})
            // navigate("/")
        },
        onError:()=>toast.error(`booking  is failed to be checkedOut`)

    })
    return { checkOut, isCheckOut };
}