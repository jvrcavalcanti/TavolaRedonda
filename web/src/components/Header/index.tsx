import React, { useContext } from "react";
import { Navbar, Nav } from "react-bootstrap";
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
        <ul className="navbar-nav mr-auto">
        {!signed ? (
          <li className="nav-item">
            <Link to="/signin" className="nav-link border text-danger rounded">
              Entrar
            </Link>
          </li>
        ) : (
          <>
            <li className="nav-item">
              <label className="nav-link active username">
                {user.name}
              </label>
            </li>

            <li className="nav-item">
              <label className="nav-link border text-danger rounded" onClick={handleLogout}>
                Sair
              </label>
            </li>
          </>
        )}
        </ul>
      </Nav>
    </Navbar>
  );
};

export default Header;