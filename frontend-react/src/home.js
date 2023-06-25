import React, { useState } from "react";
import "./home.css";
import Navigation from "./navbar";


function Home(){
    return(
        <React.Fragment>
            <Navigation/>
            <div className="main-window">
                <h2>Welcome, <u>username</u></h2>
                <img></img>
            </div>
        </React.Fragment>  
    )
}

export default Home