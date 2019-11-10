import React, { Component } from 'react';

import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import AliceCarousel from 'react-alice-carousel';

import '../../sala/sala.css';

const responsiveCarousel = {
	1024: { items: 3 },
	620: { items: 2 },
	0: { items: 1 },
}

class Carrousel extends Component {
    constructor() {
        super();    
    }

    render(){
				const prof = "Professor " + localStorage.getItem("nome");
				const { salas } = this.props;
				
        return(
            <div>
							<div className="buttonsCarrousel">
								<IoIosArrowBack
									className="buttonLeft buttonCarrousel"
									onClick={() => this.Carousel.slidePrev()}
								/>
								<IoIosArrowForward
									className="buttonRight buttonCarrousel"
									onClick={() => this.Carousel.slideNext()}
								/>
							</div>
							<AliceCarousel
								items={salas}
								responsive={responsiveCarousel}
								infinite={true}
								buttonsDisabled={true}
								mouseDragEnabled={true}
								ref={(el) => (this.Carousel = el)}
							/>
            </div>
            
        )

    }

}

export default Carrousel