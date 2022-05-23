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
			  partidoSelecionado: "",
			  labelPartido: "",
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
											<div className="data statistic">10.000.000</div>
										</div>
										<div className='data_container'>
											<div className='data title-statistic'>Mesas</div>
											<div className='data statistic'>10.000</div>
										</div>
										<div className='data_container'>
											<div className='data title-statistic'>Mesas escrutinadas</div>
											<div className="data statistic">5.000</div>
										</div>
									</div>               
									<div className='bar col-lg-4 col-md-12 col-sm-12 align-self-center'>
										<h2 className='text-center'>Total de votos</h2>
										<h3 className='text-center'>5.000.000</h3>
									</div>
									<div className='bar col-lg-4 col-md-12 col-sm-12'>
										<div className='data_container'>
											<div className='data title-statistic'>Votos brancos</div>
											<div className='data statistic'>1000</div>
										</div>
										<div className='data_container'>
											<div className='data title-statistic'>Votos nulos</div>
											<div className='data statistic'>2000</div>
										</div>
										<div className='data_container'>
											<div className='data title-statistic'>Votos reclamados</div>
											<div className='data statistic'>500</div>
										</div>
									</div>       
								</div>
							</header>  		
							{/* End Status Bar */}

							<div className='container'>
								<MaterialTable
									columns={[
										{ title: 'Nº', field: 'numero', type: 'string'},
										{ title: 'Partido', field: 'partido', type: 'string'},
										{
											title: 'Bandeira',
											field: 'bandeira',
											render: item => <img src={process.env.PUBLIC_URL + '/' + item.bandeira} alt="" border="3" height="50" width="70" />
										},
										{ title: 'Candidato', field: 'candidato', type: 'string'},
										{
											title: 'Foto',
											field: 'foto',
											render: item => <img src={process.env.PUBLIC_URL + '/' + item.foto} alt="" border="3" height="50" width="70" />
										},
										{ title: 'Nº de Votos', field: 'votos', type: 'numeric'},
										{ title: 'Percentagem', field: 'percentagem', type: 'numeric'}
									]}
									data={
										[
											{"numero": 1, "partido": "APN", "bandeira": "apn.jpeg", "candidato": "Quintino Moreira", "foto": "quintino.jpeg", "votos": 50000, "percentagem": 100 * (50000/5000000) + "%"},
											{"numero": 2, "partido": "CASA-CE", "bandeira": "casa.jpeg", "candidato": "Manuel Fernandes", "foto": "manuel.jpeg", "votos": 500000, "percentagem": 100 * (500000/5000000) + "%"},
											{"numero": 3, "partido": "FNLA", "bandeira": "fnla.png", "candidato": "Nimi A Simbi", "foto": "nimi.jpeg", "votos": 200000, "percentagem": 100 * (200000/5000000) + "%"},
											{"numero": 4, "partido": "MPLA", "bandeira": "mpla.png", "candidato": "João Lourenço", "foto": "joao.jpeg", "votos": 2000000, "percentagem": 100 * (2000000/5000000) + "%"},
											{"numero": 5, "partido": "PRS", "bandeira": "prs.jpeg", "candidato": "Benedito Daniel", "foto": "benedito.jpeg", "votos": 200000, "percentagem": 100 * (200000/5000000) + "%"},
											{"numero": 6, "partido": "UNITA", "bandeira": "unita.png", "candidato": "Adalberto Júnior", "foto": "adalberto.jpeg", "votos": 2000000, "percentagem": 100 * (2000000/5000000) + "%"},
										]
									}
									localization={{ //Begin the table header and footer information 
										body: { //Begin some additional data for the inner of the table
											emptyDaSourceMesage: this.props.emptyMessage //TODO: Not working....
										}, //End some additional data for the inner of the table
										toolbar: this.state.toolbar, //Searchbox data and other future header if we need it later
										header: { //Begin other important header to complete toolbar
											actions: this.props.actionsTitle, //Search hint
										}, //End other important header to complete toolbar
										pagination: this.props.pagination, //The icons to appear on the footer. 
									}} //End the table header and footer information 
									options={{ //Begin formating options for our table
										actionsColumnIndex: -1, //The column for the Actions (update, delete, etc.). 0 is 1st, 1 is 2nd, -1 is last
										actionsCellStyle: { color: this.props.iconsColor }, //The icons color
										rowStyle: rowData => ({	 //Begin analysing whether row id is odd or even to set different style (TODO: See when id is set to 1,2,3...)
											backgroundColor: "white" //Table line background color. tableData is the default material table key where the id key is defined for each row
										}), //End analysing whether row id is odd or even to set different style 
										searchFieldStyle: { //Begin search icons and field format
											backgroundColor: '', //Background color for the search icon 
										}, //End search icons and field format
										headerStyle: { //Begin actions header format
											backgroundColor: this.props.titleColor, //Background color for table actions header
										}, //End actions header format
										//columnDefaultFilter: {title: '', field: '',}, //Another way to filter the search
										//filtering: true,//TODO: correct warning associated to this
									}} //End formating options for our table
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

