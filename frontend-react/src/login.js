import React, { useState , useEffect} from "react";
import "./login.css";
import "bootstrap/dist/css/bootstrap.min.css"
import { useNavigate } from "react-router-dom";



function Login(){
    const navigate = useNavigate()
 
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const handleSubmit = async e => {

        fetch('/api/users/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({"email": email, "password":password})
          })
            .then(data => data.json())
            .then(data =>{
                if (data.cookie === undefined){
                    alert(data.result)
                }
                else{
                    console.log("LOGGED")
                    
                    navigate("/home")

                }
            }
            )
        e.preventDefault();

      }

    return(
        <React.Fragment>
            <img className="title_login" src="https://i.imgur.com/T3ybYPx.png" ></img>
            <div className="Auth-form-container">
                <form className="Auth-form" onSubmit={handleSubmit}>
                    <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Sign In</h3>
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
                    <p className="forgot-password text-right mt-2">
                        Forgot <a href="/">password?</a>
                    </p>
                    </div>
                </form>
            </div>
        </React.Fragment>
        
        
    )


    
}

export default Login