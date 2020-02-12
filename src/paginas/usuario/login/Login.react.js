import React, { Component } from 'react';
import api from "../../../uteis/api";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert'
import {BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom'
import Logo from '../../../res/imagens/logoInclude.png'

import BgLogin from '../../componentes/BgLogin.react';
import Cadastro from './Cadastro.react'


import './login.css';



class Login extends Component {

  constructor() {
    super();
    this.state = {
        authSuccess: null,
        show: false,
    };
    document.body.style.overflow = "hidden";
  }

  handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState({
      [name]: value,
    });
  }

  erroUsuario = () => {
    const { show } = this.state
  
    if (show) {
      return (
        <Alert variant="danger"  onClose={() => this.fecharAlerta()} dismissible >
          <p>
            Usuário ou Senha incorretos. Tente novamente!
          </p>
        </Alert>
      );
    }
  }

  fecharAlerta = () => {
    this.setState({
      show : false,
    });
  }
  
      
  entrar = async submitted => {
    const {email, senha} = this.state

    const values = {
      email,
      senha
    }

    await api
    .post(`usuario/auth`, values)
    .then(async response => {
      console.log(response)
      if (response.status === 200) {
        await localStorage.setItem('id',response.data.id);
        await localStorage.setItem('nome',response.data.nome);
        this.setState({
          authSuccess : true
        })
      } else {
        this.setState({
          authSuccess : false,
          show: true,
        })
      }
    });
  };

  renderRedirect = () => {
    const { authSuccess } = this.state;
    if (authSuccess) {
      return <Redirect to="/home"/>;
    }
     else if(!authSuccess){
       console.log("error")
     }
  };



  render() {
    const {authSuccess} = this.state
    return (
      <div>
        {this.renderRedirect()}
        <BgLogin/>
        <Link
          // className="cadastroButton"
          to={{
            pathname: "/cadastro",
          }}
        >
          <Button variant="link" className="RegisterBtn" > Cadastre-se!</Button>
        </Link>
        {(authSuccess)? null : this.erroUsuario()}
        <div>
          <Form className="FormLogin">
            <div className="LogoDiv">
              <img src={Logo} style={{width:"75%"}}/>
            </div>
            <Form.Group  controlId="formPlaintextLogin">
                <Form.Control
                  name="email" 
                  type="text" 
                  placeholder="Email"
                  onChange={this.handleChange}
                />   
            </Form.Group>
            <Form.Group  controlId="formPlaintextPassword">
                <Form.Control 
                  name="senha"
                  type="password" 
                  placeholder="Senha" 
                  onChange={this.handleChange}
                />   
            </Form.Group>
            <div className='divButtonLogin'>
              <Button variant="flat" className="LoginBtn" onClick={() => this.entrar()} >Entrar</Button>  
            </div>
          </Form>
        </div>
      </div>
    );
  }
}

export default Login