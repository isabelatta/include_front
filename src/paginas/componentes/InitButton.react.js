import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import { FaCheck } from "react-icons/fa";


class InitButton extends Component {

  constructor() {
    super();
  }

  divStyle = {
    backgroundColor: '#77d353',
    borderColor: '#77d353',
    color: 'white',
    fontFamily: 'Arial',
    fontWeight: 'Bolder',
  };

  iconStyle = {
    fontSize: 25,
    marginLeft: 20,
  }

  divSuperStyle = {
    marginTop: 40,
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
  }


  render(){
    const { funcao } = this.props;
    return (
      <div style={this.divSuperStyle}>
        <Button
          style={this.divStyle}
          variant="primary"
          size="lg"
          onClick={funcao}
        >
          Iniciar Atividade
          <FaCheck style={this.iconStyle}/>
        </Button>
      </div>
      
    );
  }
}

export default InitButton