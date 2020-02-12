import React, { Component } from 'react';
import api from "../../../uteis/api";
import './login.css';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'
import {Redirect} from 'react-router-dom'
import Alert from 'react-bootstrap/Alert'
import Logo from '../../../res/imagens/logoInclude.png'

import { IoMdClose } from "react-icons/io";
import { IoMdCheckmark } from "react-icons/io";

import BgLogin from '../../componentes/BgLogin.react';

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
      checkSenha: null,
      cadastro: false,
      show: false
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
            Este email já possui cadastro.
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
      
  cadastrar = async submitted => {
    const { email, nome, senha } = this.state;

    const values = {
      email, 
      nome,
      senha
    };

    await this.check()

    const { checkEmail, checkNome, checkSenha } = this.state;

    if(checkEmail && checkNome && checkSenha){
      await api
		  .post(`usuario/cadastrar`, values)
		  .then(response => response.data)
		  .then(results => {
        if (results.errorMsg) {
          console.log(results.errorMsg);
          this.setState({
            show: true,
          });
        } else {
          this.setState({
            cadastro: true,
          });
        }
      });
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
      top: "32%",
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
      top: "52%",
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
      top: "70%",
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


  renderRedirect = () => {
    const { cadastro } = this.state;
    if (cadastro) {
      return <Redirect to="/" />;
    }
     else {
       console.log("error")
     }
  };


  render() {
    const { checkEmail, checkNome, checkSenha} = this.state;
    
    return (
      <div>
        <BgLogin/>
        {this.renderRedirect()}
        {this.erroUsuario()}
        <div>
            <Form className="FormCadastro">
              <div className="LogoDiv">
                <img src={Logo} style={{width:"75%"}}/>
              </div>
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
              <div className="divButtonLogin">
                <Button variant="flat" className="LoginBtn" onClick={() => this.cadastrar()}> Cadastrar </Button>
              </div>
            </Form>
        </div>
    </div>
    );
  }
}

export default Cadastro