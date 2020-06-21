import React, { useContext } from "react";
import AuthContext from "../../contexts/auth";
import { Container, Form, Button } from "react-bootstrap";
import Input from "../../components/Input";

const SignIn: React.FC = () => {
  const { handleSignIn } = useContext(AuthContext);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = new FormData(event.currentTarget);

    handleSignIn(form.get("name") as string, form.get("password") as string);
  }

  return (
    <Container>
      <Form id="signin" className="bg-danger border border-dark rounded p-2" onSubmit={handleSubmit} >
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