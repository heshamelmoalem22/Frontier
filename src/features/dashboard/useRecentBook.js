import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getBookingsAfterDate } from "../../services/apiBookings";

export function useRecentBook() {
    const[searchParams]=useSearchParams();
    const numDays=!searchParams.get("last")? 7 :
    Number(searchParams.get("last"));
    const QueryDate=subDays(new Date(),numDays).toISOString();

    const {data:bookings,isLoading}=useQuery({
        queryKey:["bookings",`last-${numDays}`],
        queryFn:()=>getBookingsAfterDate(QueryDate)

    })
    return{bookings,isLoading,numDays}
    
}