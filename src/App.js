import React from "react";
import Game from "./game";
import Login from "./login"
import { BrowserRouter, Route, Routes} from 'react-router-dom';

function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/game" element={<Game/>} />
      </Routes>
      
    </BrowserRouter>
    
  )
}

export default App;