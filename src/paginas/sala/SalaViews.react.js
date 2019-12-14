import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import 'react-alice-carousel/lib/alice-carousel.css';
import api from "../../uteis/api";
import moment from "moment";

import '../sala/sala.css';

import CardDeck from 'react-bootstrap/CardDeck';
import Card from 'react-bootstrap/Card';


import Navb from '../componentes/Nav.react';
import Carrousel from './componentes/Carrousel.react';


const color = [
	{
		id: 1,
		cor: "#F95F62"
	},
	{
		id: 2,
		cor: "#00A6FF"
	},
	{
		id: 3,
		cor: "#FF9052"
	},
];


 class SalaView extends Component {
	constructor() {
		super();
		document.body.style.overflowY = "auto";
		document.body.style.overflowX = "hidden";
		this.state = {
			salasAbertas: [],
			salasFechadas: [],
			};
	}
	  
	componentDidMount = async () => {
		const {salas} = this.state;
		const id =  await localStorage.getItem("id");
		await api
		  .get(`sala/listar/${id}` )
		  .then(response => response.data)
		  .then(results => {
				if (results) {
					const salasAbertas = results.filter((sala) => sala.aberta === 1);
					const salasFechadas = results.filter((sala) => sala.aberta === 0);
					this.setState({
						salasAbertas,
						salasFechadas,
					});
				}
		  });

		};
	


	salasAbertas = (salas) => {
		const cards = [];
		salas.forEach(sala => {
			let dataCriacao = moment(sala.data).format("DD/MM/YYYY")
			cards.push(
				<Card className= "styleCard">
					<Card.Header className = "styleCardHeader" style={{ backgroundColor: color[1].cor }}>
						Assunto 1
					</Card.Header>
					<Card.Body className="styleCardBody">
						<Card.Title className="styleTitle"> {sala.nome}</Card.Title>
						<Card.Text className = "styleData">
								{dataCriacao}
						</Card.Text>
						<Card.Text className = "styleBody">
							{sala.descri}
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
				let dataCriacao = moment(sala.data).format("DD/MM/YYYY")
				cards.push(
					<Card className= "styleCard">
							<Card.Header className = "styleCardHeader" style={{ backgroundColor: "#77D353" }}>
							Assunto 2
							</Card.Header>
							<Card.Body className="styleCardBody">
								<Card.Title className="styleTitle">{sala.nome}</Card.Title>
								<Card.Text className = "styleData">
									{dataCriacao}
								</Card.Text>
								<Card.Text className = "styleBody">
									{sala.descri}
								</Card.Text>
						</Card.Body>
					</Card>
				)
		})
		return cards
	}

	slideNext = () => this.setState({ currentIndex: this.state.currentIndex + 1 })

	slidePrev = () => this.setState({ currentIndex: this.state.currentIndex - 1 })


	render(){
		const { salasAbertas, salasFechadas } = this.state;
		return(
			<div>
				<Navb principal={true}/>
					<div>
						<h1 className="styleText">Salas Abertas</h1>
						{(salasAbertas.length > 0)
							? (
								<Carrousel
									salas={this.salasAbertas(salasAbertas)}
								/>
							) : null
						}
					</div>
					<div>
						<h1 className="styleText" style={{paddingTop: 0}}>Salas Fechadas</h1>
						{(salasFechadas.length > 0)
							? (
								<Carrousel
									salas={this.salasFechadas(salasFechadas)}
								/>
							) : null
						}
					</div>
			</div> 
		)
	}

}
export default SalaView