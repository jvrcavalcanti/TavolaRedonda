import React, { useContext, useRef, useState } from "react";
import AuthContext from "../../contexts/auth";
import { Container, Button, Alert } from "react-bootstrap";
import Input from "../../components/Input";
import { Form } from "@unform/web";
import { FormHandles, SubmitHandler } from "@unform/core";

interface FormData {
  name: string;
  password: string;
};

const SignIn: React.FC = () => {
  const [error, setError] = useState("");
  const { handleSignIn } = useContext(AuthContext);
  const formRef = useRef<FormHandles>(null);

  const handleSubmit: SubmitHandler<FormData> = async (data) => {
    const result = await handleSignIn(data.name as string, data.password as string);

    if (!result) {
      setError("Usuário/Senha incorretos")
    }
  };

  return (
    <Container>
      {error && (
        <Alert variant="danger">
          {error}
        </Alert>
      )}
      <Form 
        ref={formRef}
        id="signin"
        className="bg-danger border border-dark rounded p-2"
        onSubmit={handleSubmit}
      >
        <h1 className="text-center">
          Login
        </h1>
        <br/>

        <Input type="text" label="Nome de usuário" name="name" />
        <Input type="password" label="Senha" name="password" />

        <div className="text-center">
          <Button variant="info" type="submit" >
            Logar
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default SignIn;