import { useMutation, useQueryClient } from "@tanstack/react-query";
import {  deleteBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";

export function useDeleteCheck(){
    // const navigate=useNavigate();
    const queryClient=useQueryClient();
    const{mutate: deleteCheck,isLoading: isDeleteing}=
    useMutation({
        mutationFn:(bookingId)=>deleteBooking(bookingId),
      onSuccess: (_, bookingId) => {
  toast.success(`Booking #${bookingId} was deleted successfully`);
  queryClient.invalidateQueries({ queryKey: ["bookings"] });
},
        onError:()=>toast.error(`booking  is failed to be checkedOut`)

    })
    return { deleteCheck, isDeleteing };
}