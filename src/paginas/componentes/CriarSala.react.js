import React, { Component } from 'react';
import moment from "moment";
import api from "../../uteis/api";

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import './modal.css'


class CriarSala extends Component {
	constructor() {
    super(); 
    this.state = {
      nome: null,
      descri: null
    }   
  }
  
  handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    console.log("entrei")
    this.setState({
      [name]: value,
    });
  }

  cadastrar = async submitted => {
    const { onHide } = this.props;
    const {nome, descri} = this.state;

    const usuario =  await localStorage.getItem("id");
    let data =  moment().format("DD/MM/YYYY")

    const values = {
      usuario: parseInt(usuario),
      nome, 
      descri,
      data,
      aberta: 1,
    };

    if(nome !== null && descri !== null){
      const response = await api.post("/sala/cadastrar", values).then(
      // onHide()
      window.location.reload()
    );
    } else {
      console.log("entrei nessa budega")
    }
  };


  

	render(){
    const { show, onHide } = this.props;

		return(
      <Modal
        show={show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={onHide}
        className="modalForm"
      >
        <Modal.Header closeButton className="headerModal">
          <Modal.Title id="contained-modal-title-vcenter">
            Criar Sala
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ padding: 40 }}>
          <Form.Group  controlId="formPlaintextLogin">
            {/* <Form.Label>Nome da sala</Form.Label> */}
            <Form.Control
              className="nameInput"
              placeHolder="Nome da Sala"
              // size="lg"
              name="nome" 
              type="text" 
              onChange={this.handleChange}
            />   
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            {/* <Form.Label>Descrição da sala</Form.Label> */}
            <Form.Control 
              placeHolder="Descrição da Sala"
              as="textarea" 
              rows="10" 
              name="descri" 
              onChange={this.handleChange} 
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btnModal" onClick={this.cadastrar}> Criar Sala </Button>
        </Modal.Footer>
      </Modal>
				
		)
	}

}

export default CriarSala