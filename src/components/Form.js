import React, { useState, useEffect } from "react";
import * as yup from "yup";
import axios from "axios";


const formSchema = yup.object().shape({
    name: yup.string().required("Name is a required field"),
    email: yup
      .string()
      .email("Must be a valid email address")
      .required("Must include email address"),
    size: yup.string().required("Must include why you'd like to join"),
    
    toppings: yup.boolean(),
    pepperoni: yup.boolean(),
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

export default function Form() {
  // managing state for our form inputs
  const [formState, setFormState] = useState({
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
    name: "",
    email: "",
    motivation: "",
    position: "",
    terms: false
  });

  // BONUS!: state for whether our button should be disabled or not.
  const [buttonDisabled, setButtonDisabled] = useState(true);
  // Everytime formState changes, check to see if it passes verification.
  // If it does, then enable the submit button, otherwise disable
  useEffect(() => {
    formSchema.isValid(formState).then(valid => {
      setButtonDisabled(!valid);
    });
  }, [formState]);

  const [errorState, setErrorState] = useState({
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
    name: "",
    email: "",
    motivation: "",
    position: "",
    terms: ""
  });

  const validate = e => {
    let value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    yup
      .reach(formSchema, e.target.name)
      .validate(value)
      .then(valid => {
        setErrorState({
          ...errorState,
          [e.target.name]: ""
        });
      })
      .catch(err => {
        setErrorState({
          ...errorState,
          [e.target.name]: err.errors[0]
        });
      });
  };

  // onChange function
  const inputChange = e => {
    e.persist();
    // console.log("input changed!", e.target.value, e.target.checked);
    validate(e);
    let value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormState({ ...formState, [e.target.name]: value });
  };

  const formSubmit = e => {
    e.preventDefault();
    console.log("form submitted!");
    axios
      .post("https://reqres.in/api/users", formState)
      .then(response => console.log(response))
      .catch(err => console.log(err));
  };

    return (

<form onSubmit={formSubmit}>

<label htmlFor="name">
        Name
        <input
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
        Email
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

    <label htmlFor="size">
    <h4 id="size">Choice of Size</h4>
        <select
            value={formState.size}
            name="size"
            id="size"
            onChange={inputChange}
        >
        <option value="">Select</option>   
        <option value="Small">Small</option>
        <option value="Medium">Medium</option>
        <option value="Large">Large</option>
        <option value="Extra Large">Extra Large</option>
        </select>
        {errorState.position.length > 0 ? (
        <p className="error">{errorState.position}</p>
        ) : null}
    </label>
    <div>
    <h4 id="sauce">Choice of Sauce</h4>
    <label htmlFor="sauce">
        <input 
            type="radio"
            name="sauce"
            id="red"
            value={formState.sauce}
            onChange={inputChange}
        />Original Red
        <input 
            type="radio"
            name="sauce"
            id="ranch"
            value={formState.sauce}
            onChange={inputChange}
        />Garlic Ranch
        <input 
            type="radio"
            name="sauce"
            id="bbq"
            value={formState.sauce}
            onChange={inputChange}
        />BBQ Sauce
        <input 
            type="radio"
            name="sauce"
            id="spinach"
            value={formState.sauce}
            onChange={inputChange}
        />Spinach Alfredo
    </label>
    </div>
    
    <div className="toppings">
    
    <h4 id="toppings">Choose your toppings</h4>

    <label htmlFor="toppings">
        <input
          type="checkbox"
          id="terms"
          name="pepperoni"
          checked={formState.toppings}
          onChange={inputChange}
        />
        Pepperoni
        <input
          type="checkbox"
          id="terms"
          name="sausage"
          checked={formState.toppings}
          onChange={inputChange}
        />
        Sausage
        <input
          type="checkbox"
          id="terms"
          name="canadianBacon"
          checked={formState.toppings}
          onChange={inputChange}
        />
        Canadian Bacon
        <input
          type="checkbox"
          id="terms"
          name="spicySausage"
          checked={formState.toppings}
          onChange={inputChange}
        />
        Spicy Italian Sausage
        <input
          type="checkbox"
          id="terms"
          name="grilledChicken"
          checked={formState.toppings}
          onChange={inputChange}
        />
        Grilled Chicken
        <input
          type="checkbox"
          id="terms"
          name="onions"
          checked={formState.toppings}
          onChange={inputChange}
        />
        Onions
        <input
          type="checkbox"
          id="terms"
          name="greenPepper"
          checked={formState.toppings}
          onChange={inputChange}
        />
        Green Pepper
        <input
          type="checkbox"
          id="terms"
          name="dicedTomatos"
          checked={formState.toppings}
          onChange={inputChange}
        />
        Diced Tomatos
        <input
          type="checkbox"
          id="terms"
          name="blackOlives"
          checked={formState.toppings}
          onChange={inputChange}
        />
        Black Olives
        <input
          type="checkbox"
          id="terms"
          name="roastedGarlic"
          checked={formState.toppings}
          onChange={inputChange}
        />
        Roasted Garlic
        <input
          type="checkbox"
          id="terms"
          name="artichokeHearts"
          checked={formState.toppings}
          onChange={inputChange}
        />
        Artichoke Hearts
        <input
          type="checkbox"
          id="terms"
          name="threeCheese"
          checked={formState.toppings}
          onChange={inputChange}
        />
        Three Cheese
        <input
          type="checkbox"
          id="terms"
          name="pineapple"
          checked={formState.toppings}
          onChange={inputChange}
        />
        Pineapple
        <input
          type="checkbox"
          id="terms"
          name="extraCheese"
          checked={formState.toppings}
          onChange={inputChange}
        />
        Extra Cheese
        

        {/* {errorState.toppings.length > 1 ? (
          <p className="error">{errorState.toppings}</p>
        ) : null} */}
      </label>
      </div>
    <div>
      <h4 id="substitute">Choice of Substitute</h4>
      <label htmlFor="terms">
        <input
          type="checkbox"
          id="substitute"
          name="substitute"
          checked={formState.terms}
          onChange={inputChange}
        />
        Gluten Free Crust (+$1.00)
        </label>
    </div>

    <div>
    <label htmlFor="instructions">
        Why would you like to help?
        <textarea
          name="instructions"
          id="instructions"
          value={formState.motivation}
          onChange={inputChange}
        />

      </label>
    </div>
<div>
<label htmlFor="quantity">
    <h4 id="quantity">Choice of Size</h4>
        <select
            value={formState.size}
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
        {errorState.position.length > 0 ? (
        <p className="error">{errorState.position}</p>
        ) : null}
    </label>
</div>


 


      <label htmlFor="terms">
        <input
          type="checkbox"
          id="terms"
          name="terms"
          checked={formState.terms}
          onChange={inputChange}
        />
        Terms & Conditions
        {errorState.terms.length > 0 ? (
          <p className="error">{errorState.terms}</p>
        ) : null}
      </label>
      <button disabled={buttonDisabled}>Submit</button>
    </form>
    )
}

