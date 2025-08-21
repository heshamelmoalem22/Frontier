import styled, { css, keyframes } from "styled-components";

// 1. عرف أنيميشن fadeIn
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

// 2. عدل الـ Form
const Form = styled.form`
  animation: ${fadeIn} 0.5s ease-out; /* 👈 دي اللي بتعمل السموز */

  ${(props) =>
    props.type === "regular" &&
    css`
      padding: 2.4rem 4rem;
      background-color: var(--color-grey-0);
      border: 1px solid var(--color-grey-100);
      border-radius: var(--border-radius-md);
      width: 100%;
       box-shadow: 0 20px 25px rgba(0, 0, 0, 0.1);
    `}

  ${(props) =>
    props.type === "modal" &&
    css`
      width: 80rem;
    `}

  overflow: hidden;
  font-size: 1.4rem;
`;

Form.defaultProps = {
  type: "regular",
};

export default Form;
