import React, { Component } from 'react';
import api from "../../../uteis/api";

import { Button } from 'react-bootstrap';
import { FaPlay } from "react-icons/fa";

import BlocklyComponent, { Block, Category, Value, Field, Shadow } from '../../componentes/Blockly';

import BlocklyJS from 'blockly/javascript';
import '../../../blocks/meusBlocos'
import '../../../generator/generator';


// const TIMESAVE = 60000;
const TIMESAVE = 10000;

class BlocklyAluno extends Component {

  constructor() {
    super();
    this.state = {
      xmlInicial: `
        <xml xmlns="http://www.w3.org/1999/xhtml">
                
        </xml>
      `
    };
    
  }

  componentDidMount = async () => {
    // const xmlText = localStorage.getItem("xml");
    // this.simpleWorkspace.setXml(xmlText);
    const { readOnly } = this.props;
    if (!readOnly) {
      this.countdown = setInterval(this.timer, TIMESAVE);
    }
    const equipe = localStorage.getItem('id_equipe');
    await api
    .get(`aluno/consultarCodigo/${equipe}` )
    .then(response => response.data)
    .then(results => {
      console.log(results)
      if (results && !results.errorMsg) {
        this.simpleWorkspace.setXml(results.codigo);
      }
    });

  }

  timer = async () => {
    const equipe = localStorage.getItem('id_equipe');
    const xmlText = this.simpleWorkspace.getXml();
    const codigoCriado = await localStorage.getItem('codigoCriado');

    console.log(xmlText);

    if (equipe && xmlText) {
      const values = {
        equipe_id: equipe,
        code: xmlText,
      }
      if (!codigoCriado) {
        await api
        .post(`/aluno/salvarCodigo`, values)
        .then(response => response.data)
        .then(results => {
          localStorage.setItem('codigoCriado', true);
        });
      } else {
        await api
        .put(`/aluno/editarCodigo`, values)
        .then(response => response.data)
        .then(results => {});
      }
    }
  }

  generateCode = () => {
    const xmlText = this.simpleWorkspace.getXml();
    var code = BlocklyJS.workspaceToCode(this.simpleWorkspace.workspace);
    eval(code);
    console.log(code);
  }

  

  render() {
    const { xmlInicial } = this.state;
    const { readOnly } = this.props;
    return (
      <div>
        <BlocklyComponent
          ref={e => this.simpleWorkspace = e}
          readOnly={ readOnly }
          move={{
            scrollbars: true,
            drag: true,
            wheel: true
          }}
          initialXml={xmlInicial}>
          <Category name="Matemática" colour="#f95f62">
            <Block type="math_number" />
            <Block type="math_arithmetic" />
          </Category>
          <Category name="Variável" colour="#FFBA5C">
            <Block type="variables_get" />
            <Block type="variables_set" />
          </Category>
          <Category name="Texto" colour="#00A6FF">
            <Block type="text" />
            <Block type="text_append" />
            <Block type="text_join" />
            <Block type="text_print" />
          </Category>
          <Category name="Lógica" colour="#976DD0">
            <Block type="controls_if" />
            <Block type="controls_ifelse" />
            <Block type="logic_compare" />
            <Block type="logic_operation" />
            <Block type="logic_boolean" />
            <Block type="logic_negate" />
            <Block type="logic_ternary" />
          </Category>
        </BlocklyComponent>
        <Button 
          style={{ position: 'absolute', right: 100, bottom: 30, backgroundColor: '#976DD0', borderColor: '#976DD0', fontSize: 25 }}
          onClick={this.generateCode}
        >
          Testar
          <FaPlay style={{ paddingLeft: 10 }}/>
        </Button>
      </div>
   );
  }
}

export default BlocklyAluno;