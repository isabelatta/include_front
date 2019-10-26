import React, { Component } from 'react';

class BgLogin extends Component {
    
    constructor() {
        super();
      }

      styleYellow = {
        position: 'absolute', 
        bottom: '-35%', 
        right: '-48%',
        
      }

      styleRed = {
        position: 'absolute',
        transform: 'rotate(180deg)',
        top: '-50%',
        left: '-54%'
      }

      styleBlue = {
        position: 'absolute', 
        bottom: '-57%', 
        left: '26%',
        transform: 'rotate(123deg)',
      }
      render() {
        return (
          <div>
            <div>
                <svg
                    width="100%"
                    height="130%"
                    viewBox="0 0 600 600"
                    xmlns="http://www.w3.org/2000/svg"
                    style={this.styleRed}
                    >
                    <g transform="translate(300,300)">
                        <path d="M105.4,-118.4C149,-88.9,205.5,-67.6,212,-36.5C218.5,-5.5,175.1,35.3,145.3,81.2C115.6,127.1,99.5,178.2,64.9,200.3C30.3,222.4,-22.8,215.5,-77.3,200.7C-131.7,185.9,-187.5,163.2,-198.7,124.2C-209.8,85.3,-176.3,30,-140.4,1.1C-104.4,-27.8,-66,-30.4,-42.2,-63.3C-18.4,-96.3,-9.2,-159.6,10.8,-172.5C30.9,-185.4,61.7,-147.9,105.4,-118.4Z" fill="#f95f62" />
                    </g>
                </svg>
            </div>
            <div>
                <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 600 600"
                    xmlns="http://www.w3.org/2000/svg"
                    style={this.styleBlue}
                    >
                    <g transform="translate(300,300)">
                        <path d="M91.1,-143.4C108.5,-112.7,106.6,-73.4,134.8,-32.9C162.9,7.6,221.3,49.2,231.5,92.9C241.7,136.6,203.7,182.4,157.1,216.6C110.5,250.8,55.3,273.4,18.8,247.5C-17.6,221.6,-35.3,147.2,-70.9,109.5C-106.6,71.7,-160.3,70.6,-194.3,44.6C-228.3,18.5,-242.5,-32.4,-220.3,-62.5C-198,-92.6,-139.3,-101.7,-96.5,-124.1C-53.7,-146.6,-26.8,-182.3,5,-189.2C36.8,-196,73.7,-174.1,91.1,-143.4Z" fill="#00a6ff" />
                    </g>
                </svg>
            </div>
            <div>
                <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 600 600"
                    xmlns="http://www.w3.org/2000/svg"
                    style={this.styleYellow}
                    >
                    <g transform="translate(300,300)">
                        <path d="M105.4,-118.4C149,-88.9,205.5,-67.6,212,-36.5C218.5,-5.5,175.1,35.3,145.3,81.2C115.6,127.1,99.5,178.2,64.9,200.3C30.3,222.4,-22.8,215.5,-77.3,200.7C-131.7,185.9,-187.5,163.2,-198.7,124.2C-209.8,85.3,-176.3,30,-140.4,1.1C-104.4,-27.8,-66,-30.4,-42.2,-63.3C-18.4,-96.3,-9.2,-159.6,10.8,-172.5C30.9,-185.4,61.7,-147.9,105.4,-118.4Z" fill="#ffba5c" />
                    </g>
                </svg>
            </div>

          </div>
        );
      }
}

export default BgLogin