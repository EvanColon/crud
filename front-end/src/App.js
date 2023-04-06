import React, { createContext, useState } from "react";
import RouteHandler from "./components/RouterHandler";
import cookie from "cookie";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import NavBar from "./components/NavBar";
export const myContext = createContext();


function App() {
  const [cookies, setCookies] = useState(cookie.parse(document.cookie));
  return (
    <myContext.Provider value={{ cookies, setCookies }}>
      <NavBar />
      <HomePage />
    </myContext.Provider>
  );
}
export default App;