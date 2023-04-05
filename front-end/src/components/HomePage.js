import React, { useState, useEffect } from "react";
import "../stylesheets/HomePage.css";
import { Row, Col, Container } from "react-bootstrap";
export const favoriteHousing = [];
export const favoriteCities = [];
export const favoriteSchools = [];

const HomePage = () => {

  const [housingData, setHousingData] = useState([]);
  const [schoolData, setSchoolData] = useState([]);
  const [cityData, setCityData] = useState([]);
  const [baseData, setBaseData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [count, setCount] = useState(0);
  let baseName = 1
  let imageURL = 2
  let baseID = 3
  useEffect(() => {
    
    fetch("http://localhost:3001/")
      .then((res) => JSON.stringify(res))
      .then((data) => setHousingData(data));

    fetch("http://localhost:3001/schools")
      .then((res) => res.json())
      .then((data) => setSchoolData(data));

    fetch("http://localhost:3001/cities")
      .then((res) => res.json())
      .then((data) => setCityData(data));

    fetch("http://localhost:3001/bases")
      .then((res) => res.json())
      .then((data) => setBaseData(data))
      .then(() => setIsLoaded(true));
  }, []);

  //This finds the chosen base index in base data in order to return that particular base's contact info
  const baseIndex = baseData.findIndex(
    (base) => base.name.slice(0, -4) === baseName
  );

  const addToFavorites = (companyName) => {
    if (!favoriteHousing.includes(companyName)) {
      favoriteHousing.push(companyName);
      document.getElementById(`${companyName}`).style = "color:gold";
      setCount(count + 1);
    }
  };

  const addToCityFavorites = (companyName) => {
    if (!favoriteCities.includes(companyName)) {
      favoriteCities.push(companyName);
      document.getElementById(`${companyName}`).style = "color:gold";
    }
  };

  const addToSchoolFavorites = (companyName) => {
    if (!favoriteSchools.includes(companyName)) {
      favoriteSchools.push(companyName);
      document.getElementById(`${companyName}`).style = "color:gold";
    }
  };

  return (
    <article>
      <div id="overlay">
        <Container id="container-body">
          <Row>
            <Col>
             <div>
              {`${housingData}`}
             </div>
              
            </Col>
          </Row>
        </Container>
      </div>
    </article>
  );
};

export default HomePage;