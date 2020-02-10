import React, { Component } from 'react';
import 'react-alice-carousel/lib/alice-carousel.css';
import api from "../../uteis/api";
import moment from "moment";
import {Redirect} from 'react-router-dom'

import '../sala/sala.css';

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
			salaIdRedirect: null,
		};
	}
	  
	componentDidMount = async () => {
		const { salas } = this.state;
		const id =  await localStorage.getItem("id");
		await api
		  .get(`sala/listar/${id}` )
		  .then(response => response.data)
		  .then(results => {
				if (results) {
					if (results.length > 0) {
						const salasAbertas = results.filter((sala) => sala.aberta === 1);
						const salasFechadas = results.filter((sala) => sala.aberta === 0);
						console.log(salasAbertas)
						this.setState({
							salasAbertas,
							salasFechadas,
						});
					}
				}
		  });

		};
	

º
	salasAbertas = (salas) => {
		const cards = [];
		salas.forEach(sala => {
			let dataCriacao = moment(sala.data).format("DD/MM/YYYY")
			cards.push(
				<Card className= "styleCard" onClick={() => this.setState({salaIdRedirect: sala.id})}>
					<Card.Header className = "styleCardHeader" style={{ backgroundColor: sala.cor }}>
						{sala.assunDesc}
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
					<Card
						className= "styleCard"
						onClick={() => this.setState({salaIdRedirectSalaFechada: sala.id})}
					>
							<Card.Header className = "styleCardHeader" style={{ backgroundColor: "#77D353" }}>
								{sala.assunDesc}
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


	renderRedirect = () => {
    const { salaIdRedirect } = this.state

    if (salaIdRedirect) {
      return (
        <Redirect
          to={{
            pathname: "/editarAtividade",
            state: {
							salaId: salaIdRedirect,
							edit: true,
            }
          }}
        />
      )
    }
	}

	renderRedirectSalaFechada = () => {
    const { salaIdRedirectSalaFechada } = this.state

    if (salaIdRedirectSalaFechada) {
      return (
        <Redirect
          to={{
            pathname: "/dashboard",
            state: {
							salaId: salaIdRedirectSalaFechada,
							fechada: true,
            }
          }}
        />
      )
    }
	}
	
	render(){
		const { salasAbertas, salasFechadas } = this.state;
		return(
			<div>
				{this.renderRedirect()}
				{this.renderRedirectSalaFechada()}
				<Navb principal={true}/>
				<div>
					<h1 className="styleText">Salas Abertas</h1>
					{(salasAbertas.length > 0)
						? (
							<Carrousel
								salas={this.salasAbertas(salasAbertas)}
							/>
						) : (
							<div className="divSemSalas">
								<h4>
									Sem salas abertas no momento
								</h4>
								<p>
									Clique em
									<b> Criar Sala </b>
									no topo da página para criar uma nova
									sala.
								</p>
							</div>
						)
					}
				</div>
				<div>
					<h1 className="styleText" style={{paddingTop: 0}}>Salas Fechadas</h1>
					{(salasFechadas.length > 0)
						? (
							<Carrousel
								salas={this.salasFechadas(salasFechadas)}
							/>
						) : (
							<div className="divSemSalas">
								<h4>
									Sem salas fechadas no momento
								</h4>
							</div>
						)
					}
				</div>
			</div> 
		)
	}

}
export default SalaView