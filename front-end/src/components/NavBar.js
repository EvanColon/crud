import React, { useContext } from "react";
import "../stylesheets/NavBar.css";
import { Button, Container, Navbar, NavDropdown, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Cookie from "cookie";
import { myContext } from "../App";

const NavBar = () => {
  const navigate = useNavigate();
  const { cookies, setCookies } = useContext(myContext);

  const handleLogout = () => {
    fetch("http://localhost:3001/logout", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.json());
        }
        return response.json();
      })
      .then((data) => {
        setCookies(Cookie.parse(document.cookie));
      });
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" className="navbar-main">
        <Container className="align-items-center">
          <Nav className="align-items-center">
            <img
              alt=""
              width="30"
              height="30"
              className="d-inline-block brand-logo"
            />
            <Navbar.Brand>
              <h3 className='text-primary brand-text' onClick={() => navigate('/login')}><strong>PCS Partner</strong></h3>
            </Navbar.Brand>
            <NavDropdown title="Moving Info" id="collasible-nav-dropdown" menuVariant="dark">
              <NavDropdown.Item onClick={() => navigate('/PPS')}>Personal Property Shipment</NavDropdown.Item>
              <NavDropdown.Item onClick={() => navigate('/login')}>Manager Login</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav className="nav-button-group justify-content-center">
            <Button variant="outline-primary" className="nav-buttons" onClick={() => navigate('/favorites')}>Favorites</Button>{' '}
            {cookies.id !== undefined && cookies.id > '0' ? <><Button variant="outline-primary" className="nav-buttons" onClick={() => navigate('/admin')}>Admin</Button>{' '}</> : null}
            <Button variant="outline-primary" className="nav-buttons" onClick={() => handleLogout()}>Logout</Button>{' '}
          </Nav>

        </Container>
      </Navbar>
    </>
  );

};

export default NavBar;