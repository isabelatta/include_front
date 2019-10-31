import React, { Component } from 'react';
import api from "../../../uteis/api";
import './login.css';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'

import { IoMdClose } from "react-icons/io";
import { IoMdCheckmark } from "react-icons/io";

import BgLogin from './componentes/BgLogin.react';

class Cadastro extends Component {

  constructor() {
    super();
    this.state = {
      email: null,
      nome: null,
      senha: null,
      messageEmail: "Informe seu email",
      messageNome: "Informe seu nome e sobrenome",
      messageSenha: "Insira uma senha de no mínimo 6 caracteres",
      checkEmail: null,
      checkNome: null,
      checkSenha: null

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
    const { email, nome, senha } = this.state;

    const values = {
      email, 
      nome,
      senha
    };

    await this.check()

    const { checkEmail, checkNome, checkSenha } = this.state;
    console.warn(checkSenha);

    if(checkEmail && checkNome && checkSenha){
      const response = await api.post("/usuario/cadastrar", values);
      console.log(response);
    }
    
  };

  validaEmail = () => {
    const { email } = this.state;

    var er = new RegExp(
      /^[A-Za-z0-9_\-\.]+@[A-Za-z0-9_\-\.]{2,}\.[A-Za-z0-9]{2,}(\.[A-Za-z0-9])?/
    );
    if (typeof email == "string") {
      if (er.test(email)) {
        return true;
      }
    } else {
      return false;
    }
  };

  check = () => {
    const { email, nome, senha} = this.state;

    if(email === null){
      this.setState({
        messageEmail: "Informe seu email",
        checkEmail: false
      });
      this.popoverEmail();
    }
    else if(!(this.validaEmail())){
      this.setState({
        messageEmail: "Email incorreto",
        checkEmail: false
      });
      this.popoverEmail();
    }
    else {
      this.setState({
        messageEmail: "Email válido",
        checkEmail: true
      });
    }

    if(nome === null){
      this.setState({
        messageNome: "Informe seu nome e sobrenome",
        checkNome: false
      });
      
    }
    else if(nome.length < 5){
      this.setState({
        messageNome: "Informe seu nome e sobrenome",
        checkNome: false
      });
    }

    else {
      this.setState({
        messageNome: "Nome válido",
        checkNome: true
      });
    }

    if(senha === null){
      this.setState({
        messageSenha: "Insira uma senha de no mínimo 6 caractéres",
        checkSenha: false
      });
    }
    else if(senha.length < 6){
      this.setState({
        messageSenha: "A senha deve conter no mínimo 6 caractéres",
        checkSenha: false
      });
    }
    else {
      this.setState({
        messageSenha: "Senha válida",
        checkSenha: true
      });
    }
  }


  popoverEmail = () => {
    const {messageEmail} = this.state;

    return (
      <Popover id="popover-basic">
        <Popover.Content>
          {messageEmail}
        </Popover.Content>
      </Popover>
    );
  }

  popoverNome = () => {
    const {messageNome} = this.state;

    return (
      <Popover id="popover-basic">
        <Popover.Content>
          {messageNome}
        </Popover.Content>
      </Popover>
    );
  }

  popoverSenha = () => {
    const {messageSenha} = this.state;

    return (
      <Popover id="popover-basic">
        <Popover.Content>
          {messageSenha}
        </Popover.Content>
      </Popover>
    );
  }

  emailCheck = () => {
    const { checkEmail} = this.state;

    const style = {
      position: "absolute",
      top: "6%",
      left: "90%"
    }
    if(checkEmail == true){
      return(
        <IoMdCheckmark style={style} />
      )
    } 
    else {
      return(
        <IoMdClose style={style} />
      )
    }
    
  }

  nomeCheck = () => {
    const { checkNome} = this.state;

    const style = {
      position: "absolute",
      top: "40%",
      left: "90%"
    }
    if(checkNome){
      return(
        <IoMdCheckmark style={style} />
      )
    }
    else {
      return(
        <IoMdClose style={style} />
      )
    }
    
  }

  senhaCheck = () => {
    const { checkSenha} = this.state;

    const style = {
      position: "absolute",
      top: "74%",
      left: "90%"
    }
    if(checkSenha === true){
      return(
        <IoMdCheckmark style={style} />
      )
    }
    else {
      return(
        <IoMdClose style={style} />
      )
    }
  }


  render() {
    const { checkEmail, checkNome, checkSenha} = this.state;
    
    return (
      <div>
        <BgLogin/>
        <div>
            <Form className="FormCadastro">
           
            <OverlayTrigger placement="right" overlay={this.popoverEmail()}>
                <Form.Group controlId="email">
                {(checkEmail !== null )? this.emailCheck() : null}
                    <Form.Control
                        name="email" 
                        type="text" 
                        placeholder="Email" 
                        onChange={this.handleChange}
                      />   
                  </Form.Group>
              </OverlayTrigger>

              <OverlayTrigger placement="right" overlay={this.popoverNome()}>
                  <Form.Group  controlId="usuario">

                  {(checkNome !== null )? this.nomeCheck() : null}
                      <Form.Control 
                          name="nome" 
                          type="text" 
                          placeholder="Nome"
                          onChange={this.handleChange}
                        />   
                  </Form.Group>
                </OverlayTrigger>

                <OverlayTrigger placement="right"  overlay={this.popoverSenha()}>
                  <Form.Group  controlId="senha">
                  {(checkSenha !== null )? this.senhaCheck() : null}
                      <Form.Control 
                          name="senha" 
                          type="password" 
                          placeholder="Senha" 
                          onChange={this.handleChange}
                    />   
                  </Form.Group>
                </OverlayTrigger>

            </Form>
          <Button variant="flat" className="LoginBtn" onClick={() => this.cadastrar()}> Cadastrar </Button>
        </div>
    </div>
    );
  }
}

export default Cadastro