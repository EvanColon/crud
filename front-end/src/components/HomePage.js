import React, { useContext, useState, useEffect } from "react";
import "../stylesheets/HomePage.css";
import { Row, Col, Container, Button, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Cookie from "cookie";
import { myContext } from "../App";
import NavBar from "./NavBar";

const HomePage = () => {
  const navigate = useNavigate();
  const { cookies, setCookies } = useContext(myContext);
  const [items, setItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    
    fetch("http://localhost:3001/")
      .then((res) => res.json())
      .then((data) => setItems(data))
      .then(() => setIsLoaded(true));

    
  }, []);
  
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
          <Navbar bg="dark" variant="dark" className="navbar">
            <Container className="align-items-right">
              <Nav className="align-items-right">
                <Navbar.Brand>
                  <h3 className='text-primary brand-text'><strong>CRUD Inventory</strong></h3>
                </Navbar.Brand>
              </Nav>
              <Nav className="nav-button-group justify-content-center">
                {cookies.id !== undefined && cookies.id > '0' ? <><Button variant="outline-primary" className="nav-buttons" onClick={() => navigate('/admin')}>Admin</Button>{' '}</> : null}
                <Button variant="outline-primary" className="nav-buttons" onClick={() => navigate('/')}>Login</Button>{' '}
              </Nav>
    
            </Container>
          </Navbar>
    
        <Row className="ml-5 text-black text-center">
          {items.map((item, i) => (
            <div className="showContainer" key={item.id} style={{ width: '18.5%' }}>
              <h4>Name: {item.itemName}</h4>
              <h4>Description: {item.description}</h4>
              <h4>Quantity: {item.quantity}</h4>
            </div>
          ))}
        </Row>
      </>
    );
  };
  export default HomePage;