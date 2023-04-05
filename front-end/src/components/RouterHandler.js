import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";



const RouteHandler = () => {
  return <Routes>
    <Route path='/' element={<HomePage />}/>


  </Routes>
};

export default RouteHandler;