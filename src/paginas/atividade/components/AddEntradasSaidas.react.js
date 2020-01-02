import React, { Component } from 'react';
import moment from "moment";

import api from "../../../uteis/api";

import { 
  Form,
  Col,
  Modal,
  Button,
} from 'react-bootstrap';
import { FaArrowRight } from "react-icons/fa";
import { Redirect } from 'react-router-dom';

import './addEntradaSaida.css';


class CriarSala extends Component {
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

  adicionarEntSaida = () => {
    const { submit } = this.props;
    const { entrada, saida } = this.state;
    submit(entrada, saida);
  }

  renderModal = (show, onHide, atividade) => (
    <Modal
      show={show}
      // size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={() => this.onHideScreen(onHide)}
      className="modalEntrSaid"
    >
      <div className="divEntSaida">
        <h3>Digite uma entrada e uma saída esperada</h3>

        <Form>
          <Form.Row>
            <Col sm={5}>
              <div className="divModelEntSaid">
                <span>Modelo de Entrada</span>
                <p>{atividade.modelo_entrada}</p>
              </div>
            </Col>
            <Col sm={2}></Col>
            <Col sm={5}>
              <div className="divModelEntSaid">
                <span>Modelo de Saída</span>
                <p>{atividade.modelo_saida}</p>
              </div>
            </Col>
          </Form.Row>
          <Form.Row>
            <Col sm={5}>
              <Form.Control
                placeholder="Entrada"
                name="entrada" 
                onChange={this.handleChange} 
              />
            </Col>
            <Col sm={2} className="divIconEntSaida">
              <FaArrowRight />
            </Col>
            <Col sm={5}>
              <Form.Control
                placeholder="Saída"
                name="saida" 
                onChange={this.handleChange}
              />
            </Col>
          </Form.Row>
        </Form>
        <div className="buttonAdd">
          <Button onClick={this.adicionarEntSaida} variant="success">Adicionar</Button>
        </div>

      </div>
      {/* <Modal.Footer>
        <Button className="btnModal"> Adicionar </Button>
      </Modal.Footer> */}
    </Modal>
  )


	render(){
    const {
      show,
      onHide,
      atividades,
      atividade,
    } = this.props;

    const atividadeView = atividades.filter(a => a.id === atividade);

    if (atividadeView.length > 0) {
      return this.renderModal(show, onHide, atividadeView[0])
    } else {
      return null;
    }
    
	}

}

export default CriarSala