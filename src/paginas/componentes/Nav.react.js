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

	renderPrimeiroElemento = () => {
		const prof = "Professor(a) " + localStorage.getItem("nome");
		const {principal, aluno, equipe} = this.props;

		if (principal) {
			return(
				<Navbar.Brand href="/home" className="navProf">
					{prof}
				</Navbar.Brand>
			)
		}
		else if (aluno) {
			return (
				<Nav className="mr-auto" style={{ padding: 5 }}>
					{equipe}
				</Nav>
			)
		}
		return(
			<Nav.Link href="/home" className="navProf">
				<IoMdArrowBack style={{ fontSize: 30, color: '#CCC' }}/>
			</Nav.Link>
		)
	}

	renderSegundoElemento= () => {
		const { nomePagina, principal } = this.props;
		const { modalShow } = this.state;
		if ( principal ) {
			return (
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
		}
		return (
			<Nav className="navTituloPage">
				{nomePagina}
			</Nav>
		)
	}

	render(){
	
		const { modalShow } = this.state;
		

		return(
			<div className="divBorder">
				<Navbar expand="lg" className="navBg">
					{this.renderPrimeiroElemento()}
					{this.renderSegundoElemento()}
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