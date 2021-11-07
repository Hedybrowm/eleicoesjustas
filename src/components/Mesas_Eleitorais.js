/**
 * @api {JANELA} Mesas_Eleitorais Gerir dados
 * @apiName eleicoesSegurasMesas_Eleitorais
 * @apiGroup Mesas_Eleitorais
 * 
 * @apiDescription Gestão de Mesas_Eleitorais:
 * - Listar Mesas_Eleitorais
 * - Inserir Mesa_Eleitoral
 * - Atualizar Mesa_Eleitoral
 * - Eliminar Mesa_Eleitoral
 */
import React from 'react'; //The core component
import Template from './Template';	//General Layout
import DynamicTable from './DynamicTable'; //Dynamic Table to handle data for all modules of this application
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs'; // For Tabs containing TabLists with Tab and TabPanel elements
const Languages = require('./Idiomas.js'); //Importing the file containing all the strings for each language
//const auxiliaryFunctions = require ('./utils'); //Auxiliary functions
var currentLanguage = (window.navigator.language || window.navigator.userLanguage).toLowerCase(); //The choosen language which should be dynamic. This should be in lower case because some Browsers like chrome use a format like pt-PT, en-GB and others use pt-PT, en-BG, etc. 
if (!Languages.languages[currentLanguage]){ //Begin evaluating current language
	currentLanguage = "en-gb";//If the currentLanguage is not defined in idiomas.js, then the system should assume the international language (en-gb)
} //End evaluating current language
export default class Mesas_Eleitorais extends React.Component{ //Begin Component (class) Mesas_Eleitorais for eleicoesSeguras Application
	constructor(props){ //Begin constructor for Mesas_Eleitorais
		super(props); //Inheriting Component props to handle props sent by some external component
		this.state = { //Begin state of the current component to save all internal variables
			DBTable: 'Mesas_Eleitorais', //DB Table for this component
			DBRoute: 'Mesas_Eleitorais', //DB Backend route for this component
			DBTableID: ['presidentes_candidato_id'], //DB Table Primary Key for this component
			DBTableLabel: ['designacao'], //DB Table fields for a record identification (weak entities have more than one field)
			dataSend: 'GetPostPutDelete', //Socket message to get data. TODO: This won't exist any longer since we'll get data from the same route we retrieve from
			dataGet: 'devolverMesas_Eleitorais', //Socket message to handle gotten data. 
			language: currentLanguage, //The system language. TODO: Implement some kind of parameterization and an option to choose language manually
		}; //End state of the current component to save all internal variables
	} //End constructor for Mesas_Eleitorais
	render (){ //Binding method. TODO: Reduce this code up to 100 lines
		return ( //Returning the component wraper with everithing inside it
			<div> {/* Begin binding*/}
				<Template //Begin Generic Template
					component={ //Begin current (specific = Mesas_Eleitorais) component -> The only prop needed to be passed, it contains all the JSX for the current component (Mesas_Eleitorais)
						<div className="col row"> {/* Begin Main Content single full row*/}
							<div className="col-lg-12 col-md-12 col-sm-12">{/* Begin Main Content single col*/}
								<h1 className="pageTitle">{Languages.languages[this.state.language].Mesas_Eleitorais.name}</h1>{/*Current Component (Mesas_Eleitorais) main title*/}
								<Tabs> {/* Begin Tabs for header Subtitles in the current Component (Mesas_Eleitorais) */}
									<TabList> {/* Bengin enclosing for different tab section. TODO: make this dynamic according to number of different types of Mesas_Eleitorais */}
										{//Begin Javascript section to use dynamic content (tabs) using map()
											Languages.languages[this.state.language].Mesas_Eleitorais.mainTabs.map((tab, index)=>(
												<Tab key={index}>{tab.toUpperCase()}</Tab> /* Specific tab from  languages map TODO: Perhaps the uppercase can be treated in the languges file */
											))
										}{/* End Javascript section for dynamic content (tabs) unsing map */}
									</TabList> {/* End enclosing for different tab section. TODO: make this dynamic according to number of different types of Mesas_Eleitorais */}
									{//Begin Javascript section to use dynamic content (tabs content) using map
										Languages.languages[this.state.language].Mesas_Eleitorais.mainTabs.map((tab, index)=>( //TODO: Use this tab variable in the filter process someway
											<TabPanel key={index}> {/* Bengin content for the n-th Tab inside TabList */}
												<div className="row"> {/* Begin Content row to enclose the dynamic table*/}
													{/* Begin the completely dynamic and dynamic and generic table with the props passed from the current component	*/}
													<DynamicTable 
														DBTable = {this.state.DBTable} //DB Table for this component
														DBRoute = {this.state.DBRoute}  //DB Backend route for this component
														DBTableID = {this.state.DBTableID}  //DB Table Primary Key for this component
														DBTableLabel = {this.state.DBTableLabel} //DB Table fields for a record identification (weak entities have more than one field)
														dataSend = {this.state.dataSend} //Socket message to get data. We're sending this because in future we can pass this paramenter as something different for some specific purpose
														dataGet = {this.state.dataGet} //Socket message to handle gotten data.
														saveButton = {Languages.languages[this.state.language].Mesas_Eleitorais.saveButton} //Button Save Label
														editButton = {Languages.languages[this.state.language].Mesas_Eleitorais.editButton} //Button Edit Label
														deleteButton = {Languages.languages[this.state.language].Mesas_Eleitorais.deleteButton} //Button Delete Label
														lockButton = {Languages.languages[this.state.language].Mesas_Eleitorais.lockButton} //Button Delete Label
														titleSave = {Languages.languages[this.state.language].Mesas_Eleitorais.titleSave} //Page Save tittle, coinciding with the Button save for now
														titleEdit = {Languages.languages[this.state.language].Mesas_Eleitorais.titleEdit} //Page Edit tittle
														titleDelete = {Languages.languages[this.state.language].Mesas_Eleitorais.titleDelete} //Page Delete tittle
														messageDelete = {Languages.languages[this.state.language].Mesas_Eleitorais.messageDelete} //Page Delete message
														successSave = {Languages.languages[this.state.language].Mesas_Eleitorais.successSave} //Success POST message
														successEdit = {Languages.languages[this.state.language].Mesas_Eleitorais.successEdit} //Success PUP message
														successDelete = {Languages.languages[this.state.language].Mesas_Eleitorais.successDelete} //Success DELETE message
														validationError = {Languages.languages[this.state.language].General.validationError} //Client Side Validation Error message during POST or PUT
														errorSaveClient = {Languages.languages[this.state.language].Mesas_Eleitorais.errorSaveClient} //Client Side Error message in case case of some exception during POST
														errorSaveServer = {Languages.languages[this.state.language].Mesas_Eleitorais.errorSaveServer} //Server Side Error message in case case of some exception during POST
														errorEditClient = {Languages.languages[this.state.language].Mesas_Eleitorais.errorEditClient} //Client Side  Error message in case case of some exception during PUT
														errorEditServer = {Languages.languages[this.state.language].Mesas_Eleitorais.errorEditServer} //Server Side  Error message in case case of some exception during PUT
														errorDeleteClient = {Languages.languages[this.state.language].Mesas_Eleitorais.errorDeleteClient} //Client Side  Error message in case case of some exception during DELETE
														errorDeleteServer = {Languages.languages[this.state.language].Mesas_Eleitorais.errorDeleteServer} //Server Side  Error message in case case of some exception during DELETE
														emptyMessage = {Languages.languages[this.state.language].Mesas_Eleitorais.emptyMessage} //Exception message for no data available
														saveButtonHint = {Languages.languages[this.state.language].Mesas_Eleitorais.saveButtonHint} //The hint to be upon save Button. TODO: not in use yet
														editButtonHint = {Languages.languages[this.state.language].Mesas_Eleitorais.editButtonHint} //The hint to be upon edit Button. 
														deleteButtonHint = {Languages.languages[this.state.language].Mesas_Eleitorais.deleteButtonHint} //The hint to be upon delete Button. 
														lockButtonHint = {Languages.languages[this.state.language].Mesas_Eleitorais.lockButtonHint} //The hint to be upon block Button. TODO: discuss  with Antonio and implement the real purpose of this button
														lockButtonMessage = {Languages.languages[this.state.language].Mesas_Eleitorais.lockButtonMessage} //The message to be chown by clicking block Button . TODO: discuss  with Antonio and implement the real purpose of this button
														backButton = {Languages.languages[this.state.language].General.backButton} //The text on backbutton (eg. from a modal)
														serverOffline = {Languages.languages[this.state.language].General.serverOffline} //Server error message. TODO: edit this message
														//selectorColor = {'#cccccc'}
														evenColor = {'white'} //The color for the even rows
														oddColor = {'#e9e9e9'} //The color for the odd rows
														iconsColor = {'#f18e01'} //The color for the icons insert, update, delete, etc.
														toolbar = {{ //The icons to appear on the toolbar. TODO: Add more icons here 
															searchTooltip: Languages.languages[this.state.language].General.searchBox, //Serach box hint
															searchPlaceholder: Languages.languages[this.state.language].General.search, //Serach box text
														}}//The texts for the table toolbar
														pagination = {{//The icons to appear on the footer. TODO: Add more icons here 
															labelRowsSelect: Languages.languages[this.state.language].General.linesNumber, //Number of lines text
															firstTooltip: Languages.languages[this.state.language].General.firstPage, //First page text
															lastTooltip: Languages.languages[this.state.language].General.lastPage, //Last page text
															previousTooltip: Languages.languages[this.state.language].General.previousPage, //Previous page text
															nextTooltip: Languages.languages[this.state.language].General.nextPage, //Next page text
														}} //Footers
														titleColor = {'#cccccc'} //The headerStyle background
														actionsTitle = {Languages.languages[this.state.language].Mesas_Eleitorais.actionsTitle} //Header actions where titleColor is
													> {/* End props definition for generic table*/}
													</DynamicTable>  {/* End the completely dynamic and generic table*/}
												</div>  {/* End Content row to enclose the dynamic table*/}
												{/* End Main Content Row1*/}
											</TabPanel> /* End content for the n-th Tab inside TabList*/
										))
									}{/* End Javascript section for dynamic content (tabs content) using map */}
								</Tabs> {/* End Tabs for header Subtitles in the current Component (Mesas_Eleitorais) */}
							</div> {/* end Main Content single col*/}	
						</div> /* Begin Main Content single full row*/	
					}/* End current (specific = Mesas_Eleitorais) component*/
				/> {/*End Generic Template*/}
			</div>/* End binding*/
		); //End returning the component wraper with everithing inside it
	} //End Binding method
} //Begin Component (class) Mesas_Eleitorais for eleicoesSeguras Application - 6292a9bb828f4cfbd5b16ba4a3c1228b6db7f188996a20c2c89998ea49ae6a48311add05e3b89b1f616afdeb7b32dc004cce351bdbd6ec9c6dcda57071e25513
