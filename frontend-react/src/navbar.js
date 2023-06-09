import React, { useState } from "react";
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap"
import { useNavigate } from "react-router-dom";


function Navigation({email}){
    const navigate = useNavigate()
    function logout() {
        fetch('/api/users/logout', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        })
        .then(data => navigate("/"))
        
    }
    return(
        <React.Fragment>
            <Navbar expand="sm" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="/home">Triple Triad</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/home">Home</Nav.Link>
                        <Nav.Link href="">Deck Manager</Nav.Link>
                        <Nav.Link href="/collection">Collection</Nav.Link>
                        <Nav.Link href="/account">Account</Nav.Link>
                        <NavDropdown title="Play Game" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/game">Easy</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">
                            Hard[NotImplemented]
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">
                            Separated link
                        </NavDropdown.Item>
                        
                        </NavDropdown>
                        
                    </Nav>
                    <Nav className="ms-auto">
                        <Nav.Link >{email}</Nav.Link>
                        <Nav.Link onClick={() => logout()}>Logout</Nav.Link>
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </React.Fragment>
    )
    
}
export default Navigation