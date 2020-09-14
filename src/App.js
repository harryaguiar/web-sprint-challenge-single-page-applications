import React from "react";
import { Route, Switch } from "react-router-dom"
import Form from "./components/Form"
import Header from "./components/Header"
import Home from "./components/Home";
import "./styles.css";
import "./App.css"

const App = () => {
  return (
    <>
    <Header />
    <Switch>
            <Route path="/pizza/">
                <Form />
            </Route>
            <Route path="/">
               <Home />
            </Route>
        </Switch>
    </>
    )
}
export default App;
