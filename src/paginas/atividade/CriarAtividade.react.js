import React, { Component } from 'react';
import 'react-alice-carousel/lib/alice-carousel.css';
import {Redirect} from 'react-router-dom'
import api from "../../uteis/api";
import sweetAlertWarn from '../../uteis/sweetAlert';

import './atividade.css';


import { Container, Row, Col, Button } from 'react-bootstrap';
import Navb from '../componentes/Nav.react';
import CheckButtom from '../componentes/CheckButtom.react';
import BotaoAtividade from '../componentes/BotaoAtividade.react';
import InitButton from '../componentes/InitButton.react';
import AddEntradasSaidas from './components/AddEntradasSaidas.react';



const coresEntradasSaidas = [
  '#F95F62',
  '#FFBA5C',
  '#00A6FF'
];


class CriarAtividade extends Component {
	constructor() {
    super();
    this.state = {
      assuntos: [],
      atividades: [],
      assunto: null,
      atividade: null,
      entradaSaidaIds: [],
      entradas: [],
      saidas: [],
      entradasNovas: [],
      saidasNovas: [],
      salaId: null,
      modalShow: false,
      salaIdDash: null,
      results: null,
    }
	}
	  
	componentDidMount = async () => {
    const { salaId, edit } = this.props.location.state;
    this.setState({
      salaId
    })

    if (edit) {
      await api
		  .get(`sala/infoSala/${salaId}` )
		  .then(response => response.data)
		  .then(async results => {
				if (results) {
          const { sala } = results;
          await this.mudaAssunto(sala.assunto_id)
          await this.mudaAtividade(sala.ativ_id)
				}
      });
      
    }

    await api
		  .get(`atividade/listarAssuntos` )
		  .then(response => response.data)
		  .then(results => {
				if (results) {
          // console.log(results)
					this.setState({
						assuntos: results,
					});
				}
      });
      
    window.onbeforeunload = function(res) {
      return "";
    }.bind(this);
    window.onunload = function(){
      const { salaId } = this.state;
      api.get(`atividade/desfazerAtividade/${salaId}`);
    };
  };
  
  mudaAssunto = async (valor) => {
    const {entradaSaidaIds} = this.state;
    
    let checkClick = true;
    if (entradaSaidaIds.length > 0) {
      checkClick = await sweetAlertWarn(
        "Deseja realizar esta ação?",
        "Ao continuar todas as modificações da atividade serão perdidas"
      );
    }

    if (checkClick) {
      this.setState({
        assunto: valor,
        atividade: null,
        entradaSaidaIds: [],
      });

      await api
      .get(`atividade/listarAtividades/${valor}` )
      .then(response => response.data)
      .then(results => {
        if (results) {
          console.log(results)
          this.setState({
            atividades: results,
          });
        }
      });
    }  
  }

  mudaAtividade = async (valor) => {
    const { entradaSaidaIds, salaId } = this.state;
    let checkClick = true;
    if (entradaSaidaIds.length > 0) {
      checkClick = await sweetAlertWarn(
        "Deseja realizar esta ação?",
        "Ao continuar todas as modificações da atividade serão perdidas"
      );
    }

    if (checkClick) {
      this.setState({ atividade: valor });

      await this.listarEntradasSaidas(valor, salaId);
    }

  }

  listarEntradasSaidas = async (atividade, sala) => {
    console.log("entrou");
    await api
    .get(`atividade/listarEntradasSaidas/${atividade}/${sala}` )
    .then(response => response.data)
    .then(results => {
      if (results) {
        console.log(results)
        const entradas = []
        const saidas = []
        const entradaSaidaIds = []
        if(results.length > 0) {
          results.forEach((r) => {
            entradas.push({
              id: r.id,
              descri: r.entrada,
            });
            saidas.push({
              id: r.id,
              descri: r.saida,
            });
            entradaSaidaIds.push(r.id);
          })
        }
        this.setState({
          entradas,
          saidas,
          entradaSaidaIds
        });
      }
    });
  }

  mudaEntradaSaida = (valor) => {
    console.log(valor);
    const { entradaSaidaIds } = this.state;
    if(entradaSaidaIds.includes(valor)){
      const index = entradaSaidaIds.indexOf(valor);
      entradaSaidaIds.splice(index, 1)
    } else {
      entradaSaidaIds.push(valor)
    }

    this.setState({ entradaSaidaIds })
  }

  adicionarEntraSaid = async (entrada, saida) => {
    const {
      atividade,
      salaId,
      entradas,
      saidas,
      entradaSaidaIds,
    } = this.state;
    const values = {
      entrada,
      saida,
      atividade,
      sala: salaId
    }
    this.setState({
      modalShow: false,
    })

    await api
    .post(`/atividade/cadastrarEntradaSaida`, values)
    .then(response => response.data)
    .then(response => {
        const { id, entrada, saida } = response; 
        entradaSaidaIds.push(id)
        entradas.push({
          id,
          descri: entrada,
        });
        saidas.push({
          id,
          descri: saida,
        });
        this.setState({
          entradas,
          saidas,
          entradaSaidaIds
        });
    });

  }

  gerarAssuntos = (assuntos) => {
    const { assunto: assuntoState } = this.state;
    const assuntosComponents = [];
    assuntos.forEach((assunto) => {
      let checked = false;
      if (assunto.id === assuntoState) checked = true;
      assuntosComponents.push(
        <CheckButtom
          key= {assunto.id}
          descricao={assunto.descri}
          valor={assunto.id}
          cor={assunto.cor}
          checked={checked}
          funcao={this.mudaAssunto}
        />
      )
    });
    return assuntosComponents;
  }

