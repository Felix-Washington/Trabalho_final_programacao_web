import React, {useState, useEffect} from 'react';
import "./styles/login.css";
import { useNavigate } from "react-router-dom";
import Navigation from "./navbar";



function Account() {
    const navigate = useNavigate()
    var name_upd;
    var email_upd;
    var password_upd;
    useEffect(() => { 
        fetch('http://localhost:5000/api/users/auth',{
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            },
          })
          .then(user => user.json())
          .then(user => {
            name_upd = user.name
            email_upd= user.email
            password_upd = user.password
          })

     });
     const [name, setName] = useState();
     const [email, setEmail] = useState();
     const [password, setPassword] = useState();

    const handleSubmit = async e => {

        fetch('/api/users/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({"name": name, "email": email, "password":password})
          })
            .then(data => navigate("/home"));
        e.preventDefault();

      }

    return(
        <React.Fragment>

            <Navigation/>
            <div className="main-window">
            <div className="Auth-form-container">
                <form className="Auth-form" onSubmit={handleSubmit}>
                    <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Alterar Informações</h3>
                    <div className="form-group mt-3">
                        <label>Name</label>
                        <input
                        className="form-control mt-1"
                        placeholder="Enter new name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Email address</label>
                        <input
                        type="email"
                        className="form-control mt-1"
                        placeholder="Enter new Email"
                        value={email}
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

        </div>

    </React.Fragment>
    )       
}
export default Account;