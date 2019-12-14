import React, { Component } from 'react';
import 'react-alice-carousel/lib/alice-carousel.css';


import Button from 'react-bootstrap/Button';


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
      checked,
    } = this.props;

    let variantName = 'outline-secondary';
    if (checked) variantName = 'outline-success';

		return(
      <Button
        variant={variantName}
        className="checkButton"
        onClick={() => this.clickButton(valor)}
        style={{ padding: 10, borderWidth: 2 }}
      >
        {descricao}
      </Button>
		)
	}

}
export default CheckButtom