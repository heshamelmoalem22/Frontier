/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { getCabins } from "../../services/apiCabins";
import CabinRow from "./CabinRow";
import Spinner from "../../ui/Spinner";
import { useParams, useSearchParams } from "react-router-dom";
import Menus from "../../ui/Menus";
const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
`;

const Table = styled.div`
  border: 1px solid var(--color-grey-200);
  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  width: 100%;

  overflow-x: auto;

  @media (max-width: 817px) {
    overflow-x: hidden;
  }
`;


const TableHeader = styled.header`
  display: grid;
      grid-template-columns: 117px 1fr 1.1fr 1fr 1fr 172px;
  align-items: center;
  background-color: var(--color-grey-100);
  border-bottom: 1px solid var(--color-grey-200);
  text-transform: uppercase;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: clamp(0.8rem, 1.5vw, 1.5rem);
  font-size: clamp(1.2rem, 1.4vw, 1.4rem);
  column-gap: clamp(0.6rem, 1vw, 1rem);
@media (max-width: 817px) {
    grid-template-columns: 91px 2.5fr .2fr 2.1fr 1fr 39px;
  }
     @media (min-width: 818px) and (max-width: 920px) {
   grid-template-columns: 105px 2fr 2.8fr 1.9fr 3fr 63px;
  }

`;



function CabinTable() {
  const {
    isLoading,
    data: cabins,
    error,
  } = useQuery({
    queryKey: ["cabin"],
    queryFn: getCabins,
  });
  const[searchParams]=useSearchParams();
  const filterValue=searchParams.get('discount')||"all";
  if (error) return <p>Error loading cabins: {error.message}</p>;
  if (isLoading) return <Spinner />;
  let filteredCabins;
  if(filterValue==="all")filteredCabins=cabins;
  if (filterValue==="no-discount")filteredCabins=cabins.filter((cabin)=>cabin.discount===0);
  if (filterValue==="with-discount")filteredCabins=cabins.filter((cabin)=>cabin.discount>0);
 
  const sortBy=searchParams.get("sortBy")||'startDate-asc';
  const [filed,direction]=sortBy.split("-");
  const modifier=direction==="asc"?1:-1;
  const sortedCabins=filteredCabins.sort((a,b)=>(a[filed]-b[filed])*modifier);


   return (
    <Menus>
    <TableWrapper>
      <Table role='table'>
        <TableHeader role="row">
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </TableHeader>
        {sortedCabins?.length > 0 ? (
          sortedCabins.map((cabin) => (
            <CabinRow key={cabin.id} cabin={cabin} />
          ))
        ) : (
          <p style={{ padding: "1rem" }}>No cabins found for this filter.</p>
        )}
      </Table>
    </TableWrapper>
    </Menus>
  );
}

export default CabinTable;