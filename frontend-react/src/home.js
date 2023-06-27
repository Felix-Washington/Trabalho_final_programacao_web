import React, {useState} from "react";
import "./home.css";
import Navigation from "./navbar";

function Home(){
    const [name, setName] = useState(null)
    fetch('http://localhost:5000/api/users/auth',{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      })
      .then(user => user.json())
      .then(user => {
        setName(user.name)
      })
    return(
        <React.Fragment>
            <Navigation/>
            <div className="main-window">
                <h2>Welcome, <u>{name}</u></h2>
                <img></img>
            </div>
        </React.Fragment>  
    )
}

export default Home