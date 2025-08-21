/* eslint-disable no-undef */
import { createContext, useContext, useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: relative;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: fixed;
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);
  z-index: 1000;
  padding: 0.8rem 0;
  min-width: 150px;

  right: ${(props) => props.position.x}px;
  ${(props) => props.position.openUp 
    ? `bottom: ${window.innerHeight - props.position.y}px;` 
    : `top: ${props.position.y}px;`
  }
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;
  cursor: pointer;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

const MenusContext = createContext();

function Menus({ children }) {
  const [openId, setOpenId] = useState("");
  const [position, setPosition] = useState({ x: 0, y: 0, openUp: false });

  const close = () => setOpenId("");
  const open = setOpenId;

  return (
    <MenusContext.Provider
      value={{ openId, close, open, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
}

function Toggle({ id }) {
  const { openId, close, open, setPosition } = useContext(MenusContext);
  const buttonRef = useRef(null);

  function handleClick(e) {
    e.stopPropagation();

    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const openUp = spaceBelow < 200;

    setPosition({
      x: window.innerWidth - rect.right,
      y: rect.bottom,
      openUp,
    });

    openId === "" || openId !== id ? open(id) : close();
  }

  return (
    <StyledToggle ref={buttonRef} onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
}

function List({ id, children }) {
  const { openId, position, close } = useContext(MenusContext);
  const ref = useOutsideClick(close, false);
  const listRef = useRef(null);

  // تحديث الموقع عند التمرير أو تغير حجم النافذة
  useEffect(() => {
    if (openId === id) {
      const handleScrollResize = () => {
        // إعادة فتح القائمة لتحديث موقعها
        close();
        setTimeout(() => {
          const toggleButton = document.querySelector(`button[data-menu-toggle="${id}"]`);
          if (toggleButton) {
            toggleButton.click();
          }
        }, 10);
      };

      window.addEventListener('scroll', handleScrollResize, true);
      window.addEventListener('resize', handleScrollResize);

      return () => {
        window.removeEventListener('scroll', handleScrollResize, true);
        window.removeEventListener('resize', handleScrollResize);
      };
    }
  }, [openId, id, close]);

  if (openId !== id) return null;

  return createPortal(
    <StyledList 
      position={position} 
      ref={(node) => {
        ref.current = node;
        listRef.current = node;
      }}
    >
      {children}
    </StyledList>,
    document.body
  );
}

function Button({ children, icon, onClick, disabled }) {
  const { close } = useContext(MenusContext);

  function handleClick() {
    if (disabled) return;
    onClick?.();
    close();
  }

  return (
    <li>
      <StyledButton onClick={handleClick} disabled={disabled}>
        {icon}
        <span>{children}</span>
      </StyledButton>
    </li>
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;