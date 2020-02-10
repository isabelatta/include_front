import React, { Component } from 'react';

import { 
  Modal,
  Form,
  Button,
} from 'react-bootstrap';

import './modalEquipe.css'

import imagemTopo from '../../../res/imagens/logoInclude.png'


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

  salvarNome = () => {
    const { equipe } = this.state;
    const { func } = this.props;
    if (equipe) {
      func(equipe);
    }
  }

  renderModal = (show, onHide, func) => (
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
          <Button variant="flat" onClick={() => this.salvarNome()} className="equipeBtn">Entrar com esse nome</Button>
        </Form>
      </div>
    </Modal>
  )


	render(){
    const {
      show,
      onHide,
      func
    } = this.props;

    return this.renderModal(show, onHide, func)
    
	}

}

export default ModalEquipe