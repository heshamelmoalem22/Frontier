import styled from "styled-components";

const StyledSelect = styled.select`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${(props) =>
      props.type === "white"
        ? "var(--color-grey-100)"
        : "var(--color-grey-300)"};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;
function Select({Options,value,onChange}) {
  return (
    <StyledSelect value={value} onChange={onChange}>
      {Options.map((Option)=>(<option  value={Option.value} key={Option.value}>
        {Option.label}
        </option>))}
    </StyledSelect>
  )
}

export default Select
