import React, { Component } from 'react';
import 'react-alice-carousel/lib/alice-carousel.css';
import api from "../../uteis/api";
import sweetAlertWarn from '../../uteis/sweetAlert';



import { Container, Row, Col, Button } from 'react-bootstrap';
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

      // await api
		  // .get(`dashboard/listarEquipes/${salaId}` )
		  // .then(response => response.data)
		  // .then(results => {
			// 	if (results) {
      //     console.log(results)
			// 		this.setState({
			// 			equipes: results,
			// 		});
			// 	}
      // });
      
    // window.onbeforeunload = function(res) {
    //   return "";
    // }.bind(this);
    // window.onunload = function(){
    //   const { salaId } = this.state;
    //   api.get(`atividade/desfazerAtividade/${salaId}`);
    // };
  };
  
  // mudaAssunto = async (valor) => {
  //   const {entradaSaidaIds} = this.state;
    
  //   let checkClick = true;
  //   if (entradaSaidaIds.length > 0) {
  //     checkClick = await sweetAlertWarn(
  //       "Deseja realizar esta ação?",
  //       "Ao continuar todas as modificações da atividade serão perdidas"
  //     );
  //   }

  //   if (checkClick) {
  //     this.setState({
  //       assunto: valor,
  //       atividade: null,
  //       entradaSaidaIds: [],
  //     });

  //     await api
  //     .get(`atividade/listarAtividades/${valor}` )
  //     .then(response => response.data)
  //     .then(results => {
  //       if (results) {
  //         console.log(results)
  //         this.setState({
  //           atividades: results,
  //         });
  //       }
  //     });
  //   }  
  // }

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

  // mudaAtividade = async (valor) => {
  //   const { entradaSaidaIds, salaId } = this.state;
  //   let checkClick = true;
  //   if (entradaSaidaIds.length > 0) {
  //     checkClick = await sweetAlertWarn(
  //       "Deseja realizar esta ação?",
  //       "Ao continuar todas as modificações da atividade serão perdidas"
  //     );
  //   }

  //   if (checkClick) {
  //     this.setState({ atividade: valor });

  //     await this.listarEntradasSaidas(valor, salaId);
  //   }

  // }

  // listarEntradasSaidas = async (atividade, sala) => {
  //   console.log("entrou");
  //   await api
  //   .get(`atividade/listarEntradasSaidas/${atividade}/${sala}` )
  //   .then(response => response.data)
  //   .then(results => {
  //     if (results) {
  //       console.log(results)
  //       const entradas = []
  //       const saidas = []
  //       const entradaSaidaIds = []
  //       if(results.length > 0) {
  //         results.forEach((r) => {
  //           entradas.push({
  //             id: r.id,
  //             descri: r.entrada,
  //           });
  //           saidas.push({
  //             id: r.id,
  //             descri: r.saida,
  //           });
  //           entradaSaidaIds.push(r.id);
  //         })
  //       }
  //       this.setState({
  //         entradas,
  //         saidas,
  //         entradaSaidaIds
  //       });
  //     }
  //   });
  // }

  // mudaEntradaSaida = (valor) => {
  //   console.log(valor);
  //   const { entradaSaidaIds } = this.state;
  //   if(entradaSaidaIds.includes(valor)){
  //     const index = entradaSaidaIds.indexOf(valor);
  //     entradaSaidaIds.splice(index, 1)
  //   } else {
  //     entradaSaidaIds.push(valor)
  //   }

  //   this.setState({ entradaSaidaIds })
  // }

  // adicionarEntraSaid = async (entrada, saida) => {
  //   const {
  //     atividade,
  //     salaId,
  //     entradas,
  //     saidas,
  //     entradaSaidaIds,
  //   } = this.state;
  //   const values = {
  //     entrada,
  //     saida,
  //     atividade,
  //     sala: salaId
  //   }
  //   this.setState({
  //     modalShow: false,
  //   })

  //   await api
  //   .post(`/atividade/cadastrarEntradaSaida`, values)
  //   .then(response => response.data)
  //   .then(response => {
  //       const { id, entrada, saida } = response; 
  //       entradaSaidaIds.push(id)
  //       entradas.push({
  //         id,
  //         descri: entrada,
  //       });
  //       saidas.push({
  //         id,
  //         descri: saida,
  //       });
  //       this.setState({
  //         entradas,
  //         saidas,
  //         entradaSaidaIds
  //       });
  //   });

  // }

  // gerarAssuntos = (assuntos) => {
  //   const { assunto: assuntoState } = this.state;
  //   const assuntosComponents = [];
  //   assuntos.forEach((assunto) => {
  //     let checked = false;
  //     if (assunto.id === assuntoState) checked = true;
  //     assuntosComponents.push(
  //       <CheckButtom
  //         key= {assunto.id}
  //         descricao={assunto.descri}
  //         valor={assunto.id}
  //         cor={assunto.cor}
  //         checked={checked}
  //         funcao={this.mudaAssunto}
  //       />
  //     )
  //   });
  //   return assuntosComponents;
  // }

 


  // gerarAtividades = (atividades) => {
  //   const { atividade: atividadeState, assunto } = this.state;
  //   const atividadesComponents = [];
  //   if (assunto) {
  //     if(atividades.length > 0) {
  //       atividades.forEach((atividade) => {
  //         let checked = false;
  //         if (atividade.id === atividadeState) checked = true;
  //         atividadesComponents.push(
  //           <BotaoAtividade
  //             key= {atividade.id}
  //             descricao={atividade.titulo}
  //             valor={atividade.id}
  //             checked={checked}
  //             funcao={this.mudaAtividade}
  //           />
  //         )
  //       });
  //     } else {
  //       atividadesComponents.push(
  //         <p className="ajudaSecao">
  //           Não possuimos atividades relacionadas a esse assunto por enquanto,
  //           selecione outro assunto para continuar.
  //         </p>
  //       )
  //     }
  //   } else {
  //     atividadesComponents.push(
  //       <p className="ajudaSecao"> Necessário selecionar um assunto</p>
  //     )
  //   }
  //   return atividadesComponents;
  // }

  // iniciarAtividade = async () => {
  //   const {atividade, entradaSaidaIds, salaId} = this.state;


  //   const values = {
  //     atividade,
  //     entradaSaidaIds,
  //     salaId
  //   };

  //   await api
  //   .post(`/atividade/cadastrar`, values)
  //   .then(response => response.data)
  //   .then(results => {
  //   });

  //   console.log(values)
  // }

  // gerarDetalhesAtividade = (entradas, saidas, descricao, modalShow) => (
  //   <div>
  //     <div className="secaoAtividade">
  //       <h5 className="tituloSecao">Descrição da atividade:</h5>
  //       <p style={{ color: "#47525E" }}>
  //         {descricao}
  //       </p>
  //       <Button
  //         variant="outline-success"
  //         onClick={() => this.setState({ modalShow: !modalShow})}
  //       >
  //         Adicionar entradas e saídas
  //       </Button>
  //     </div>
  //     <div className="scrollSecaoAtividade">
  //       <div className="secaoAtividade">
  //         <h5 className="tituloSecao">Entradas:</h5>
  //         <div className="checkButtonGroup">
  //           {this.gerarEntradasSaidas(entradas)}
  //         </div>
  //       </div>
  //       <div className="secaoAtividade">
  //         <h5 className="tituloSecao">Saidas:</h5>
  //         <div className="checkButtonGroup">
  //           {this.gerarEntradasSaidas(saidas)}
  //         </div>
  //       </div>
  //     </div>
  //     <InitButton funcao={this.iniciarAtividade}/>
  //   </div>
  // );

	render() {
    const {assunto} = this.state

		return(
			<div>
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
          <Col> oioi  </Col>
          </Row>
        </div>

        
        
       
				
			</div> 
    );

	}
}

export default Dashboard