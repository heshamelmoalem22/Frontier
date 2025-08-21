import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import Button from "../../ui/Button";
import { useState, useRef, useEffect } from "react";
import CreateCabinForm from "./CreateCabinForm";
import useDeleteCabin from "./useDeleteCabin";
import { HiPencil, HiSquare2Stack, HiTrash, HiEllipsisVertical } from "react-icons/hi2";
import { useCreateEditCabin } from "./useCreateCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { createPortal } from "react-dom";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 97px 1.5fr 2fr 2fr 1.6fr 187px;
  align-items: center;
  padding: clamp(0.8rem, 1.2vw, 1.4rem);
  font-size: clamp(1.2rem, 1.3vw, 1.6rem);
  column-gap: clamp(0.6rem, 1.5vw, 2.4rem);

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  @media (max-width: 817px) {
    grid-template-columns: 91px 1.5fr .2fr 2.1fr 1fr 39px;
    overflow-x: hidden;
  }

  @media (min-width: 818px) and (max-width: 920px) {
    grid-template-columns: 93px 1.5fr 2.2fr 1.1fr 2fr 76px;
  }
`;

const Img = styled.img`
  width: 84px;
  height: 48px;
  object-fit: cover;
  object-position: center;
`;

const Cabin = styled.div`
  font-weight: 600;
  color: var(--color-grey-600);
  margin-left: clamp(0px, 2vw, 24px);
`;

const Price = styled.div`
  font-weight: 600;
  color: var(--color-grey-600);
  margin-left: clamp(0px, 2vw, 35px);
`;

const Discount = styled.div`
  font-weight: 600;
  color: var(--color-grey-600);
  margin-left: clamp(0px, 2vw, 35px);
`;

const Capacity = styled.div`
  font-weight: 600;
  color: var(--color-grey-600);
  margin-left: clamp(0px, 3vw, 60px);
`;

const ButtonsStyle = styled.div`
  display: flex;
  justify-content: space-between;
  gap: clamp(0.05rem, 0.2vw, 0.15rem);
  padding-left: .7rem;

  svg {
    width: clamp(1.2rem, 1.5vw, 1.6rem);
    height: clamp(1.2rem, 1.5vw, 1.6rem);
  }

  @media (max-width: 817px) {
    display: none;
  }
`;

const StyledMenu = styled.div`
  display: none;

  @media (max-width: 817px) {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    grid-column: 6;
  }
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
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

const Dropdown = styled.ul`
  position: fixed;
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);
  list-style: none;
  padding: 0.5rem 0;
  margin: 0;
  z-index: 1000;
  min-width: 150px;
`;

const DropdownItem = styled.li`
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  font-size: 1.4rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
  }
`;

function CabinRow({ cabin }) {
  const [showForm, setShowForm] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  const { id: cabinId, name, maxCapacity, regularPrice, discount, image, description } = cabin;
  const { deleteCabin, isDeleting } = useDeleteCabin();
  const { createOrEditCabin } = useCreateEditCabin();

  function handleDuplicate() {
    createOrEditCabin({
      newCabinData: { name: `Copy ${name}`, maxCapacity, regularPrice, discount, image, description },
      id: undefined
    });
    setMenuOpen(false);
  }

  function handleMenuClick(e) {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    
    // حساب الموقع مع مراعاة التمرير
    setMenuPosition({
      top: rect.bottom + window.scrollY,
      left: rect.left + window.scrollX
    });
    setMenuOpen((prev) => !prev);
  }

  // إغلاق القائمة عند النقر خارجها
  useEffect(() => {
    function handleClickOutside(e) {
      if (menuOpen && 
          menuRef.current && 
          !menuRef.current.contains(e.target) && 
          buttonRef.current && 
          !buttonRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }

    // إغلاق القائمة عند التمرير
    function handleScroll() {
      if (menuOpen) {
        setMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('scroll', handleScroll, true);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, [menuOpen]);

  // تحديث موقع القائمة عند فتحها
  useEffect(() => {
    if (menuOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setMenuPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX
      });
    }
  }, [menuOpen]);

  return (
    <>
      <TableRow>
        <Img src={image} alt={name} />
        <Cabin>{name}</Cabin>
        <Capacity>{maxCapacity}</Capacity>
        <Price>{formatCurrency(regularPrice)}</Price>
        <Discount>{discount ? formatCurrency(discount) : "-"}</Discount>

        <ButtonsStyle>
          <Button onClick={handleDuplicate} variation="primary">
            <HiSquare2Stack />
          </Button>
          <Modal>
            <Modal.Open opens="edit">
              <Button onClick={() => setShowForm(true)} variation="primary">
                <HiPencil />
              </Button>
            </Modal.Open>
            <Modal.Window name="edit">
              <CreateCabinForm cabinToEdit={cabin} />
            </Modal.Window>
          </Modal>
          <Modal>
            <Modal.Open opens="delete">
              <Button variation="danger">
                <HiTrash />
              </Button>
            </Modal.Open>
            <Modal.Window name="delete">
              <ConfirmDelete onConfirm={() => deleteCabin(cabinId)} resourceName="cabins" disabled={isDeleting} />
            </Modal.Window>
          </Modal>
        </ButtonsStyle>

        <StyledMenu>
          <MenuButton ref={buttonRef} onClick={handleMenuClick}>
            <HiEllipsisVertical />
          </MenuButton>
        </StyledMenu>
      </TableRow>

      {menuOpen &&
        createPortal(
          <Dropdown 
            ref={menuRef}
            style={{ 
              top: `${menuPosition.top}px`, 
              left: `${menuPosition.left}px` 
            }}
          >
            <DropdownItem onClick={handleDuplicate}>
              <HiSquare2Stack /> Duplicate
            </DropdownItem>
            <DropdownItem onClick={() => {
              setShowForm(true);
              setMenuOpen(false);
            }}>
              <HiPencil /> Edit
            </DropdownItem>
            <DropdownItem onClick={() => {
              deleteCabin(cabinId);
              setMenuOpen(false);
            }}>
              <HiTrash /> Delete
            </DropdownItem>
          </Dropdown>,
          document.body
        )}

      {showForm && (
        <CreateCabinForm 
          cabinToEdit={cabin} 
          onClose={() => setShowForm(false)} 
        />
      )}
    </>
  );
}

export default CabinRow;