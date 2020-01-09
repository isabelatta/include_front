import React, { Component } from 'react';
import api from "../../uteis/api";

import './codigoSala.css';
import Navb from '../componentes/Nav.react';
import BlocklyAluno from './componentes/BlocklyAluno.react'
import './alunoSala.css'

import { Row, Col, Button } from 'react-bootstrap';


const coresEntradasSaidas = [
  '#F95F62',
  '#FFBA5C',
  '#00A6FF'
];

class AlunoSala extends Component {

  constructor() {
    super();
    this.state = {
      authSuccess: null,
      codigo: null,
      nomeEquipe: 'Equipe 1',
      infoSala: null,
      entradasSaidas: [],
    };
    
  }

  componentDidMount = async () => {
    const { codigo } = this.props.location.state;

    await api
		  .get(`aluno/infoSala/${codigo}` )
		  .then(response => response.data)
		  .then(results => {
				if (results) {
					this.setState({
						infoSala: results.sala,
					});
				}
      });
      
      await api
		  .get(`aluno/entradaSaidas/${codigo}` )
		  .then(response => response.data)
		  .then(results => {
				if (results) {
					this.setState({
            entradasSaidas: results.entradasSaidas
					});
				}
		  });
  }

  handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState({
      [name]: value,
    });
  }

  renderDescricaoAtiv = (infoSala) => (
    <div>
      <h3 className="tituloAtividade">
        Descrição da Atividade
      </h3>
      <p className="descriAtividade">
        {infoSala.descri}
      </p>
      <span className="descriAtividade" >Exemplo de Saída: </span>
      <Button variant="outline-primary">{infoSala.modelo_saida}</Button>
    </div>
  )

  renderEntradas = (entradasSaidas) => {
    const entradas = [];
    let cor = 0;
    entradasSaidas.forEach(eS => {
      const corBotao = coresEntradasSaidas[cor];
      entradas.push(
        <Button
          className="checkButton"
          block
          style={{
            backgroundColor: corBotao,
            borderColor: corBotao,
            maxWidth: 500,
            marginTop: '3%',
          }}
        >
          {eS.entrada}
        </Button>
      )
      cor++;
      if (cor === 3) cor = 0;
      
    });
    return entradas
  }


  render() {
    const { codigo } = this.props.location.state;
    const { nomeEquipe, infoSala, entradasSaidas } = this.state;
    console.log(infoSala)
    return (
      <div>
      <Navb 
        nomePagina={(infoSala) ? infoSala.nome : "Sala sem nome"} 
        equipe={nomeEquipe} 
        principal={false} 
        aluno={true}
      />
        {(infoSala)
          ? (
            <div>
              <div className="primeiraRow">
                <Row>
                  <Col xs={6}>
                    {this.renderDescricaoAtiv(infoSala)}
                  </Col>
                  <Col xs={6}>
                    <div>
                      <h3 className="tituloAtividade">
                        Entradas
                      </h3>
                      {this.renderEntradas(entradasSaidas)}
                    </div>
                  </Col>
                
                </Row>
              </div>
              <div>
                <BlocklyAluno />
              </div>
            </div>
          )
          : null
        }
      </div>
    );
  }
}

export default AlunoSala