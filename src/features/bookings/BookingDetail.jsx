/* eslint-disable no-unused-vars */
import styled from "styled-components";
import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "./useBookings";
import Spinner from "../../ui/Spinner";
import PageNotFound from "../../pages/PageNotFound";
import { useNavigate } from "react-router-dom";
import { HiArrowDownOnSquare, HiTrash } from "react-icons/hi2";
import { useCheckout } from "../check-in-out/useCheckOut";
import { useDeleteCheck } from "../check-in-out/useDeleteCheck";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const{ isLoading, booking }=useBooking()
  const{checkOut, isCheckOut}= useCheckout();
    const{ deleteCheck,isDeleteing}=useDeleteCheck()
  const moveBack = useMoveBack();
  const navigate=useNavigate();
  
  if (isLoading) return <Spinner />;
  if (!booking) return <PageNotFound/>

  const{status,id:bookingId}=booking
  // const status = "checked-in";
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking # {bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />
    <Modal>
      <ButtonGroup>
         {status==="unconfirmed"&&
                (<Button icon={<HiArrowDownOnSquare/>} onClick={() => navigate(`/checkedIn/${bookingId}`)} >
                  Check in</Button>)
                }
         {status==="checked-in"&&
                (<Button icon={<HiArrowDownOnSquare/>} onClick={() => (checkOut(bookingId))} >
                  Check out</Button>)
                }
                
                 <Modal.Open opens="delete">
            <Button  style={{backgroundColor:"#b91c1c"}}  >
                delete <HiTrash />
             </Button>
            </Modal.Open>
  
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
       <Modal.Window name="delete">
             <ConfirmDelete onConfirm={() => deleteCheck(bookingId,{
              onSettled:()=>navigate(-1)
             })} resourceName="cabins" disabled={isDeleteing} />
          </Modal.Window>
                </Modal>
    </>
  );
}

export default BookingDetail;
 