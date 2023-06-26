import React, { useState } from "react";
import Navigation from "./navbar";
import "./home.css";

/* IMPLEMENTAR QUERY INDIVIDUAL DE COLEÇÃO DO USUARIO -> Pós Login
const request = new XMLHttpRequest();
request.open('GET', '/api/cards/', false);  // `false` makes the request synchronous
request.send(null);
if (request.status !== 200) {
  console.log(request.status);
}

const req = JSON.parse(request.responseText);
*/
/*
*/
function Card({carta}){
    if (carta != null){
        return(
            <React.Fragment>
                <div className="tt-card">
                    <span className="tooltiptext">{carta.name}</span>
                    <img src={carta.file_link}></img>
                    <div className="up_value">{carta.values[0]}</div>
                    <div className="right-value">{carta.values[1]}</div>
                    <div className="bottom-value">{carta.values[2]}</div>
                    <div className="left-value">{carta.values[3]}</div>
                </div>
            </React.Fragment>
            )
    }
}
function CardHolder({cartas}){
    return <ul>{cartas.map(carta => <Card key={carta.name} carta={carta}/>)}</ul>;
}
function CardCollection(){
    
    return(
        <React.Fragment>
            <Navigation/>
            <div className="main-window">
                <h1>Cards:</h1>
                
                <img></img>
            </div>
        </React.Fragment>
    )
}

export default CardCollection;