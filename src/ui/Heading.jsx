import styled, { css, keyframes } from "styled-components";

// const test = css`
//   text-align: center;
//   ${10 > 5 && "background-color: yellow"}
// `;
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px); /* شوية حركة خفيفة */
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Heading = styled.h1`
  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 3rem;
      font-weight: 600;
    `}

  ${(props) =>
    props.as === "h2" &&
    css`
      font-size: 2rem;
      font-weight: 600;
    `}
    
    ${(props) =>
    props.as === "h3" &&
    css`
      font-size: 2rem;
      font-weight: 500;
       line-height: .4 !important;
       text-align: center;
           margin-right: 28px;
           animation: ${fadeIn} 0.5s ease-out;
    `}
    
    ${(props) =>
    props.as === "h4" &&
    css`
      font-size: 3rem;
      font-weight: 600;
      text-align: center;
    `}
    
  line-height: 1.4;
`;

export default Heading;
