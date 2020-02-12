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
import { IoMdStar} from "react-icons/io";




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
      correcao: [true, true, true, true],
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
          console.log(results)
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
    const { entradasSaidas, correcao: correcaoState } = this.state
    let correcao = [];
    
    if (correcaoState.length === 0) {
      entradasSaidas.forEach((s,i) => {
        correcao[i] = false
      })
    } else {
      correcao = correcaoState;
    }
    
    if(code) {

      entradasSaidas.forEach((eS, index) => {
        let valid = true;
        let saida = eS.saida;
  
        console.log(code)
        console.log(eS)
  
        const stringTeste = code.toString();
        saida = saida.replace(/\s/g, "").toLowerCase();
        const resultado = stringTeste.replace(/\s/g, "").toLowerCase();
        Array.from(saida).forEach((element, index) => {
          if (element !== resultado[index]) {
            valid = false;
            console.log("entrei")
          }
        });
        
        if (valid) {
          correcao[index] = true;
        }
        
        console.log(correcao)
        
  
      });

    }
    
    

    console.log(correcao)
    this.setState({
      correcao
    })

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
    const {correcao} = this.state
    const entradas = [];
    let cor = 0;
    
    entradasSaidas.forEach((eS, index) => {
      const corBotao = coresEntradasSaidas[cor];
      entradas.push(
        <div style={{ display: 'flex', flexDirection: 'row' }}>
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
          {(correcao[index])
            ? <IoMdStar style={{ fontSize: 40, alignSelf: 'flex-end', padding: 2, color: "#FF9052" }}/>
            : null
          } 
        </div>
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
    const { readOnly} = this.props.location.state;

    const {
      nomeEquipe,
      infoSala,
      entradasSaidas,
      showModalNomeEquipe,
      correcao
    } = this.state;

    let showBtn = false
    let verdadeiro = 0
      
    for(let i=0; i<correcao.length; i++){
        if(correcao[i] == true) verdadeiro++
        if(verdadeiro == correcao.length) showBtn = true
    }

    return (
      <div>
      <ModalEquipe
        show={showModalNomeEquipe}
        func={this.salvarNomeEquipe}
      />
      {(readOnly && infoSala) 
      ?
      ( <Navb 
          nomePagina={(infoSala) ? infoSala.nome : "Sala sem nome"} 
          equipe={nomeEquipe} 
          principal={false} 
          aluno={false}
          fechada = {infoSala.aberta}
          salaId = {infoSala.sala_id}
          professor = {true}
      /> )
      :
      ( <Navb 
          nomePagina={(infoSala) ? infoSala.nome : "Sala sem nome"} 
          equipe={nomeEquipe} 
          principal={false} 
          aluno={true}
        /> )
      }
      
        {(infoSala)
          ? (
            <div>
              <div className="primeiraRow">
                <Row>
                  <Col xs={6}>
                    {this.renderDescricaoAtiv(infoSala)}
                  </Col>
                  <Col xs={6}>
                    <div style={{ maxHeight: '62%', overflow: 'auto' }}> 
                      <h3 className="tituloAtividade">
                        Entradas
                      </h3>
                      {this.renderEntradas(entradasSaidas)}
                    </div>
                    {
                      (showBtn) 

                      ? <InitButton tituloBtn="Finalizar Atividade" funcao={this.finalizarAtiv} />

                      : null
                    }
                    
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