  gerarEntradasSaidas = (entradasSaidas) => {
    const { atividade, entradaSaidaIds } = this.state;
    const entradasSaidasComponents = [];
    let cor = 0;
    if (atividade) {
      if(entradasSaidas.length > 0){
        entradasSaidas.forEach((eS) => {
          let corBotao = '#BEBEBE';
          if(entradaSaidaIds.includes(eS.id)) corBotao = coresEntradasSaidas[cor];
          entradasSaidasComponents.push(
            <Button
              className="checkButton"
              onClick={() => this.mudaEntradaSaida(eS.id)}
              style={{
                backgroundColor: corBotao,
                borderColor: corBotao,
              }}
            >
              {eS.descri}
            </Button>
          )
          cor++;
          if (cor === 3) cor = 0;
        });
      } else {
        entradasSaidasComponents.push(
          <p className="ajudaSecao">
            Não possuimos entradas e saídas relacionadas a essa atividade por enquanto,
            selecione outra atividade para continuar.
          </p>
        )
      }
    } else {
      entradasSaidasComponents.push(
        <p className="ajudaSecao"> Necessário selecionar uma atividade</p>
      )
    }
    return entradasSaidasComponents;
  }


  gerarAtividades = (atividades) => {
    const { atividade: atividadeState, assunto } = this.state;
    const atividadesComponents = [];
    if (assunto) {
      if(atividades.length > 0) {
        atividades.forEach((atividade) => {
          let checked = false;
          if (atividade.id === atividadeState) checked = true;
          atividadesComponents.push(
            <BotaoAtividade
              key= {atividade.id}
              descricao={atividade.titulo}
              valor={atividade.id}
              checked={checked}
              funcao={this.mudaAtividade}
            />
          )
        });
      } else {
        atividadesComponents.push(
          <p className="ajudaSecao">
            Não possuimos atividades relacionadas a esse assunto por enquanto,
            selecione outro assunto para continuar.
          </p>
        )
      }
    } else {
      atividadesComponents.push(
        <p className="ajudaSecao"> Necessário selecionar um assunto</p>
      )
    }
    return atividadesComponents;
  }

  iniciarAtividade = async () => {
    const {atividade, entradaSaidaIds, salaId} = this.state;


    const values = {
      atividade,
      entradaSaidaIds,
      salaId
    };

    await api
    .post(`/atividade/cadastrar`, values)
    .then(response => response.data)
    .then(results => {
      this.setState({
        salaIdDash: results.sala_id
      })
      console.log(results)
    });
  }

  renderRedirect = () => {
    const { salaIdDash } = this.state;
    if (salaIdDash !== null) {
      return (
        <Redirect
          to={{
            pathname: "/dashboard",
            state: { salaId: salaIdDash }
          }}
        />
      )
    }
  }

  gerarDetalhesAtividade = (entradas, saidas, descricao, modalShow) => (
    <div>
      <div className="secaoAtividade">
        <h5 className="tituloSecao">Descrição da atividade:</h5>
        <p style={{ color: "#47525E" }}>
          {descricao}
        </p>
        <Button
          variant="outline-success"
          onClick={() => this.setState({ modalShow: !modalShow})}
        >
          Adicionar entradas e saídas
        </Button>
      </div>
      <div className="scrollSecaoAtividade">
        <div className="secaoAtividade">
          <h5 className="tituloSecao">Entradas:</h5>
          <div className="checkButtonGroup">
            {this.gerarEntradasSaidas(entradas)}
          </div>
        </div>
        <div className="secaoAtividade">
          <h5 className="tituloSecao">Saidas:</h5>
          <div className="checkButtonGroup">
            {this.gerarEntradasSaidas(saidas)}
          </div>
        </div>
      </div>
      <InitButton tituloBtn={"Iniciar Atividade"} funcao={this.iniciarAtividade}/>
    </div>
  );

	render(){
    const { 
      atividade,
      assuntos,
      atividades,
      entradas,
      saidas,
      modalShow
    } = this.state;

    let descricaoAtividade = 'Atividade sem descrição';

    if (atividade) {
      descricaoAtividade = atividades.filter((at) => {
        return at.id === atividade
      })[0].descri
    }

		return(
			<div>
        {this.renderRedirect()}
				<Navb nomePagina='Criar Atividade' principal={false}/>
        <Container style={{ marginTop: 30 }}>
          <Row>
            <Col>
              <div className="secaoAtividade">
                <h5 className="tituloSecao">Escolha um assunto:</h5>
                <div className="checkButtonGroup">
                  {this.gerarAssuntos(assuntos)}
                </div>
              </div>
              <div className="secaoAtividade">
                <h5 className="tituloSecao">Escolha uma atividade:</h5>
                <div className="checkButtonGroup">
                  {this.gerarAtividades(atividades)}
                </div>
              </div>
            </Col>
            <Col className="segundaParte">
              {(atividade)
               ? this.gerarDetalhesAtividade(entradas, saidas, descricaoAtividade, modalShow)
               : null
              }
            </Col>
          </Row>
        </Container>
        <AddEntradasSaidas
					show={modalShow}
          onHide={() => this.setState({ modalShow: !modalShow})}
          atividade={atividade}
          atividades={atividades}
          submit={this.adicionarEntraSaid}
        />
			</div> 
		)
	}

}
export default CriarAtividade