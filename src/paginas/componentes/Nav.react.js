import React, { Component } from 'react';

import './nav.css'

import Navbar from 'react-bootstrap/Navbar'
import Col from 'react-bootstrap/Col'
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import CriarSala from '../sala/componentes/CriarSala.react';
import { IoMdArrowBack } from "react-icons/io";
import Logo from '../../res/imagens/logoInclude.png'
import {Redirect} from 'react-router-dom'

class Navb extends Component {
	constructor() {
		super();
		this.state = {
			modalShow: false,
			log: false,
			redirectDash: false
		}    
	}

	renderPrimeiroElemento = () => {
		const prof = "Professor(a) " + localStorage.getItem("nome");
		const { principal, aluno, equipe, professor } = this.props;

		if (principal) {
			return(
				<div>
					<Navbar.Brand href="/home" className="navProf">
					{prof}
				</Navbar.Brand>
				</div>
				
			)
		}
		else if (aluno) {
			return (
				<Nav className="mr-auto" style={{ padding: 5 }}>
					{equipe}
				</Nav>
			)
		} else if (professor) {
			return(
				<Nav.Link className="navProf">
				<IoMdArrowBack
					style={{ fontSize: 30, color: '#CCC' }}
					onClick = {() => this.setState({ redirectDash: true }) }
				/>
			</Nav.Link>
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
					<Col xs={4}>
						<Button 
							variant="link"
							className="navCriarSala"
							onClick={() => this.setState({ modalShow: !modalShow})}
						>
							Criar Sala
						</Button>
					</Col>
					<Col xs={4}>
						<img src={Logo} className="navLogo"/>
					</Col>
					<Col xs={4} style={{ textAlign: 'end' }}>
						<Button 
							variant="link"
							className="navLogout"
							onClick={() => this.logout()}
						>
							Sair
						</Button>
					</Col>
				</Navbar.Collapse>
			)
		}
		return (
			<Nav className="navTituloPage">
				{nomePagina}
			</Nav>
		)
	}

	logout = () => {
		localStorage.removeItem("id");
		localStorage.removeItem("nome");
		this.setState({
			log: true
		})
	}

	renderRedirect = () => {
    const { log } = this.state;
    if (log) {
      return (
        <Redirect
          to={{
            pathname: "/",
          }}
        />
      )
    }
	}

	teste = () => {
		const { redirectDash } = this.state;	
		const { fechada, salaId } =  this.props;

		if (redirectDash) {
			return (
			  <Redirect
			    to={{
			      pathname: "/dashboard",
			      state: {
							salaId,
							fechada,
			      }
			    }}
			  />
			)
		}
	}
	
	// renderRedirectDash = () => {
	// 	const { redirect } = this.state
	// 	const { fechada, salaId } =  this.props.location.state

  //   if (redirect) {
	// 		console.log("aaa")
  //     // return (
  //     //   <Redirect
  //     //     to={{
  //     //       pathname: "/dashboard",
  //     //       state: {
	// 		// 				salaId,
	// 		// 				fechada,
  //     //       }
  //     //     }}
  //     //   />
  //     // )
  //   }
	// }

	render(){
	
		const { modalShow } = this.state;
		
		return(
			<div className="divBorder">
				{this.renderRedirect()}
				{this.teste()}
				{/* {this.renderRedirectDash()} */}
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