/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable";
import AddCabins from "../features/cabins/AddCabins";
import CabinTableOperations from "../features/cabins/cabinTableOperations";

function Cabins() {
  

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Cabins</Heading>
        <CabinTableOperations/>
      </Row>
      <Row type="horizontal">
        <CabinTable />
      </Row>
      <Row>
       <AddCabins />
      </Row>
    
       
    </>
  );
}
export default Cabins;

