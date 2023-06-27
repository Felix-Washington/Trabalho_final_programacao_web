import React, {useState} from 'react';
import "./styles/login.css";
import { useNavigate } from "react-router-dom";
const player_starter = require("./resources/player_starter.json")


function RegistrationForm() {
    const navigate = useNavigate()
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const handleSubmit = async e => {

        fetch('/api/users/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({"name": name, "email": email, "password":password, "deck": player_starter, "listacartas": player_starter})
          })
            .then(data => navigate("/"));
        e.preventDefault();

      }

    return(
        <React.Fragment>
            <img className="title_login" src="https://i.imgur.com/T3ybYPx.png" ></img>
            <div className="Auth-form-container">
            <form className="Auth-form" onSubmit={handleSubmit}>
                <div className="Auth-form-content">
                <h3 className="Auth-form-title">Register</h3>
                <div className="form-group mt-3">
                    <label>Name</label>
                    <input
                    className="form-control mt-1"
                    placeholder="Enter name"
                    onChange={e => setName(e.target.value)}
                    />
                </div>
                <div className="form-group mt-3">
                    <label>Email address</label>
                    <input
                    type="email"
                    className="form-control mt-1"
                    placeholder="Enter email"
                    onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group mt-3">
                    <label>Password</label>
                    <input
                    type="password"
                    className="form-control mt-1"
                    placeholder="Enter password"
                    onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <div className="d-grid gap-2 mt-3">
                    <button type="submit" className="btn btn-primary" >
                    Submit
                    </button>

                    
                </div>
                </div>
            </form>
        </div>
    </React.Fragment>
    )       
}
export default RegistrationForm;