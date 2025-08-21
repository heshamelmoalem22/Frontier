/* eslint-disable no-unused-vars */
import styled, { css, keyframes } from "styled-components";
import GlobalStyle from "../styles/GlobalStyle";

const StyledLogo = styled.div`
  text-align: center;
  margin-top: 20px;
`;
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

const Img = styled.img`
  height: 10.6rem;
  width: auto;
  ${(props) =>
    props.variant === "img2" &&
    css`
    animation: ${fadeIn} 0.5s ease-out;
      height: 19.6rem;
      width: auto;
    `}
`;
const StyledText=styled.h1`
font-size: 3rem;
margin-right: 25px;
`;

function Logo({ variant }) {
  return (
    <>
    <GlobalStyle/>
    <StyledLogo>
      <Img src="/attachmentt_115104166.png" alt="Logo" variant={variant} />

      {/* <StyledText>Frontier</StyledText> */}
    </StyledLogo>
    </>
  );
}

export default Logo;
