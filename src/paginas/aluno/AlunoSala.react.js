import React, { Component } from 'react';
import api from "../../uteis/api";

import './codigoSala.css';
import Navb from '../componentes/Nav.react';
import BlocklyAluno from './componentes/BlocklyAluno.react'
import './alunoSala.css'
import ModalEquipe from './componentes/ModalEquipe.react';
import InitButton from '../componentes/InitButton.react';

import { Row, Col, Button } from 'react-bootstrap';
import sweetAlertWarn from '../../uteis/sweetAlert';




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
      nomeEquipe: null,
      infoSala: null,
      entradasSaidas: [],
      showModalNomeEquipe: true,
      idEquipe: null,
    };
    
  }

  componentDidMount = async () => {
    const { codigo, equipeId, equipeNome } = this.props.location.state;
    
    await this.recarregar();
    if (equipeId && equipeNome) {
      localStorage.setItem('id_equipe', equipeId);
      localStorage.setItem('equipe', equipeNome);
    }

    const nome = localStorage.getItem('equipe');
    this.setState({
      nomeEquipe: nome,
    })

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

  corrigirAtiv = (code) => {
    let teste = "x = -2";
    let valid = true;
    teste = teste.replace(/\s/g, "").toLowerCase();
    const resultado = code.replace(/\s/g, "").toLowerCase();
    Array.from(teste).forEach((element, index) => {
      if (element !== resultado[index]) {
        valid = false;
      }
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
  );


  salvarNomeEquipe = async (nome) => {
    const { infoSala } = this.state;

    this.setState({
      showModalNomeEquipe: false,
    })

    const values = {
      nome,
      sala : infoSala.sala_id
    }

    await api
    .post(`/aluno/salvarEquipe`, values)
    .then(response => response.data)
    .then(results => {
      localStorage.setItem('equipe', nome);
      localStorage.setItem('id_equipe', results.id);
      this.setState({
        nomeEquipe: nome,
        idEquipe: results.id
      })
    });
    
  }

  recarregar = () => {
    const nome = localStorage.getItem('equipe');

    if (nome !== null) {
      this.setState({
        showModalNomeEquipe: false,
      })
    }
  }

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

  finalizarAtiv = async () => {
    const idEquipe = await localStorage.getItem('id_equipe');
  
    const confirm = await sweetAlertWarn('Tem Certeza?', 
    'Essa ação irá sinalizar o(a) professor(a) que sua atividade foi concluída',
    );

    if(confirm) {
      const values = {
        idEquipe,
        finalizado: 1
      }
  
      await api
          .put(`/aluno/finalizarAtiv`, values)
          .then(response => response.data)
          .then(results => {
            this.setState({
              finalizada: true
            })
          });
    }

  }


  render() {
    const { readOnly } = this.props.location.state;
    const {
      nomeEquipe,
      infoSala,
      entradasSaidas,
      showModalNomeEquipe,
    } = this.state;

    return (
      <div>
      <ModalEquipe
        show={showModalNomeEquipe}
        func={this.salvarNomeEquipe}
      />
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
                    <InitButton tituloBtn="Finalizar Atividade" funcao={this.finalizarAtiv}/>
                  </Col>
                
                </Row>
              </div>
              <div>
                <BlocklyAluno readOnly={readOnly} corrigirAtiv = {this.corrigirAtiv} />
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