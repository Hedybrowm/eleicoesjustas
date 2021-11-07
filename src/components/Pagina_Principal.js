/**
 * @api {JANELA} PAGINA_PRINCIPAL Pagina_Principal dinâmica
 * @apiName Pagina_Principal
 * @apiGroup Pagina_Principal
 *
 * @apiDescription Pagina_Principal
 * - Uma instância dinâmica do Template
 */
import React from 'react';
import { Chart } from 'chart.js';
import ReactModal from 'react-modal';
import Template from './Template'; //A template of the Layout_Oficial
const Languages = require('./Idiomas.js'); //Importing the file containing all the strings for each language
//const auxiliaryFunctions = require ('./utils'); //Auxiliary functions
var currentLanguage = (window.navigator.language || window.navigator.userLanguage).toLowerCase(); //The choosen language which should be dynamic. This should be in lower case because some Browsers like chrome use a format like pt-PT, en-GB and others use pt-PT, en-BG, etc. 
if (!Languages.languages[currentLanguage]){ //Begin evaluating current language
	currentLanguage = "en-gb";//If the currentLanguage is not defined in idiomas.js, then the system should assume the international language (en-gb)
} //End evaluating current language
export default class Pagina_Principal extends React.Component{

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
		drawChart(this.state.language); //Passing only the language not to send too many bytes. TODO: take language out of state
		//The following prvents react-modal of trying to set the app element to document.body, while it doesn't exist yet.
		ReactModal.setAppElement('body');
		//window.addEventListener("resize", this.updateDimensions);
	}

	render (){ 
		return (
			/* Begin binding*/
			<div> 
				<Template
					/* Begin Main Content Row*/
					component={
						<div>
							Bem vindo!
						</div>
					}
					/* End Main Content Row*/
				/>
			</div>
			/* End binding*/
		);
	}
}

//6292a9bb828f4cfbd5b16ba4a3c1228b6db7f188996a20c2c89998ea49ae6a48311add05e3b89b1f616afdeb7b32dc004cce351bdbd6ec9c6dcda57071e25513
//This chart will be qui dynamic

function drawChart (language) {
	var chLine1 = document.getElementById("chLine1");
	var chLine2 = document.getElementById("chLine2");

	var chartData = {
		labels: [
			Languages.languages[language].General.jan,
			Languages.languages[language].General.feb,
			Languages.languages[language].General.mar,
			Languages.languages[language].General.apr,
			Languages.languages[language].General.may,
			Languages.languages[language].General.jun,
			Languages.languages[language].General.jul,
			Languages.languages[language].General.aug,
			Languages.languages[language].General.sep,
			Languages.languages[language].General.oct,
			Languages.languages[language].General.nov,
			Languages.languages[language].General.dec,
		],
		datasets: [
			{
				label: "Vendas Mensais (Euros)",
				data: [589, 445, 483, 503, 689, 692, 634,66,7,8,9,1],
				backgroundColor: ['rgba(241, 142, 20, 0.2)'],
			
			},
			{
				data: [289, 245, 183, 103, 289, 592, 634, 166, 57, 18, 39, 71],
				backgroundColor: ['rgba(241, 145, 1,0.4)']
			}
		]
	};

	// Bar chart

	new Chart(chLine1, {
		type: 'bar',
		data: {
			labels: [
				Languages.languages[language].General.jan,
				Languages.languages[language].General.feb,
				Languages.languages[language].General.mar,
				Languages.languages[language].General.apr,
				Languages.languages[language].General.may,
				Languages.languages[language].General.jun,
				Languages.languages[language].General.jul,
				Languages.languages[language].General.aug,
				Languages.languages[language].General.sep,
				Languages.languages[language].General.oct,
				Languages.languages[language].General.nov,
				Languages.languages[language].General.dec,
			],
			datasets: [
				{
					label: Languages.languages[language].General.barChartLabel , 
					backgroundColor: ['#f18e01','#f18e01','#f18e01','#f18e01','#f18e01','#f18e01','#f18e01','#f18e01','#f18e01','#f18e01','#f18e01','#f18e01'],
					data: [2478,5267,734,784,433],
					borderWidth: 0
				}
			]
		},
		options: {
			legend: { display: false },
			title: {
				display: true,
				text: Languages.languages[language].General.barChartTitle + '(' + (new Date().getFullYear()) + ')'
			}
		}
	});

	new Chart(chLine2, {
		type: 'line',
		data: chartData,
		options: {
			legend: { display: false },
				title: {
				display: true,
				text: Languages.languages[language].General.areaChartTitle + '(' + (new Date().getFullYear()) + ')'
			}
		
		}
	});
}
