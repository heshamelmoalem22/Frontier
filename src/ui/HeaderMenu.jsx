import styled from "styled-components"
import Logout from "../features/authentication/Logout"
import UserAvatar from "../features/authentication/UserAvatar"
import ButtonIcon from "./ButtonIcon"
import { useNavigate } from "react-router-dom"
import { HiOutlineUser } from "react-icons/hi"
import ThemeToggle from "./ThemeToggle"

const StyledHeaderMenu=styled.ul`
    display: flex;
    gap:.5rem;
`
function HeaderMenu() {
    const navigate=useNavigate();

    return (
        <StyledHeaderMenu>
            <li>
               <ButtonIcon onClick={()=>navigate("/accounts")}>
                <HiOutlineUser/>
               </ButtonIcon>
            </li>
            <li>
                

                <ThemeToggle/>
                
                
            </li>
            <li>
                <Logout/>
                
            </li>
        </StyledHeaderMenu>
    )
}

export default HeaderMenu
