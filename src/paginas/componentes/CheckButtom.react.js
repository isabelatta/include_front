import React, { Component } from 'react';
import 'react-alice-carousel/lib/alice-carousel.css';

import './checkButton.css';


import Button from 'react-bootstrap/Button';
import { FaCircle, FaCheckCircle } from "react-icons/fa";


 class CheckButtom extends Component {
	constructor() {
    super();
    this.state = {
      checked: false,
    }
	}
  
  clickButton = (valor) => {
    const { funcao } = this.props;
    funcao(valor)
  }


	render(){
    const {
      valor,
      descricao,
      cor,
      checked,
    } = this.props;

    let corButton = '#BEBEBE';
    if (checked) corButton = cor;

		return(
      <Button
        variant="primary"
        className="checkButton"
        style={{
          backgroundColor: corButton,
          borderColor: corButton,
        }}
        onClick={() => this.clickButton(valor)}
      >
        <span className="textCheckButton">{descricao}</span>
        {(checked) 
         ? (<FaCheckCircle className="iconCheckButton"/>)
         : (<FaCircle className="iconCheckButton"/>)
        }
      </Button>
		)
	}

}
export default CheckButtom