import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import {  getStaysAfterDate } from "../../services/apiBookings";


export function useRecentStay() {
    const[searchParams]=useSearchParams();
    const numDays=!searchParams.get("last")? 7 :
    Number(searchParams.get("last"));
    const QueryDate=subDays(new Date(),numDays).toISOString();

    const {data:stays,isLoading}=useQuery({
        queryKey:["stays",`last-${numDays}`],
        queryFn:()=>getStaysAfterDate(QueryDate)

    })
    const confirmedStay = stays?.filter(
  (stay) => stay.status === "checked-in" || stay.status === "checked-out"
);

    return{stays,isLoading,confirmedStay}
    
}