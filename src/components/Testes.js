/**
 * @api {JANELA} TESTES Testes
 * @apiName Testes
 * @apiGroup Testes
 *
 * @apiDescription Testes do sistema
 * - Uma instância dinâmica do Template
 */
import React from 'react';
import Template from './Template'; //A template of the Layout_Oficial
const Languages = require('./Idiomas.js'); //Importing the file containing all the strings for each language
//const auxiliaryFunctions = require ('./utils'); //Auxiliary functions
var currentLanguage = (window.navigator.language || window.navigator.userLanguage).toLowerCase(); //The choosen language which should be dynamic. This should be in lower case because some Browsers like chrome use a format like pt-PT, en-GB and others use pt-PT, en-BG, etc. 
if (!Languages.languages[currentLanguage]){ //Begin evaluating current language
	currentLanguage = "en-gb";//If the currentLanguage is not defined in idiomas.js, then the system should assume the international language (en-gb)
} //End evaluating current language
export default class Testes extends React.Component{

	constructor(props) {
		super(props);

		this.state = {
			user: JSON.parse (localStorage.getItem('token_eleicoes')),
			permissionsEleicoes: localStorage.getItem('permissions_eleicoes'),
			component: 1, //The current component
			error: '', //To handle any error
			//height: window.innerHeight, //To handle screen height
			  //width: window.innerWidth //To handle screen width
			  showModalHelp: false,
			  showModalUser: false, //TODO: User will be another page intead
			  language: currentLanguage, //The system language. TODO: Implement some kind of parameterization and an option to choose language manually
		};
	}

	componentDidMount() {
		//console.log ('User Credentials -> ', this.state.user);
		//console.log ('User Permissions -> ', this.state.permissionsEleicoes);
		//The following prvents react-modal of trying to set the app element to document.body, while it doesn't exist yet.
		//window.addEventListener("resize", this.updateDimensions);
	}

	render (){ 
		return (
			/* Begin binding*/
			<div > 
				<Template
					/* Begin Main Content Row*/
					component={
						<div>
							Bem vindo à página de testes!
						</div>
					}
					/* End Main Content Row*/
				/>
			</div>
			/* End binding*/
		);
	}
}

