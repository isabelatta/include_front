import React, { Component } from 'react';
import api from "../../uteis/api";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import {BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom'

import BgLogin from '../componentes/BgLogin.react';
import './codigoSala.css';



class CodigoSala extends Component {

  constructor() {
    super();
    this.state = {
        authSuccess: null,
        codigo: null,
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
    const {codigo} = this.state

    const response = await api.get(`/aluno/inserirCodigo/${codigo}`);
    console.log(response);
    if(response.status === 200){
      this.setState({
        authSuccess : true,
        codigo: response.data.codigo,
      })
    } else {
      this.setState({
        authSuccess : false,
        codigo: null,
      })
    }
  };


  renderRedirect = () => {
    const { codigo, authSuccess } = this.state;

    if (authSuccess) {
      return <Redirect
        to={{
          pathname: "/sala",
          state: {
            codigo,
            readOnly: false,
          }
        }}
      />;
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
        <div>
            <Form className="formCodigo">
                <Form.Group  controlId="formPlaintextLogin" className="codigoInput">
                    <Form.Control
                      name="codigo" 
                      type="text" 
                      placeholder="Código da Sala"
                      onChange={this.handleChange}
                    />   
                </Form.Group>
                <Button variant="flat" className="codigoBtn" onClick={() => this.entrar()} >Entrar</Button>
            </Form>
            
        </div>
      </div>
    );
  }
}

export default CodigoSala