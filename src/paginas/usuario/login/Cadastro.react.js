import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import api from "../../../uteis/api";

import BgLogin from './componentes/BgLogin.react';

import './login.css';

class Cadastro extends Component {

  constructor() {
    super();
    this.state = {
      email: null,
      nome: null,
      senha: null
    };
  }

  handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState({
      [name]: value,
    });
  }
      
  cadastrar = async submitted => {
    const { email, nome, senha} = this.state;

    const values = {
      email, 
      nome,
      senha
    };

    // console.log(values);
    
    const response = await api.post("/usuario/cadastrar", values);
    console.log(response);
  };



  render() {
    return (
      <div>
        <BgLogin/>
        <div>
            <Form className="FormCadastro">
                <Form.Group controlId="email">
                    <Form.Control
                        name="email" 
                        type="text" 
                        placeholder="Email" 
                        onChange={this.handleChange}
                      />   
                </Form.Group>
                <Form.Group  controlId="usuario">
                    <Form.Control 
                        name="nome" 
                        type="text" 
                        placeholder="Nome"
                        onChange={this.handleChange}
                      />   
                </Form.Group>
                <Form.Group  controlId="senha">
                    <Form.Control 
                        name="senha" 
                        type="password" 
                        placeholder="Senha" 
                        onChange={this.handleChange}
                    />   
                </Form.Group>
            </Form>
            <Button variant="flat" className="LoginBtn" onClick={() => this.cadastrar()}> Cadastrar </Button>
        </div>
    </div>
    );
  }
}

export default Cadastro