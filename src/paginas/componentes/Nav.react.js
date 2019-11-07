import React, { Component } from 'react';

import './nav.css'

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button';

class Navb extends Component {
    constructor() {
        super();    
    }

    render(){
        const prof = "Professor " + localStorage.getItem("nome");

        return(
            <div className="divBorder">
            <Navbar expand="lg" className="navBg">
                <Navbar.Brand href="#home" className="navProf">{prof}</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                    <Button variant="link" className="navCriarSala" > Criar Sala</Button>
                    <Nav.Link href="#link"></Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            </div>
            
        )

    }

}

export default Navb