import React, { createContext, useState } from "react";
import RouteHandler from "./components/RouterHandler";
import cookie from "cookie";
import HomePage from "./components/HomePage";

export const myContext = createContext();

function App() {
return (
  <HomePage/>
)
}

export default App;