import React from 'react'
import Pizza from '../assets/Pizza.jpg'
import { useHistory } from "react-router-dom";


function Home(props) {
    console.log("props from Home: ", props);

const history = useHistory();
console.log("history: ", history);

const navToPizza = (e) => {
    console.log("moving to menu");
    setTimeout(() => {
      history.push("/pizza");
      console.log("sent to menu");
    }, 2000);
  };


    return (
        <div className="home-wrapper">
      <img
        className="home-image"
        src={Pizza}
        alt=""
      />
      <span className="message">
      <h2 className="imgText">Your favorite food, delivered while coding</h2>
      <button className="md-button shop-button" onClick={navToPizza}>Pizza?</button>
      </span>

      {/* <button className="md-button shop-button" onClick={navToShop}>
        Shop now!
      </button> */}
    </div>
    )
}

export default Home;
