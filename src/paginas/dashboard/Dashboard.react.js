import React, { Component } from 'react';
import 'react-alice-carousel/lib/alice-carousel.css';
import api from "../../uteis/api";
import sweetAlertWarn from '../../uteis/sweetAlert';



import { Container, Row, Col, Button } from 'react-bootstrap';
import {Redirect} from 'react-router-dom'
import Navb from '../componentes/Nav.react';
import CheckButtom from '../componentes/CheckButtom.react';
import BotaoAtividade from '../componentes/BotaoAtividade.react';
import InitButton from '../componentes/InitButton.react';

import './dashboard.css'



const coresEntradasSaidas = [
  '#F95F62',
  '#FFBA5C',
  '#00A6FF'
];


class Dashboard extends Component {
	constructor() {
    super();
    this.state = {
      assunto: null,
      atividades: [],
      assunto: null,
      atividade: null,
      entradaSaidaIds: [],
      entradas: [],
      saidas: [],
      entradasNovas: [],
      saidasNovas: [],
      salaId: 46,
      equipes: null,
      modalShow: false,
      equipeId: null,
    }
	}
	  
	componentDidMount = async () => {
    // const { salaId } = this.props.location.state;
    const { salaId } = this.state
    // this.setState({
    //   salaId
    // })
    await api
		  .get(`dashboard/atividade/${salaId}` )
		  .then(response => response.data)
		  .then(results => {
				if (results) {
					this.setState({
            assunto: results,
          });
				}
      });

      await api
		  .get(`dashboard/listarEquipes/${salaId}` )
		  .then(response => response.data)
		  .then(results => {
				if (results) {
          console.log(results)
					this.setState({
						equipes: results,
					});
				}
      });
   
  };
  
  

  renderEntradaSaida = (tipo) => {
    const { assunto } = this.state
    const buttons = [];
    let cor = 0;
    if (assunto){
      assunto.entradasSaidas.forEach(eS => {
        const corBotao = coresEntradasSaidas[cor];
        buttons.push(
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
            {(tipo === 'entrada') ? eS.entrada : eS.saida}
          </Button>
        )
        cor++;
        if (cor === 3) cor = 0;
        
      });
    }
    return buttons
  }



  renderEquipes = () => {
    const { equipes } = this.state
    const buttons = [];
    
    if (equipes) {
      equipes.forEach(eq => {
        buttons.push(
          <Button
            variant="outline-secondary"
            className="equipesBtn"
            onClick={() => {this.setState({equipeId: eq.id})}}
          >
            <Row>
              <Col xs={8} className="equipeText">
                Equipe {eq.nome}
              </Col>
              <Col xs={4} className="finalizadoText" >
                {(eq.finalizado) 
                ? <span style={{color: "#77d353", fontWeight: 600}}> Finalizado </span>
                : <span style={{color: "#FF9052", fontWeight: 600}}> Fazendo </span>
                }
              </Col>
            </Row>
          </Button>
        )
      })
    }

    return buttons

  }


  renderRedirect = () => {
    const { equipeId, assunto} = this.state

    

    if( equipeId ){
      const codigo = assunto.atividade.codigo
      return (
        <Redirect
          to={{
            pathname: "/sala",
            state: { equipeId, codigo}
          }}
        />
      )
    }
   

  }

	render() {
    const {assunto} = this.state

		return(
			<div>
        {this.renderRedirect()}
        <Navb nomePagina='Dashboard' principal={false} aluno={false}/>
        <div>
          <Row>
          <Col className="margemTotal"> 
            <div>
              <h4 className="tituloAtividade" >Descrição da Atividade</h4>
              <div className="descriAtividade">
                {(assunto) ? assunto.atividade.descri : null}
              </div>
            </div>
            <div className="margemTitulo">
              <h4 className="tituloAtividade"> Entradas </h4>
              {this.renderEntradaSaida('entrada')} 
            </div>    
            <div className="margemTitulo">
              <h4 className="tituloAtividade"> Saídas</h4>
              {this.renderEntradaSaida('saida')} 
            </div>
            <div className="margemTitulo codigoDash">
              <h4 className="tituloAtividade"> Código</h4>
              <Button variant="primary" size="lg" id="codigoButton" className="botaoCodigo" >
                {(assunto) ? assunto.atividade.codigo : null}
              </Button>
            </div>
          </Col>
          <Col>
            <div className="equipesDiv">
              {this.renderEquipes()}
            </div>
           </Col>
          </Row>
        </div>

        
        
       
				
			</div> 
    );

	}
}

export default Dashboard