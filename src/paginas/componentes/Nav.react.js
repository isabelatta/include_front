import React, { Component } from 'react';

import './nav.css'

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import CriarSala from './CriarSala.react';

class Navb extends Component {
	constructor() {
		super();
		this.state = {
			modalShow: false,
		}    
	}

	render(){
		const prof = "Professor(a) " + localStorage.getItem("nome");
		const { modalShow } = this.state;

		return(
			<div className="divBorder">
				<Navbar expand="lg" className="navBg">
						<Navbar.Brand href="#home" className="navProf">{prof}</Navbar.Brand>
						<Navbar.Toggle aria-controls="basic-navbar-nav" />
						<Navbar.Collapse id="basic-navbar-nav">
								<Nav className="mr-auto">
								<Button 
									variant="link"
									className="navCriarSala"
									onClick={() => this.setState({ modalShow: !modalShow})}
								>
									Criar Sala
								</Button>
								<Nav.Link href="#link"></Nav.Link>
								</Nav>
						</Navbar.Collapse>
				</Navbar>
				<CriarSala
					show={modalShow}
					onHide={() => this.setState({ modalShow: !modalShow})}
				/>
			</div>
				
		)
	}

}

export default Navb