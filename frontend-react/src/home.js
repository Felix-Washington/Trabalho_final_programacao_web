import React, {useState} from "react";
import "./styles/home.css";
import Navigation from "./navbar";

function Home(){
    const [name, setName] = useState(null)
    const [email, setEmail] = useState(null)
    fetch('http://localhost:5000/api/users/auth',{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      })
      .then(user => user.json())
      .then(user => {
        setName(user.name)
        setEmail(user.email)
      })
    return(
        <React.Fragment>
            <Navigation email={email}/>
            <div className="main-window">
                <h2>Welcome, <u>{name}</u></h2>
                <img className="title_login" src="https://i.imgur.com/T3ybYPx.png" ></img>
            </div>
        </React.Fragment>  
    )
}

export default Home