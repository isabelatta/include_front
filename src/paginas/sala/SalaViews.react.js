import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

import '../sala/sala.css'

import CardDeck from 'react-bootstrap/CardDeck'
import Card from 'react-bootstrap/Card'

import Navb from '../componentes/Nav.react'






 class SalaView extends Component {
    constructor() {
				super();
				document.body.style.overflowY = "auto";
				document.body.style.overflowX = "hidden";
      }

    styleCard = {
          height: "120",
          textAlign: "center",
          fontSize: "32",
          backgroundColor:"eedefe"
      }


    salasAbertas = (salas) => {
				const cards = [];
				salas.forEach(sala => {
					cards.push(
						<Card className= "styleCard">
							<Card.Header className = "styleCardHeader" style={{ backgroundColor: sala.cor }}>
								{sala.nome}
							</Card.Header>
							<Card.Body className="styleCardBody">
								<Card.Title className="styleTitle"> Card title</Card.Title>
								<Card.Text className = "styleData">
										dd/mm/aaaa
								</Card.Text>
								<Card.Text className = "styleBody">
										This is a wider card with supporting text below as a natural lead-in to
										additional content. This card has even longer content than the first to
										show that equal height action.
								</Card.Text>
							</Card.Body>
						</Card>
					)
				});
        return cards
    }

    salasFechadas = (salas) => {
        const cards = [];
					salas.forEach(sala => {
            cards.push(
                <Card className= "styleCard">
                <Card.Header className = "styleCardHeader" style={{ backgroundColor: sala.cor }}>
								 {sala.nome}
								</Card.Header>
                <Card.Body className="styleCardBody">
                <Card.Title className="styleTitle">Card title</Card.Title>
								<Card.Text className = "styleData">
											dd/mm/aaaa
								</Card.Text>
                <Card.Text className = "styleBody">
                    This is a wider card with supporting text below as a natural lead-in to
                    additional content. This card has even longer content than the first to
                    show that equal height action.
                </Card.Text>
                </Card.Body>
            </Card>
            )
            
				})
        return cards
    }


      render(){
				const salas = [
					{
						nome: "Assunto 1",
						cor: "#77D353"
					},
					{
						nome: "Assunto 2",
						cor: "#976DD0"
					},
					{
						nome: "Assunto 3",
						cor: "#FF9052"
					},
				]
				return(
						<div>
							<Navb/>
								<div>
									<h1 className="styleText">Salas Abertas</h1>
									<CardDeck className="styleDeckAberto">
											{this.salasAbertas(salas)}
									</CardDeck>
								</div>
								<div>
								<h1 className="styleText">Salas Fechadas</h1>
									<CardDeck className="styleDeckFechado">
											{this.salasFechadas(salas)}
									</CardDeck>
								</div>
						</div> 
				)
      }  

}
export default SalaView