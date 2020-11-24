import React, { useContext } from 'react'
import { Button, Nav, Navbar } from 'react-bootstrap'
import { AuthContext } from '../../contexts/auth'

const Header = () => {
  const { state, logOut } = useContext(AuthContext)

  return (
    <Navbar bg="dark" variant="dark" className="mb-5 text-white">
      <Navbar.Brand href="/">
        <img
          alt=""
          src="/images/supostologo2.png"
          width="150"
          height="50"
          className="d-inline-block align-top"
        />
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        <Nav>
          <Nav.Link href="/new" className="pl-3 pr-3 plus" title="Novo Post">
            &#43;
            {/* + */}
          </Nav.Link>
          {state.signed ? (
            <>
              <Nav.Link className="mt-1">
                {state.user.username}
              </Nav.Link>
              <Button variant="secondary" onClick={logOut}>
                Sair
              </Button>
            </>
          ) : (
            <>
              <Nav.Link href="/login" className="btn btn-danger text-white">
                Login
              </Nav.Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Header