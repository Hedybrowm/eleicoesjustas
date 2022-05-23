import React from 'react'; 
import {Link} from "react-router-dom";
import PieMenu, { Slice } from 'react-pie-menu';

export default class Menu extends React.Component{

	constructor(props) {
		super(props);
		
		this.state = {
			//TODO: Use media query instead of the following logic.
			pieSize: ((this.getWindowDimensions(window.innerHeight, window.innerWidth)/ 2)*0.80).toString() + 'px',
			pieTextSize: this.getTextDimensions(window.innerHeight, window.innerWidth),
		};
	}	

	getWindowDimensions = (height, width) => {
		if (height > width)
			return width;
		else	
			return height;
	}	

	getTextDimensions = (height, width) => {
		var smaller = 0;
		var result = 0;
		if (height < width)
			smaller = height;
		else	
			smaller = width;
		if (smaller > 850)
			result = "big";
		else if (smaller > 450)
			result = "medium";
		else
			result = "small";
		return result;
	}	

	updateDimensions = () => {
		this.setState ({pieSize: ((this.getWindowDimensions(window.innerHeight, window.innerWidth)/ 2)*0.80).toString() + 'px',
			pieTextSize: this.getTextDimensions(window.innerHeight, window.innerWidth)
		});
	}

	componentDidMount() {
		window.addEventListener("resize", this.updateDimensions);
		// eslint-disable-next-line no-restricted-globals
		//alert (window.innerHeight)
	}

	render(){
		//const {items, center} = this.props //Using these global variables in the current component
		return (
			<div>
                <div align = "center">
                    <div  className="row">
                        <div  className="main_div col-lg-12 col-md-12 col-sm-12">  
                            {
                            /*
                            TODO: Test other kind of menus
                            <RadialMenu
                            items={items}
                            center={center}
                            />
                            */
                            }
                            <h3>Contagens por Partido</h3>
                            <PieMenu
                                radius= {this.state.pieSize}
                                centerRadius='1px'
                            > 
                            {/*centerX={100}*/}
                            {/*centerY={100}*/}
                                {/* Contents eg., window.open('https://www.facebook.com', '_blank')*/}
                                <Link to={{pathname: "/principal", state: { from: "Sociedade Civil" }, }}>
                                    <Slice>
                                        <h6 className={this.state.pieTextSize}>Sociedade</h6>
                                        <h6 className={this.state.pieTextSize}>Civil</h6>
                                    </Slice>
                                </Link>
                                <Link to={{pathname: "/principal", state: { from: "APN" }, }}>
                                    <Slice>
                                        <h6 className={this.state.pieTextSize}>APN</h6>
                                    </Slice>
                                </Link>
                                <Link to={{pathname: "/principal", state: { from: "CASA-CE" }, }}>
                                    <Slice>
                                        <h6 className={this.state.pieTextSize}>CASA-CE</h6>
                                    </Slice>
                                </Link>
                                <Link to={{pathname: "/principal", state: { from: "FNLA" }, }}>
                                    <Slice>
                                        <h6 className={this.state.pieTextSize}>FNLA</h6>
                                    </Slice>
                                </Link>
                                <Link to={{pathname: "/principal", state: { from: "MPLA" }, }}>
                                    <Slice>
                                        <h6 className={this.state.pieTextSize}>MPLA</h6>
                                    </Slice>
                                </Link>
                                <Link to={{pathname: "/principal", state: { from: "PRS" }, }}>
                                    <Slice>
                                        <h6 className={this.state.pieTextSize}>PRS </h6>
                                    </Slice>
                                </Link>
                                <Link to={{pathname: "/principal", state: { from: "UNITA" }, }}>
                                    <Slice>
                                        <h6 className={this.state.pieTextSize}>UNITA </h6>
                                    </Slice>
                                </Link>
                            </PieMenu>
                        </div>
                    </div>
                </div>
			</div>
		);
	}	
}

//export default Menu;
