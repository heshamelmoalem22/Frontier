/* eslint-disable no-unused-vars */
import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";

import FormRowVertical from "../../ui/FormRowVertical";
import Input from "../../ui/Input";
import { useLogin } from "./useLogin";
import SpinnerMini from "../../ui/SpinnerMini";

function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("");
const{Login,isLoading}=useLogin();
  function handleSubmit(e) {
     e.preventDefault();
if(!email||!password)return
Login({email,password},{
  onSettled:()=>{
    setEmail("");
    setPassword("");
  }
}

)
  }

  return (
    <Form style={{marginBottom:"20px"}} onSubmit={handleSubmit}>
      <FormRowVertical label="Email address">
        <Input
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />
      </FormRowVertical>
      <FormRowVertical label="Password">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />
      </FormRowVertical>
      <FormRowVertical>
     <Button style={{ color: "white" }} size="lg_medium" disabled={isLoading}>
          {isLoading ? <SpinnerMini /> : "Login"}
        </Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
