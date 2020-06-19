import React, { useContext } from "react";
import { Navbar, Form, Nav } from "react-bootstrap";
import Brand from "../../images/supostologo2.png";

import "./style.scss";
import { Link } from "react-router-dom";
import AuthContext from "../../contexts/auth";

const Header: React.FC = () => {
  const { signed, user } = useContext(AuthContext);

  return (
    <Navbar bg="dark" variant="dark" className="mb-5">
      <Link to="/">
        <Navbar.Brand>
          <img
            alt=""
            src={Brand}
            width="150"
            height="50"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
      </Link>

      <Nav className="mr-auto">

      </Nav>

      <Nav>
        {!signed ? (
          <Link to="/signin" className="btn btn-info">
            Sign In
          </Link>
        ) : <label>{user.name}</label>}
      </Nav>
    </Navbar>
  );
};

export default Header;