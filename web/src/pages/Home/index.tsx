import React from "react";
import { Container } from "react-bootstrap";

const Home: React.FC = () => {
  return (
    <Container>
      <div className="text-center bg-danger p-3 rounded border border-dark">
        <h1>Postagens Recentes</h1>
      </div>
    </Container>
  );
};

export default Home;