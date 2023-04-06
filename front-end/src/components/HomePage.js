import React, { useState, useEffect } from "react";
import "../stylesheets/HomePage.css";
import { Row, Col, Container } from "react-bootstrap";
export const favoriteHousing = [];
export const favoriteCities = [];
export const favoriteSchools = [];

const HomePage = () => {

  const [items, setItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    
    fetch("http://localhost:3001/")
      .then((res) => res.json())
      .then((data) => setItems(data))
      .then(() => setIsLoaded(true));
  }, []);
  items.map(
    x => <div>{x.Item_Name}</div>)
  return (
    <article>
      <div id="overlay">
        <Container id="container-body">
          <Row>
            <Col>
             <div>
  
                {items.map((item) => (
                  <span>{item.Item_Name} </span>
                ))} 



                
              
             </div>
              
            </Col>
          </Row>
        </Container>
      </div>
    </article>
  );
};

export default HomePage;