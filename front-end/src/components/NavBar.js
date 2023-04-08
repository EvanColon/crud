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
          </Nav>
          <Nav className="nav-button-group justify-content-center">
            {cookies.id !== undefined && cookies.id > '0' ? <><Button variant="outline-primary" className="nav-buttons" onClick={() => navigate('/admin')}>Admin</Button>{' '}</> : null}
            <Button variant="outline-primary" className="nav-buttons" onClick={() => handleLogout()}>Logout</Button>{' '}
          </Nav>

        </Container>
      </Navbar>
    </>
  );

};

export default NavBar;