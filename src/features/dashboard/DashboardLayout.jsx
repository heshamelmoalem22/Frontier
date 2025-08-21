/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import styled from "styled-components";
import Stats from "./Stats";
import { useRecentBook } from "./useRecentBook";
import { useRecentStay } from "./useRecentStay";
import Spinner from "../../ui/Spinner";
import { useCabins } from "../cabins/useCabins";
import { SalesChart } from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 1.6rem;
`;
function DashboardLayout() {
   const{bookings,isLoading:isLoading1,numDays}=useRecentBook();
  const{stays,isLoading:isLoading2,confirmedStay}=useRecentStay();
  const{ isLoading:isLoading3, cabins }=useCabins();
  if(isLoading1||isLoading2||isLoading3) return <Spinner/>
  console.log(bookings)
  return (
    <StyledDashboardLayout>
    <Stats cabinCount={cabins.length} numDays={numDays} stays={stays} bookings={bookings} confirmedStay={confirmedStay}/>
    <TodayActivity />
    
    <DurationChart confirmedStay={confirmedStay}/>
    <SalesChart bookings={bookings} numDays={numDays} />
    </StyledDashboardLayout>
  )
}

export default DashboardLayout
