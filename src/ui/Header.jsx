/* eslint-disable no-unused-vars */
import styled from "styled-components"
import Logout from "../features/authentication/Logout";
import HeaderMenu from "./HeaderMenu";
import UserAvatar from "../features/authentication/UserAvatar";

const StyledHeader= styled.header`
    background-color: var(--color-grey-50);
    padding:3.2rem 4.8rem 3.2rem;
    border-bottom: 1px solid var(--color-grey-100);
    overflow: hidden;
    display: flex;
    gap: .9rem;
    align-items: center;
    justify-content: flex-end;
    height: 20px;
    `;
function Header() {
    return (
        <StyledHeader>
           <UserAvatar/>
           <HeaderMenu/>
        </StyledHeader>
    )
}

export default Header
