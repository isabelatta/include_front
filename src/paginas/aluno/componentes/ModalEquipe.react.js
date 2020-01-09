import React, { Component } from 'react';

import { 
  Modal,
  Form,
  Button,
} from 'react-bootstrap';

import './modalEquipe.css'

import imagemTopo from '../../../res/imagens/creative.png'


class ModalEquipe extends Component {
	constructor() {
    super(); 
    this.state = {
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
    onHide();
  }

  renderModal = (show, onHide, atividade) => (
    <Modal
      show={show}
      // size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="modalEntrSaid"
    >
      <div class="modalEquipeDiv">
        <div id="divImagemTopo">
          <img src={imagemTopo} id="imageGroup" />
        </div>
        <Form className="equipeForm">
          <Form.Group  controlId="formPlaintextLogin" className="equipeInput">
              <Form.Control
                name="equipe" 
                type="text" 
                placeholder="Nome da Equipe"
                onChange={this.handleChange}
              />   
          </Form.Group>
          <Button variant="flat" onClick={() => this.entrar()} className="equipeBtn">Entrar</Button>
        </Form>
      </div>
    </Modal>
  )


	render(){
    const {
      show,
      onHide,
    } = this.props;

    return this.renderModal(show, onHide)
    
	}

}

export default ModalEquipe