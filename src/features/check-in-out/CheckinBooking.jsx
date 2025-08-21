import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Checkbox from "../../ui/Checkbox";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useNavigate } from "react-router-dom";
import { useBooking} from "../bookings/useBookings";
import Spinner from "../../ui/Spinner";
import { HiArrowDownOnSquare } from "react-icons/hi2";
import { useEffect, useState } from "react";
import { useCheckIn } from "./useCheckIn";
import { formatCurrency } from "../../utils/helpers";
import { useSetting } from "../settings/useSetting";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {

  const[confirmedPaid,setConfirmedPaid]=useState(false);
  const[Breakfast,setBreakfast]=useState(false);
const{ isLoading, booking }=useBooking()
const{isLoading:isLoadinSetting,data:settings}=useSetting()
useEffect(()=>setConfirmedPaid(booking?.isPaid??false) ,[booking])

  const moveBack = useMoveBack();
const{checkIn,isCheckIn}=useCheckIn();

if(isLoading || isLoadinSetting)return<Spinner/>
if (!booking) return <p>No booking found.</p>;
  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
    extraPrice,
    status
  } = booking;

  const optinalBraekfast=settings.breakfastPrice*numNights*numGuests

  function handleCheckin() {
    if(!confirmedPaid)return;
    if(Breakfast){
      checkIn({
        bookingId,
        breakfast:{
          hasBreakfast:true,
          extrasPrice:optinalBraekfast,
          totalPrice:totalPrice+optinalBraekfast
        }
      })
    }else{

      checkIn({bookingId,breakfast:{}})
    }
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />
   { !hasBreakfast&& ( <Box>
        <Checkbox
        checked={Breakfast}
        onChange={
          ()=>
          {setBreakfast((confirmed)=>!confirmed)
          setConfirmedPaid(false)
          }
        }
        
        id="Breakfast"
        >
          I Confirmed that {guests.fullName} has breakfast for{" "}{formatCurrency(optinalBraekfast )}
        </Checkbox>
      </Box>)}
      <Box>
        <Checkbox
        checked={confirmedPaid}
        onChange={()=>setConfirmedPaid((confirmed)=>!confirmed)}
        disabled={confirmedPaid||isCheckIn}
        id="confirm"
        >
          I Confirmed that {guests.fullName} has paid full amount{" "}
          {!Breakfast ? formatCurrency(totalPrice):`${formatCurrency(totalPrice+optinalBraekfast) } 
          ➡(${formatCurrency(totalPrice)}+${formatCurrency(optinalBraekfast)})`}
        </Checkbox>
      </Box>
      <ButtonGroup>
        {status==="unconfirmed"&&
        (<Button 
        disabled={!confirmedPaid || isCheckIn} icon={<HiArrowDownOnSquare/>} onClick={handleCheckin} >
         Check in booking #{bookingId}</Button>)
        }
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
