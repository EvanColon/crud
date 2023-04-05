import React, { createContext, useState } from "react";
import RouteHandler from "./components/RouterHandler";
import cookie from "cookie";
import HomePage from "./components/HomePage";

export const myContext = createContext();

function App() {
  const [cookies, setCookies] = useState(cookie.parse(document.cookie));
  return cookies.auth !== undefined ? (
    <myContext.Provider value={{ cookies, setCookies }}>
      <RouteHandler />
    </myContext.Provider>
  ) : (
    <myContext.Provider value={{ cookies, setCookies }}>
      <HomePage/>
    </myContext.Provider>
  );
}

export default App;