import styled, { css } from "styled-components";
const Row = styled.div`
  display: flex; 
  ${(props)=> props.type === 'horizontal' && 
  css `
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap:1rem;`}

  `;
 
export default Row;

