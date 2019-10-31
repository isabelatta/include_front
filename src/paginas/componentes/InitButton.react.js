import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'


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


   render(){
        return (
          <div>
            <Button style={this.divStyle} variant="primary" size="lg">Iniciar Atividade</Button>
            <div></div>
          </div>
          
        );
      }
}

export default InitButton