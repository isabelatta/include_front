import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { FaPlay } from "react-icons/fa";

import BlocklyComponent, { Block, Category, Value, Field, Shadow } from '../../componentes/Blockly';

import BlocklyJS from 'blockly/javascript';
import '../../../blocks/meusBlocos'
import '../../../generator/generator';


class BlocklyAluno extends Component {

  generateCode = () => {
    var code = BlocklyJS.workspaceToCode(this.simpleWorkspace.workspace);
    // alert(code);
    eval(code);
    console.log(code);
  }

  render() {
    return (
      <div>
        <BlocklyComponent ref={e => this.simpleWorkspace = e} readOnly={false} move={{
              scrollbars: true,
              drag: true,
              wheel: true
            }} initialXml={`
              <xml xmlns="http://www.w3.org/1999/xhtml">
              
              </xml>
        `}>
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