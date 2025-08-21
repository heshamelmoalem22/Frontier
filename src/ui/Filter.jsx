/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

const FilterButton = styled.button`
  background-color: var(--color-grey-0);
  border: none;

  ${(props) =>
    props.$active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

function Filter({ filterField, Options = [] }) {
  const [searchParams, setSearchParams] = useSearchParams();


  const defaultValue = Options.length > 0 ? Options[0].value : "";
  const currentFilter = searchParams.get(filterField) || defaultValue;

  function handleClick(value) {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set(filterField, value);

  
    if (newSearchParams.get("page")) newSearchParams.set("page", 1);

    setSearchParams(newSearchParams);
  }


  if (Options.length === 0) return null;

  return (
    <StyledFilter>
      {Options.map((Option) => (
        <FilterButton
          $active={Option.value === currentFilter}
          disabled={Option.value === currentFilter}
          key={Option.value}
          onClick={() => handleClick(Option.value)}
        >
          {Option.label}
        </FilterButton>
      ))}
    </StyledFilter>
  );
}

export default Filter;
