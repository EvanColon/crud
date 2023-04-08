import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import LoginPage from "./LoginPage";
import AdminPage from "./AdminPage";

const RouteHandler = () => {
  return <Routes>
    <Route path='/' element={<LoginPage />}/>
    <Route path='/admin' element={<AdminPage />}/>
    <Route path='/home' element={<HomePage />}/>
  </Routes>
};

export default RouteHandler;