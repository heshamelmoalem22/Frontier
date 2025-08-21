/* eslint-disable no-unused-vars */
import { HiArrowCircleDown, HiOutlineBriefcase, HiOutlineChartBar } from "react-icons/hi";
import Stat from "./Stat"
import { HiOutlineBanknotes, HiOutlineCalendarDays } from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";

function Stats({bookings,confirmedStay,stay,numDays,cabinCount}) {
 const numBooking=bookings.length;
 const numCheckin=confirmedStay.length;
 const sales= bookings.reduce((acc,cur)=>acc+cur.totalPrice,0);
 const occupation= confirmedStay.reduce((acc,cur)=>acc+cur.numNights,0)
 /
 (numDays*cabinCount)

    return (
        <>
        <Stat color="blue" value={numBooking} title="bookings" icon={<HiOutlineBriefcase/>}/>
        <Stat color="green" value={formatCurrency(sales)} title="in-come" icon={<HiOutlineBanknotes/>}/>
        <Stat color="indigo" value={numCheckin} title="Check ins" icon={<HiOutlineCalendarDays/>}/>
        <Stat color="yellow" value={Math.round(occupation*100)+"%"} title="occupation" icon={<HiOutlineChartBar/>}/>
       
        </>
    )
}

export default Stats
