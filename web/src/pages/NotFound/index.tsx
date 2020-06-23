import React from "react";
import { Alert, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => (
  <Container className="text-center">
    <Alert variant="danger">
      Página não encontrada
      <br/>
      <Link to="/">
        Voltar para o inicio
      </Link>
    </Alert>
  </Container>
);

export default NotFound;