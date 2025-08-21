/* eslint-disable no-unused-vars */
import styled from "styled-components";
import MainNav from "./MainNav";
import Logo from "./Logo";


const StyledSidebar= styled.div`
background-color:var(--color-grey-50);
grid-row:1/-1;
display: flex;
flex-direction: column;
gap:3.2rem;


`;
function Sidebar() {
    return (
        <StyledSidebar>
            <Logo/>
            <MainNav/>
             
            
        </StyledSidebar>
    )
}

export default Sidebar
