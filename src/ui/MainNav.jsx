/* eslint-disable no-unused-vars */
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { HiCalendarDays, HiHome,HiHomeModern,HiUsers  } from "react-icons/hi2";
import { FiSettings } from "react-icons/fi";
import Uploader from "../data/Uploader";

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const StyledNavLink = styled(NavLink)`
 &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    color: var(--color-grey-900);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
  }
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-grey-200);
    border-radius:2rem;
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-400);
  }
`;
function MainNav() {
  return (
    <nav>
      <NavList>
        <li>
          <StyledNavLink to='/dashboard'>
          <HiHome/>
           Home</StyledNavLink>
        </li>
        <li>
          <StyledNavLink to='/bookings'>
          <HiCalendarDays/>
           Bookings</StyledNavLink>
        </li>
        <li>
          <StyledNavLink to='/cabins'>
          <HiHomeModern/>
           Cabins</StyledNavLink>
        </li>
    
        <li>
          <StyledNavLink to='/users'>
          <HiUsers />
           users
           </StyledNavLink>
        </li>
            <li>
          <StyledNavLink to='/setting'>
          <FiSettings/>
           setting</StyledNavLink>
        </li>
      </NavList>
      {/* <Uploader/> */}
      
    </nav>
  )
}

export default MainNav
