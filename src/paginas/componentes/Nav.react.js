import React, { Component } from 'react';

import './nav.css'

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import CriarSala from '../sala/componentes/CriarSala.react';
import { IoMdArrowBack } from "react-icons/io";

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
		const { nomePagina, principal } = this.props;

		return(
			<div className="divBorder">
				<Navbar expand="lg" className="navBg">
					{(principal)
						? (			
							<Navbar.Brand href="/home" className="navProf">{prof}</Navbar.Brand>
						)
						: (
							<Nav.Link href="/home" className="navProf">
								<IoMdArrowBack style={{ fontSize: 30, color: '#CCC' }}/>
							</Nav.Link>
						)
					}
					{/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
					{(principal)
						? (			
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
						)
						: (
							<Nav className="navTituloPage">
								{nomePagina}
							</Nav>
						)
					}
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