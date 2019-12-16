import React, { Component } from 'react';
import moment from "moment";
import api from "../../../uteis/api";

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'
import {Redirect} from 'react-router-dom'

import './modal.css'


class CriarSala extends Component {
	constructor() {
    super(); 
    this.state = {
      nome: null,
      descri: null,
      messageNome: "Crie um nome para a sala",
      messageDescri: "Insira uma descrição para sala",
      checkNome: false,
      checkDescri: false,
    }   
  }
  
  handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState({
      [name]: value,
    });
  }

  onHideScreen = (onHide) => {
    this.setState({
      nome: null,
      descri: null,
      messageNome: "Crie um nome para a sala",
      messageDescri: "Insira uma descrição para sala",
      checkNome: false,
      checkDescri: false,
      salaId: null,
    })
    onHide();
  }

  cadastrar = async submitted => {
    const { onHide } = this.props;
    const {nome, descri, checkNome, checkDescri} = this.state;

    const usuario =  await localStorage.getItem("id");
    let data =  moment().format("YYYY-MM-DD")

    const values = {
      usuario: parseInt(usuario),
      nome, 
      descri,
      data,
      aberta: 1,
    };

    await this.check()

    if(checkNome && checkDescri){
      // const response = await api.post("/sala/cadastrar", values).then(response => {
      //   console.log(response)
      // });
      await api
      .post(`/sala/cadastrar`, values)
      .then(response => response.data)
      .then(results => {
        this.setState({salaId: results.id})
      });
      // console.log(response);
    } 
  };


  check = () => {
    const {nome, descri} = this.state;

    if(nome === null){
      this.setState({
        messageNome: "Crie um nome para a sala ",
        checkNome: false,
      });
    }
    else if(nome.length < 5){
      this.setState({
        messageNome: "O nome da sala deve conter mais que 5 caracteres",
        checkNome: false,
      });
    }
    else {
      this.setState({
        messageNome: "Nome válido",
        checkNome: true,
      });
    }

    if(descri === null){
      this.setState({
        messageDescri: "Insira uma descrição para sala",
        checkDescri: false,
      });
    }
    else if(descri.length <  5){
      this.setState({
        messageDescri: "A descrição deve conter mais que 5 caracteres",
        checkDescri: false,
      });
    }
    else {
      this.setState({
        messageDescri: "Descrição válida",
        checkDescri: true,
      });
    }


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

  popoverDescri = () => {
    const {messageDescri} = this.state;

    return (
      <Popover id="popover-basic">
        <Popover.Content>
          {messageDescri}
        </Popover.Content>
      </Popover>
    );
  }

  renderRedirect = () => {
    const {salaId} = this.state
    console.log("teste")
    if (salaId !== null) {
      return (
        <Redirect
          to={{
            pathname: "/criarAtividade",
            state: { salaId }
          }}
        />
      )
    }
  }

  renderModal = (show, onHide) => (
    <Modal
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={() => this.onHideScreen(onHide)}
      className="modalForm"
    >
      {this.renderRedirect}
      <Modal.Header closeButton className="headerModal">
        <Modal.Title id="contained-modal-title-vcenter">
          Criar Sala
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ padding: 40 }}>
        <OverlayTrigger placement="top" overlay={this.popoverNome()}> 
            <Form.Group  controlId="formPlaintextLogin">
              <Form.Control
                className="nameInput"
                placeholder="Nome da Sala"
                // size="lg"
                name="nome" 
                type="text" 
                onChange={this.handleChange}
              />
            </Form.Group>
        </OverlayTrigger>
        <OverlayTrigger placement="top" overlay={this.popoverDescri()}> 
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Control 
              placeholder="Descrição da Sala"
              as="textarea" 
              rows="10" 
              name="descri" 
              onChange={this.handleChange} 
            />
          </Form.Group>
        </OverlayTrigger>
      </Modal.Body>
      <Modal.Footer>
        <Button className="btnModal" onClick={this.cadastrar}> Criar Sala </Button>
      </Modal.Footer>
    </Modal>
  )




	render(){
    const { show, onHide } = this.props;
    const { salaId } = this.state;
    if (salaId) return this.renderRedirect()
    else return this.renderModal(show, onHide)
	}

}

export default CriarSala