import React from "react";
import Game from "./game";
import Login from "./login"
import Home from "./home"
import RegistrationForm from "./registration";
import Account from "./account"
import { BrowserRouter, Route, Routes} from 'react-router-dom';

function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/account" element={<Account/>} />
        <Route path="/register" element={<RegistrationForm/>} />
        <Route path="/game" element={<Game/>} />
        <Route path="/home" element={<Home/>} />
      </Routes>
      
    </BrowserRouter>
    
  )
}

export default App;