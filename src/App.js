import React from "react";
import { Route, Switch } from "react-router-dom"
import Form from "./components/Form"
import Header from "./components/Header"
import Home from "./components/Home";
import "./styles.css";

const App = () => {
  return (
    <>
      {/* <h1>Lambda Eats</h1>
      <p>You can remove this code and create your own header</p> */}
      <Header />
      <Home />
    </>
  );
};
export default App;
