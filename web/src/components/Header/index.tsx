import React, { useContext } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import Brand from "../../images/supostologo2.png";

import "./style.scss";
import { Link } from "react-router-dom";
import AuthContext from "../../contexts/auth";

const Header: React.FC = () => {
  const { signed, user, handleLogout } = useContext(AuthContext);

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
            Entrar
          </Link>
        ) : (
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <label className="nav-link active username">
                {user.name}
              </label>
            </li>

            <li className="nav-item">
              <label className="nav-link border rounded" onClick={handleLogout}>
                Sair
              </label>
            </li>
          </ul>
        )}
      </Nav>
    </Navbar>
  );
};

export default Header;