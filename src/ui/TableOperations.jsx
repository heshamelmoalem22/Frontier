/* eslint-disable no-unused-vars */
import styled from 'styled-components';
import { useState, useRef, useEffect } from 'react';
import { HiEllipsisVertical } from 'react-icons/hi2';
import { createPortal } from 'react-dom';
import { HiXMark } from 'react-icons/hi2';

const TableOperationsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 1.6rem;
  overflow-x: auto;

  @media (max-width: 927px) {
    display: none;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  padding: 0.8rem;
  border-radius: var(--border-radius-sm);
  cursor: pointer;
  
  @media (max-width: 927px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem;
  width: 90%;
  max-width: 400px;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  position: absolute;
  top: 1.2rem;
  right: 2rem;
  cursor: pointer;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-500);
  }
`;

function TableOperations({ children }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const buttonRef = useRef(null);

  const handleMenuClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // إغلاق المودال عند النقر خارج المحتوى
  useEffect(() => {
    function handleClickOutside(e) {
      if (isModalOpen && e.target.closest('.modal-content') === null) {
        handleCloseModal();
      }
    }

    function handleEscapeKey(e) {
      if (e.key === 'Escape' && isModalOpen) {
        handleCloseModal();
      }
    }

    if (isModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isModalOpen]);

  return (
    <>
      {/* العرض العادي للشاشات الكبيرة */}
      <TableOperationsContainer>
        {children}
      </TableOperationsContainer>

     
      <MobileMenuButton ref={buttonRef} onClick={handleMenuClick}>
        <HiEllipsisVertical />
      </MobileMenuButton>

     
      {isModalOpen &&
        createPortal(
          <ModalOverlay>
            <ModalContent className="modal-content">
              <CloseButton onClick={handleCloseModal}>
                <HiXMark />
              </CloseButton>
              {children}
            </ModalContent>
          </ModalOverlay>,
          document.body
        )}
    </>
  );
}

export default TableOperations;