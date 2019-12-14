import React, { Component } from 'react';
import 'react-alice-carousel/lib/alice-carousel.css';

import './atividade.css';


import { Container, Row, Col, Button } from 'react-bootstrap';
import Navb from '../componentes/Nav.react';
import CheckButtom from '../componentes/CheckButtom.react';
import BotaoAtividade from '../componentes/BotaoAtividade.react';


const coresEntradasSaidas = [
  '#F95F62',
  '#FFBA5C',
  '#00A6FF'
];


class CriarAtividade extends Component {
	constructor() {
    super();
    this.state = {
      assunto: null,
      atividade: null,
    }
	}
	  
	componentDidMount = () => {

  };
  
  mudaAssunto = (valor) => {
    console.log(valor);
    this.setState({ assunto: valor })
  }

  mudaAtividade = (valor) => this.setState({ atividade: valor})

  gerarAssuntos = (assuntos) => {
    const { assunto: assuntoState } = this.state;
    const assuntosComponents = [];
    assuntos.forEach((assunto) => {
      let checked = false;
      if (assunto.valor === assuntoState) checked = true;
      assuntosComponents.push(
        <CheckButtom
          key= {assunto.id}
          descricao={assunto.descricao}
          valor={assunto.valor}
          cor={assunto.cor}
          checked={checked}
          funcao={this.mudaAssunto}
        />
      )
    });
    return assuntosComponents;
  }

  gerarEntradasSaidas = (entradasSaidas) => {
    const { atividade } = this.state;
    const entradasSaidasComponents = [];
    let cor = 0;
    if (atividade) {
      entradasSaidas.forEach((eS) => {
        entradasSaidasComponents.push(
          <div
            className="listEntradasSaidas"
            style={{
              backgroundColor: coresEntradasSaidas[cor],
              borderColor: coresEntradasSaidas[cor],
            }}
          >
            {eS.descricao}
          </div>
        )
        cor++;
        if (cor === 3) cor = 0;
      });
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
      atividades.forEach((atividade) => {
        let checked = false;
        if (atividade.valor === atividadeState) checked = true;
        atividadesComponents.push(
          <BotaoAtividade
            key= {atividade.id}
            descricao={atividade.descricao}
            valor={atividade.valor}
            checked={checked}
            funcao={this.mudaAtividade}
          />
        )
      });
    } else {
      atividadesComponents.push(
        <p className="ajudaSecao"> Necessário selecionar um assunto</p>
      )
    }
    return atividadesComponents;
  }

  gerarDetalhesAtividade = (entradas, saidas) => (
    <div>
      <div className="secaoAtividade">
        <h5 className="tituloSecao">Descrição da atividade:</h5>
        <p style={{ color: "#47525E" }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit . Mauris consectetur a magna quis sagittis. Quisque vitae viverra ax + b = 0 augue, ut pulvinar nisl. Donec nec urna auctor, mollis orci sed, consequat velit
        </p>
      </div>
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
  )


	render(){
    const { atividade } = this.state;
    const assuntos = [
      {
        id: 1,
        descricao: 'Equacao de 1 grau',
        valor: 'Equacao de 1 grau',
        cor: "#976DD0",
      },
      {
        id: 2,
        descricao: 'Equacao de 2 grau',
        valor: 'Equacao de 2 grau',
        cor: "#F95F62",
      },{
        id: 3,
        descricao: 'Equacao de 3 grau',
        valor: 'Equacao de 3 grau',
        cor: "#00A6FF",
      }
    ];

    const atividades = [
      {
        id: 1,
        descricao: "ax + b = 0",
        valor: "ax + b = 0",
      },
      {
        id: 1,
        descricao: "a2x + b = 0",
        valor: "a2x + b = 0",
      },
    ];

    const entradas = [
      {
        id: 1,
        descricao: 'a = 5; b = 10',
      },
      {
        id: 2,
        descricao: 'a = y; b = y',
      },
      {
        id: 3,
        descricao: 'a = z; b = z',
      },
    ];

    const saidas = [
      {
        id: 1,
        descricao: 'x = -2',
      },
      {
        id: 2,
        descricao: 'x = k',
      },
      {
        id: 3,
        descricao: 'x = w',
      }
    ]

		return(
			<div>
				<Navb nomePagina='Criar Atividade' principal={false}/>
        <Container style={{ marginTop: 50 }}>
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
               ? this.gerarDetalhesAtividade(entradas, saidas)
               : null
              }
            </Col>
          </Row>
        </Container>
			</div> 
		)
	}

}
export default CriarAtividade