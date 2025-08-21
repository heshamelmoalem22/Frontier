/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import DashboardFilter from "../features/dashboard/DashboardFilter";
import DashboardLayout from "../features/dashboard/DashboardLayout";
import { useRecentBook } from "../features/dashboard/useRecentBook";
import { useRecentStay } from "../features/dashboard/useRecentStay";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Spinner from "../ui/Spinner";

function Dashboard() {
 
  return (
    <>
    <Row type="horizontal">
      <Heading style={{marginLeft:"-2px"}} as="h1">Dashboard</Heading>
      <DashboardFilter/>
    </Row>
    <DashboardLayout/>
    </>
  );
}

export default Dashboard;
