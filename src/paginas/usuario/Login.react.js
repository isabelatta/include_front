import React, { Component } from 'react';
import ToggleButton from 'react-bootstrap/ToggleButton'
import Button from 'react-bootstrap/Button'
import { Link } from "react-router-dom";
import Form from 'react-bootstrap/Form'
import api from "../../uteis/api";

import '../usuario/Login.css'

import BgLogin from '../usuario/BgLogin.react'
import { appendToMemberExpression } from '@babel/types';



class Login extends Component {

  constructor() {
      super();
      this.state = {
          usuario: 1,
      };
    }

    styleForm = {
      width: '35%',
      position: 'absolute',
      top: '40%',
      left: '30%'
    }
    
    styleButton = {
      position: 'absolute',
      top: '55%',
      left: '39%',
      width: '18%',
      borderColor: '#f95f62',
      color: '#f95f62',
      fontFamily: 'arial'
    }

    styleRegister = {
      position: 'absolute',
      right:'0',
      fontColor: '#77d353',
      color: '#77d353',
      fontWeight: 'bolder'
    }
      
   entrar = async submitted => {
      const values = { usuario: 'admin', senha: '1'}
      const response = await api.post("login", values);
        console.log(response);
    };
    
    

   render() {
        return (
          <div>
            <BgLogin/>
            <Button variant="link" style={this.styleRegister}> Cadastre-se!</Button>
            <div>
                <Form style={this.styleForm}>
                    <Form.Group  controlId="formPlaintextPassword">
                        <Form.Control type="text" placeholder="Usuario" />   
                    </Form.Group>
                    <Form.Group  controlId="formPlaintextPassword">
                        <Form.Control type="password" placeholder="Senha" />   
                    </Form.Group>
                </Form>
                <Button variant="outline-secondary" style={this.styleButton} onClick={() => this.entrar()} >Entrar</Button>
            </div>
          </div>
        );
      }
}

export default Login