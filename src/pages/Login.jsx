import styled from "styled-components";
import LoginForm from "../features/authentication/LoginForm";
import Logo from "../ui/Logo";
import Heading from "../ui/Heading";

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr; /* عمودين متساويين */
  align-items: center;
  justify-content: center;
  gap: 4rem;
  background-color: #f9f9f9;
  padding: 2rem;
`;

const LeftColumn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  
  max-width: 48rem;
  width: 100%;
  margin-top: 20px;
  
`;

function Login() {
  return (
    <LoginLayout>
      <LeftColumn>
        <img src="/attachmentt_115104166.png" style={{ width: "233px"}} />
      </LeftColumn>

      <RightColumn>
        <Heading style={{color:"gray"}} as="h3">Log In To Your Account</Heading>
        <LoginForm />
      </RightColumn>
    </LoginLayout>
  );
}

export default Login;
