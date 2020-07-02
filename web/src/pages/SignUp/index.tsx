import React, { useState, useRef, useContext } from "react"
import { Container, Alert, Button } from "react-bootstrap"
import { Form } from "@unform/web"
import { SubmitHandler, FormHandles } from "@unform/core";
import Input from "../../components/Input";
import AuthContext from "../../contexts/auth";

interface FormData {
  name: string;
  password: string;
  email: string;
}

const SignUp: React.FC = () => {
  const [error, setError] = useState("");
  const formRef = useRef<FormHandles>(null);
  const { handleRegister } = useContext(AuthContext);

  const handleSubmit: SubmitHandler<FormData> = (data) => {
    try {
      handleRegister(data)
    } catch(e) {
      setError("Falha no cadastro")
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
      id="signup"
      className="bg-danger border border-dark rounded p-2"
      onSubmit={handleSubmit}
      >

        <h1 className="text-center">
          Cadastrar-se
        </h1>

        <Input type="text" label="Nome de usuário" name="name" />
        <Input type="email" label="E-mail" name="email" />
        <Input type="password" label="Senha" name="password" />

        <div className="text-center">
          <Button variant="info">
            Cadastrar
          </Button>
        </div>

      </Form>
    </Container>
  )
}

export default SignUp;