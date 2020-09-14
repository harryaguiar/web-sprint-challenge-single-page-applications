import React, { useState, useEffect } from "react";
import * as yup from "yup";
import axios from "axios";
import image from "../assets/Pizza.jpg";

const formSchema = yup.object().shape({
    name: yup.string().required("Name is a required field")
        .min(2, "Name must be at least 2 characters long.")
        .matches(/[a-zA-z][a-zA-Z]{2,}/, "Name must be letters only."),
    email: yup
      .string()
      .email("Must be a valid email address")
      .required("Must include email address"),
    address: yup.string().required("Please leave an address."),
    size: yup.string().required("Must pick your pizza size"),
    pepperoni: yup.boolean(),
    sauce: yup.boolean().oneOf([true], "Please choose a sauce"),
    sausage: yup.boolean(),
    canadianBacon: yup.boolean(),
    spicySausage: yup.boolean(),
    grilledChicken: yup.boolean(),
    onions: yup.boolean(),
    greenPepper: yup.boolean(),
    dicedTomatos: yup.boolean(),
    blackOlives: yup.boolean(),
    roastedGarlic: yup.boolean(),
    artichokeHearts: yup.boolean(),
    threeCheese: yup.boolean(),
    pineapple: yup.boolean(),
    extraCheese: yup.boolean(),
    substitute: yup.boolean(),
    instructions: yup.string(),
    quantity: yup.string(),
  });

  const Form = () => {
  // managing state for our form inputs
  const [formState, setFormState] = useState({
    name: "",
    address: "",
    email: "",
    size:"",
    sauce:"",
    pepperoni: false,
    sausage: false,
    canadianBacon: false,
    spicySausage: false,
    grilledChicken: false,
    onions: false,
    greenPepper: false,
    dicedTomatos: false,
    blackOlives: false,
    roastedGarlic: false,
    artichokeHearts: false,
    threeCheese: false,
    pineapple: false,
    extraCheese: false, 
    substitute: "",
    instructions: "",
    quantity: "",
    // motivation: "",
    // position: "",
    // terms: false
  });

  

  const [errorState, setErrorState] = useState({
    name: "",
    email: "",
    address: '',
    size:"",
    sauce:"",
    pepperoni: "",
    sausage: "",
    canadianBacon: "",
    spicySausage: "",
    grilledChicken: "",
    onions: "",
    greenPepper: "",
    dicedTomatos: "",
    blackOlives: "",
    roastedGarlic: "",
    artichokeHearts: "",
    threeCheese: "",
    pineapple: "",
    extraCheese: "", 

    substitute: "",
    instructions: "",
    quantity: "",
  });

  // onChange function
  const inputChange = e => {
    e.persist();
    // console.log("input changed!", e.target.value, e.target.checked);
    validate(e);
    let value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormState({ ...formState, [e.target.name]: value });
  };


  const [postedData, setPostedData] = useState([]); //place to hold the data coming back from the server

  const formSubmit = e => {
    e.preventDefault();
    console.log("form submitted!");
    setFormState({
        name: '',
        email: '',
        address: '',
        size: '',
        sauce:'',
        sausage: '',
        canadianBacon: '',
        spicySausage: '',
        grilledChicken: '',
        onions: '',
        greenPepper: '',
        dicedTomatos: '',
        blackOlives: '',
        roastedGarlic: '',
        artichokeHearts: '',
        threeCheese: '',
        pineapple: '',
        extraCheese: '',
        substitute: '',
        instructions: '',
        quantity: '',
        });
    axios
      .post("https://reqres.in/api/users", formState)
      .then((response) => {console.log(response);
        setPostedData(response.data);
    })
      .catch(err => console.log(err));

  };

  // BONUS!: state for whether our button should be disabled or not.
  const [buttonDisabled, setButtonDisabled] = useState(true);
  // Everytime formState changes, check to see if it passes verification.
  // If it does, then enable the submit button, otherwise disable
  useEffect(() => {
    formSchema.isValid(formState).then(valid => {
      setButtonDisabled(!valid);
    });
  }, [formState]);

  //form validation
  const validate = e => {
    let value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    yup
      .reach(formSchema, e.target.name)
      .validate(value)
      .then(valid => {
        setErrorState({...errorState, [e.target.name]: ""});
      })
      .catch(err => {
        setErrorState({...errorState, [e.target.name]: err.errors[0]});
      });
  };


    return (
        <>
            <div>
                <h2>Build Your Own Pizza</h2>
                <img alt="pizza" src={image}/>
            </div>
<form onSubmit={formSubmit}>

<label htmlFor="name">
        <h4>Name</h4>
        <input
        placeholder="Full Name"
          type="text"
          name="name"
          id="name"
          value={formState.name}
          onChange={inputChange}
        />
         {errorState.name.length > 2 ? (
          <p className="error">{errorState.name}</p>
        ) : null}
</label>
<label htmlFor="email">
        <h4>Email</h4>
        <input
          type="email"
          name="email"
          id="email"
          value={formState.email}
          onChange={inputChange}
        />
        {errorState.email.length > 0 ? (
          <p className="error">{errorState.email}</p>
        ) : null}
</label>

<label htmlFor="address"><h4>Where do we deliver?</h4>
        {errorState.address.length > 0 ? <p>{errorState.address}</p> : null}
</label>
        <textarea name="address" placeholder="Your Address Here" value={formState.address} onChange={inputChange} />
<div className="size">
    <label htmlFor="size">
    <h4 id="size">Choice of Size</h4>
        <select
            value={formState.size}
            name="size"
            id="select-tag"
            onChange={inputChange}
        >
        <option value="">Select</option>   
        <option value="small">Small</option>
        <option value="medium">Medium</option>
        <option value="large">Large</option>
        <option value="extra large">Extra Large</option>
        </select>

    </label>
    </div>
    <div className="sauceCard">
    <h4 id="sauce">Choice of Sauce</h4>
    <label className="sauce" htmlFor="sauce">
        <p>
        <input 
            type="radio"
            name="sauce"
            id="red"
            value={formState.sauce}
            onChange={inputChange}
        />Original Red
        </p>
        <p>
        <input 
            type="radio"
            name="sauce"
            id="ranch"
            value={formState.sauce}
            onChange={inputChange}
        />Garlic Ranch</p>
        <p>
        <input 
            type="radio"
            name="sauce"
            id="bbq"
            value={formState.sauce}
            onChange={inputChange}
        />BBQ Sauce
        </p>
        <p><input 
            type="radio"
            name="sauce"
            id="spinach"
            value={formState.sauce}
            onChange={inputChange}
        />Spinach Alfredo
    </p>
    </label>
    </div>

    <div className="toppings">
    
    <h4 id="toppings">Choose your toppings</h4>

    <label htmlFor="pepperoni">
        <input
          type="checkbox"
          id="terms"
          name="pepperoni"
          checked={formState.pepperoni}
          onChange={inputChange}
        />
      Pepperoni</label>
      <label htmlFor="sausage">
        <input
          type="checkbox"
          id="terms"
          name="sausage"
          checked={formState.sausage}
          onChange={inputChange}
        />
        Sausage</label>

        <label htmlFor="canadianBacon">
        <input
          type="checkbox"
          id="terms"
          name="canadianBacon"
          checked={formState.canadianBacon}
          onChange={inputChange}
        />
        Canadian Bacon</label>
        
        <label htmlFor="spicySausage">
        <input
          type="checkbox"
          id="terms"
          name="spicySausage"
          checked={formState.spicySausage}
          onChange={inputChange}
        />
        Spicy Italian Sausage</label>

        <label htmlFor="grilledChicken">
        <input
          type="checkbox"
          id="terms"
          name="grilledChicken"
          checked={formState.grilledChicken}
          onChange={inputChange}
        />
        Grilled Chicken</label>

        <label htmlFor="onions">
        <input
          type="checkbox"
          id="terms"
          name="onions"
          checked={formState.onions}
          onChange={inputChange}
        />
        Onions</label>

        <label htmlFor="greenPepper">
        <input
          type="checkbox"
          id="terms"
          name="greenPepper"
          checked={formState.greenPepper}
          onChange={inputChange}
        />
        Green Pepper</label>

        <label htmlFor="dicedTomatos">
        <input
          type="checkbox"
          id="terms"
          name="dicedTomatos"
          checked={formState.dicedTomatos}
          onChange={inputChange}
        />
        Diced Tomatos</label>

        <label htmlFor="blackOlives">
        <input
          type="checkbox"
          id="terms"
          name="blackOlives"
          checked={formState.blackOlives}
          onChange={inputChange}
        />
        Black Olives</label>

        <label htmlFor="roastedGarlic">
        <input
          type="checkbox"
          id="terms"
          name="roastedGarlic"
          checked={formState.roastedGarlic}
          onChange={inputChange}
        />
        Roasted Garlic</label>

        <label htmlFor="artichokeHearts">
        <input
          type="checkbox"
          id="terms"
          name="artichokeHearts"
          checked={formState.artichokeHearts}
          onChange={inputChange}
        />
        Artichoke Hearts</label>

        <label htmlFor="threeCheese">
        <input
          type="checkbox"
          id="terms"
          name="threeCheese"
          checked={formState.threeCheese}
          onChange={inputChange}
        />
        Three Cheese</label>

        <label htmlFor="threeCheese">
        <input
          type="checkbox"
          id="terms"
          name="pineapple"
          checked={formState.pineapple}
          onChange={inputChange}
        />
        Pineapple</label>

        <label htmlFor="extraCheese">
        <input
          type="checkbox"
          id="terms"
          name="extraCheese"
          checked={formState.extraCheese}
          onChange={inputChange}
        />
        Extra Cheese</label>
        

        {/* {errorState.toppings.length > 1 ? (
          <p className="error">{errorState.toppings}</p>
        ) : null} */}

      </div>
    <div className="substituteCard">
      <h4 id="substitute">Choice of Substitute</h4>
      <label htmlFor="terms">
        <input
          type="checkbox"
          id="substitute"
          name="substitute"
          checked={formState.substitute}
          onChange={inputChange}
        />
        Gluten Free Crust (+$1.00)
        </label>
    </div>

    <div className="instructionCard">
    <label htmlFor="instructions"><h4>Special Instructions?</h4></label>
        <textarea
          name="instructions"
          id="instructions"
          value={formState.instructions}
          onChange={inputChange}
        />
    </div>
<div className="quantityCard">
<label htmlFor="quantity">
    <h4 id="quantity">Number of Pizzas</h4>
        <select
            value={formState.quantity}
            name="quantity"
            id="quantity"
            onChange={inputChange}
        >
        <option value="1">1</option>   
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        </select>
        {/* {errorState.position.length > 0 ? (
        <p className="error">{errorState.position}</p>
        ) : null} */}
    </label>
</div>


 


      <button disabled={buttonDisabled} type="submit">Place Your Order</button>
    </form>
    <pre>{JSON.stringify(postedData, null, 2)}</pre>
    </>
    )
}

export default Form;

