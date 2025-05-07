import React from "react";
import "App.css";
import little_women from "assets/little women.jpg";


import Nav from "./Nav";

const App = () => (
    <div>
        <Nav />
        <h1 className="wow">Hello React!!</h1>
        <img src={little_women} alt=""/>
    </div>
);


export default App;