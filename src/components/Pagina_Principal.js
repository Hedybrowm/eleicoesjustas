/**
 * @api {JANELA} PAGINA_PRINCIPAL Pagina_Principal dinâmica
 * @apiName Pagina_Principal
 * @apiGroup Pagina_Principal
 *
 * @apiDescription Pagina_Principal
 * - Uma instância dinâmica do Template
 */
import React from 'react';
import MaterialTable from 'material-table'
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
		//The following prvents react-modal of trying to set the app element to document.body, while it doesn't exist yet.
		ReactModal.setAppElement('body');
		//window.addEventListener("resize", this.updateDimensions);
	}

	render (){ 
		return (
			/* Begin binding*/
			<div > 
				<Template
					/* Begin Main Content Row*/
					component={
						<div className="main_container">
							<header className='container-fluid'>
								{/* Begin Status Bar */}
								<div className='row stat-bar'>
									<div className='bar col-lg-4 col-md-12 col-sm-12'>
										<div className='data_container'>
											<div className='data title-statistic'>Votos esperados</div>
											<div className="data statistic">2022</div>
										</div>
										<div className='data_container'>
											<div className='data title-statistic'>Mesas</div>
											<div className='data statistic'>99999</div>
										</div>
										<div className='data_container'>
											<div className='data title-statistic'>Mesas escrutinadas</div>
											<div className="data statistic">1000</div>
										</div>
									</div>               
									<div className='bar col-lg-4 col-md-12 col-sm-12 align-self-center'>
										<h2 className='text-center'>Total de votos</h2>
										<h3 className='text-center'>99999</h3>
									</div>
									<div className='bar col-lg-4 col-md-12 col-sm-12'>
										<div className='data_container'>
											<div className='data title-statistic'>Votos brancos</div>
											<div className='data statistic'>99999</div>
										</div>
										<div className='data_container'>
											<div className='data title-statistic'>Votos nulos</div>
											<div className='data statistic'>99999</div>
										</div>
										<div className='data_container'>
											<div className='data title-statistic'>Votos reclamados</div>
											<div className='data statistic'>1000</div>
										</div>
									</div>       
								</div>
							</header>
							{/* End Status Bar */}

							<div className='container'>
								<MaterialTable
									title="Resultados da votação a nível nacional"
									columns={[
										{ title: 'Nº', field: 'numero', type: 'string'},
										{ title: 'Partido', field: 'partido', type: 'string'},
										{
											title: 'Bandeira',
											field: 'bandeira',
											render: rowData => (
												<img
													style={{ height: 60, borderRadius: '5%' }}
													src={rowData.avatar}
												/>
											),
										},
										{ title: 'Candidato', field: 'candidato', type: 'string'},
										{ title: 'Nº de Votos', field: 'numeroVotos', type: 'numeric'},
										{ title: 'Percentagem', field: 'percentagem', type: 'numeric'}
									]}
									data={query =>
										new Promise((resolve, reject) => {
										let url = 'https://reqres.in/api/users?'
										url += 'per_page=' + query.pageSize
										url += '&page=' + (query.page + 1)
										fetch(url)
											.then(response => response.json())
											.then(result => {
											resolve({
												data: result.data,
												page: result.page - 1,
												totalCount: result.total,
											})
											})
										})
									}
								/>
							</div>   
						</div>
					}
					/* End Main Content Row*/
				/>
			</div>
			/* End binding*/
		);
	}
}

