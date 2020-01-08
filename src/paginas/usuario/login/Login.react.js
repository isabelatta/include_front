import React, { Component } from 'react';
import api from "../../../uteis/api";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import {BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom'

import BgLogin from '../../componentes/BgLogin.react';
import Cadastro from './Cadastro.react'

import './login.css';



class Login extends Component {

  constructor() {
    super();
    this.state = {
        authSuccess: null,
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
      
  entrar = async submitted => {
    const {email, senha} = this.state

    const values = {
      email,
      senha
    }

    const response = await api.post("/usuario/auth", values);
    console.log(response);
    if(response.status === 200){
      this.setState({
        authSuccess : true
      })
      localStorage.setItem('id',response.data.id);
      localStorage.setItem('nome',response.data.nome);
    } else {
      this.setState({
        authSuccess : false
      })
    }
  };

  renderRedirect = () => {
    const { authSuccess } = this.state;
    if (authSuccess) {
      return <Redirect to="/home" />;
    }
     else if(!authSuccess){
       console.log("error")
     }
  };



  render() {
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
        <div>
            <Form className="FormLogin">
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
            </Form>
            <Button variant="flat" className="LoginBtn" onClick={() => this.entrar()} >Entrar</Button>
        </div>
      </div>
    );
  }
}

export default Login