/**
 * @api {JANELA} DYNAMICTABLE eleicoesSeguras
 * @apiName eleicoesSeguras
 * @apiGroup eleicoesSeguras
 *
 * @apiDescription eleicoesSeguras:
 * - Módulo principal do eleicoesSeguras que contém a implementação genérica para qualquer módulo existe e para gerar novos módulos rapidamente
 * - Também suporta a inserção de iframes no seu interior, podendo assumir uma aplicação externa: site, jogo, etc.
 */

//TODO: take form out of the map loop. 
//TODO: improve help (with modals from mapeamentos) and user (make it work properly) modules
//TODO: remove push from react, use setState instead, so the component will be rendered again and the objects (e.g. arryas) won'r be modified to a new instance
import React from 'react'; //Iporting the core component - 'React' must be in scope when using JSX  react/react-in-jsx-scope
import openSocket from 'socket.io-client'; //Importing Websocket Client to access the realtime API which uses sockets.io
import MaterialTable from 'material-table'; //Importing material table to be tranformed in a dynamic table for all modules
import 'react-tabs/style/react-tabs.css'; //Importing stykes for material table
//import ReactModal from 'react-modal'; //Importing react modal to be used for creating forms and user quick pages
//import { userService } from './user.service'; //Importing moidule to login and logout
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs'; // Importing components for Tabs containing TabLists with Tab and TabPanel elements
import SelectData from './Select'; //Importing our dynamic select
//import { Button } from 'reactstrap'; //Importing React Button with Bootstrap features
import Modal from 'react-bootstrap/Modal'; //Modals are unmounted when closed. Bootstrap only supports one modal window at a time. With react-overlays we can
//import { Redirect, useLocation } from "react-router-dom"; //Module to redirect to login if the user has no permission
import { Redirect } from "react-router-dom"; //Module to redirect to login if the user has no permission
import Dropzone from 'react-dropzone'; //The drag an drop component
//import ReactToPrint, { PrintContextConsumer } from 'react-to-print'; //Print utilities
//import LineItems from './LineItems'; //Lines of items to add to a document
//import uuidv4 from 'uuid/v4'; //A module to be used in handleAddLineItem
const auxiliaryFunctions = require('./utils'); //Auxiliary functions
const hosts = require('../hosts'); //Using hosts (eg. servers) to be conected with the current application
const socket = openSocket(hosts.realtimeAPI); //creating a client instance conected to our websocket server (the sockets.io realtime server)
var Tables = require('./Mapeamentos'); //Creating an instance containing all tables with specific data to be used in this dynamic table
const Languages = require('./Idiomas.js'); //Importing the file containing all the strings for each language
var currentLanguage = (window.navigator.language || window.navigator.userLanguage).toLowerCase(); //The choosen language which should be dynamic. This should be in lower case because some Browsers like chrome use a format like pt-PT, en-GB and others use pt-PT, en-BG, etc. 
if (!Languages.languages[currentLanguage]){ //Begin evaluating current language
	currentLanguage = "en-gb";//If the currentLanguage is not defined in idiomas.js, then the system should assume the international language (en-gb)
} //End evaluating current language
class DynamicTable extends React.Component { //Begin Component (class) DynamicTable - generic Table for handling all data in all contexts
	constructor(props) { //Begin Constructor for Dynamic Table. TODO: float model - https://react-bootstrap.github.io/components/modal/
		super(props); //Inheriting Component props to handle props sent by some external
		this.state = { //Begin state of the current component to save all internal variables
			user: JSON.parse(localStorage.getItem('token_eleicoesSeguras')), //login credentials saved through a specific token for eleicoesSeguras application
			permissionsEleicoesSeguras: JSON.parse(localStorage.getItem('permissions_eleicoesSeguras')), //All permissions associated to login credentials (all permissions for current user) will be here
			thisPermission: -1, //The index of the current permission in the array of permissions
			componentID: Tables.tables[this.props.DBTable].componentID, //The component in use of this dynamic table to be sent to the server for each request. TODO: Create a file to map all ids
			disableSave: '', //To be 'disabled' when user has  no permissions to save. TODO: use it
			disableEdit: '', //To be 'disabled' when user has  no permissions to update. TODO: use it
			disableDelete: '', //To be 'disabled' when user has no permissions to delete. TODO: use it
			hideSave: false, //To be 'hidden' when user has no permissions to save. TODO: use it
			hideEdit: false, //To be 'hidden' when user has  no permissions to update. TODO: use it
			hideDelete: false, //To be 'hidden' when user has  no permissions to delete. TODO: use it
			showModalSaveEdit: false, //Modal is open (true) or not (false) for Insert | Update
			showModalDelete: false, //Modal is open (true) or not (false) for Delete
			modalTitle: '', //Modal title according to save, edit or delete, depending on which is invoked
			messageDelete: this.props.messageDelete, //Modal delete message according depending to the module which invoked
			saveButton: '', //Text for save or edit  Button (this.props.saveButton or this.props.editButton)
			specificClientError: '',//The specific error related to the situation.
			specificServerError: '',//The specific error related to the situation.
			validationError: this.props.validationError,
			DBTable: this.props.DBTable, //DB Table where the data are being gotten/set
			DBTableID: this.props.DBTableID, //DB Table primary key
			DBTableLabel: this.props.DBTableLabel, //DB Table fields for a record identification (weak entities have more than one field)
			stringLabel: '', //The concatanation of the fields in DBTableLabel in a beautiful way
			timeout: [3000], //time for wainting a server response (ms)
			countErrors: [], //All fields with errors will be here, if the quantity is > 0, then the validation failed, so an error should be shown
			dataSend: this.props.dataSend, //variable sent from the module which called this table, for emitting request to fetch data from the server. For now we're using a same dataSend for all tables
			dataGet: this.props.dataGet,//variable sent from the module which called this table, for emitting request to fetch data from the server. But dataGet is specific for each module
			tableColumns: [], //All specific fields from the table related to the mopdule in use. It comes from Tables which is an intance of mapeamentos
			//historyTableColumns: [], //All specific fields from the table related to the user history in use. It comes from Tables which is an intance of mapeamentos
			otherTableColumns: {}, //tableColumns for special tables besides form tabs
			//TODO: Starting commenting from here
			data: [], //Assync data containing jsons data from the server, if we do not declare here, it won't be accessed after being rendered. Better have all state variables declared in advance (instead of being created dynamically in setState)
			capturedRow: {}, //A selected row, as it will be assynchronous, if we do not declare here, it won't be accessed after being rendered. Dictionary (json) containing all the data in the row to edit (modified fields) or delete (id)
			dataForModal: { 'route': this.props.DBRoute, 'listenMessage': this.props.dataGet, 'operation': 'SelectAll', 'data_to_send': [{ 'table': this.props.DBTable, 'fields': [], 'values': [], 'id': {} }] }, //capturedRow with only modified values to send to the sever. operation= 'Insert | Udate | Delete'
			error: '', //Dynamic error to be preesented in the page for different situations
			saveEditDeleteMessage: '', //Dynamic error to assign the error variable state above after CRUD modifications
			hideButton: false, //Hide the button in the modal or not
			imageFields: { 'samplefield': [] }, //A dictionary containing all image fields, each image field contains a list of images
			bigImage: {} ,
			language: currentLanguage, //The system language. TODO: Implement some kind of parameterization and an option to choose language manually
			/*lineItems: [ //Items for document lines
				{
				  id: 'initial',      // react-beautiful-dnd unique key
				  name: '',
				  description: '',
				  quantity: 0,
				  price: 0.00,
				},
			], 
			locale: 'en-US', //Also for document lines. TODO: use the languges according to the other components
  			currency: 'USD' //Also for document lines. TODO: use the languges according to the other components*/
			//TODO: declare all states variables in all files and correct all warnings...
		} //End state of the current component to save all internal variables
		if (localStorage.getItem('permissions_eleicoes_seguras')) { //Begin checking if permissions_eleicoes_seguras exists
			//var i = 0; //Counter to be used as an  iterator to point to user permissions related to the current component
			//TODO: use the i variable somehow
			for (let permission of JSON.parse(localStorage.getItem('permissions_eleicoes_seguras'))) { //Begin iterating throughout user permissions
				if (permission.id_componente === this.state.componentID) { //Begin checking whether user has permissions for the current comnponent or not
					this.state.thisPermission = 1; //Adding the index for the current component's permissions in the array of permissions
					//TODO: Adding on db status_save, status_edit, status_delete, so easch button has its own behaviour
					if (permission.gravar === '0') { //Begin validating the accessibility of save button
						if (permission.status === 'disable') { //Begin evaluating disable save
							this.state.disableSave = true; //Disable save
						} //End evaluating disable save
						else if (permission.status === 'hidden') { //Begin evaluating hide edit
							this.state.hideSave = true; //Hide save
						} //End evaluating hide save
					} //End validating the accessibility of save button
					if (permission.atualizar === '0') { //Begin validating the accessibility of edit button
						if (permission.status === 'disable') { //Begin evaluating disable edit
							this.state.disableEdit = true; //Disable edit
						} //End evaluating the disable edit
						else if (permission.status === 'hidden') { //Begin evaluating the hide edit
							this.state.hideEdit = true; //Hide edit
						} //End evaluating the hide edit
					} //End validating the accessibility of edit button
					if (permission.eliminar === '0') { //Begin validating the accessibility of delete button
						if (permission.status === 'disable') { //Begin evaluating disable delete
							this.state.disableDelete = true; //Disable delete
						} //End evaluating disable delete
						else if (permission.status === 'hidden') { //Begin evaluating hide delete
							this.state.hideDelete = true; //Hide delete
						} //End evaluating hide delete
					} //End validating the accessibility of delete button
					break; //No need to find permissions for other components
				} //End checking whether user has permissions for the current comnponent or not
				//i++; //Increment the coubter to be used as an  iterator to point to user permissions related to the current component
			} //End iterating throughout user permissions
		} //End checking if permissions_eleicoes_seguras exists
		//alert(this.state.thisPermission)
	} //End Constructor for Dynamic Table
	handleShowModalSave = () => { //Begin function to be called when save Button is clicked
		this.setState({ showModalSaveEdit: true, modalTitle: this.props.titleSave, saveButton: this.props.saveButton, error: '', specificClientError: this.props.errorSaveClient, specificServerError: this.props.errorSaveServer });
	} //End function to be called when save Button is clicked
	//To be called OnEdit
	handleShowModalEdit = () => { //Begin function to be called when edit Button is clicked
		this.setState({ showModalSaveEdit: true, modalTitle: this.props.titleEdit, saveButton: this.props.editButton, error: '', specificClientError: this.props.errorEditClient, specificServerError: this.props.errorEditServer });
	} //End function to be called when edit Button is clicked
	handleShowModalDelete = () => {  //Begin function to be called when delete Button is clicked
		this.setState({ showModalDelete: true, modalTitle: this.props.titleDelete, error: '', specificClientError: this.props.errorDeleteClient, specificServerError: this.props.errorDeleteServer });
	} //End function to be called when delete Button is clicked
	handleCloseSaveEditModal = () => { //Begin function to close Save or Edit Modal
		this.setState({ imageFields: { 'samplefield': [] }, showModalSaveEdit: false, modalTitle: '', saveButton: '', error: '', dataForModal: { 'route': this.props.DBRoute, 'listenMessage': this.state.dataGet, 'operation': 'SelectAll', 'data_to_send': [{ 'table': this.props.DBTable, 'fields': [], 'values': [], 'id': {} }] } }) //Set modal variables as default. 
	} //End function to close Save or Edit Modal
	handleCloseDeleteModal = () => { //Begin function to close Delete Modal
		this.setState({ showModalDelete: false, modalTitle: '', error: '', dataForModal: { 'route': this.props.DBRoute, 'listenMessage': this.state.dataGet, 'operation': 'SelectAll', 'data_to_send': [{ 'table': this.props.DBTable, 'fields': [], 'values': [], 'id': {} }] } }) //Set modal variables as default. 
	} //End function to close Delete Modal

	handleCloseImage = () => {
		this.setState({openImage: false});
	}

	componentDidMount() { //Begin componentDidMount for assynchronous handling. rows 
		Tables.tables[this.props.DBTable].tabs[0].tab.rows[0].fields.forEach((field) => //Begin foreach
			this.state.tableColumns.push({ title: field.label, field: field.field, headerStyle: { backgroundColor: '#cccccc', } }) //Adding fields to the array of jsons to feed the table
		); //End foreach
		if (Tables.tables[this.props.DBTable].tableTabs) { //Begin evaluating if there is a some table in the form dict - otherTableColumns
			Tables.tables[this.props.DBTable].tableTabs.map((tableTab, index) => { //Begin mapping the rows for tableTabs
				this.buscarDados(tableTab.dataGet, tableTab.DBRoute, tableTab.DBTable); //Get data to the websocket server. TODO: improve the performance
				this.setState({ [tableTab.label]: [] }, callBack => { //Begin setting the label for table tab and handling fields after callback
					Tables.tables[this.props.DBTable].tableTabs[index].tab.rows[0].fields.forEach((field) => //Begin foreach for history 
						this.state[tableTab.label].push({ title: field.label, field: field.field, headerStyle: { backgroundColor: '#cccccc', } }) //Adding fields to the array of jsons to feed the table
					); //End foreach for history
				}); //End setting the label for table tab and handling fields after callback
				this.devolverDados(tableTab.dataGet, res => { //Begin handling data sent by the the server. TODO: improve efficiency (beyond effectiveness)
					if (res.status === 200) { //Begin checking if we have a good reponse from server
						if (res.data.status === 400) { //Begin handling Client error during req
							this.setState({ //Begin setting the error in case of 400 response
								error: this.state.specificClientError //Each component should have its own error and validation
							}); //End setting the error in case of 400 response
						}  //End handling Client error during req
						else { //Begin success response
							if ((this.state.showModalSaveEdit === true) || (this.state.showModalDelete === true)) { //Begin checking if we're in the insert or edit modal
								this.setState({ [tableTab.title]: res.data.data }); //Put the array of jsons into data even if it's undefined (for timeout)
								if (res.data.data !== undefined) { //Begin checking if the response is not undefined
									this.setState({ error: this.state.saveEditDeleteMessage }); //Update error after a CRUD operation only in case of success!
								} //End checking if the response is not undefined
								else { //Begin checking if the response is undefined
									this.setState({ //Begin setting server error
										error: this.props.serverOffline //Setting server error
									}) //End setting server error
								} //End checking if the response is undefined
							} //End checking if we're in the insert or edit modal
							else { //Begin checking if we are not in the insert or edit modal
								this.setState({ [tableTab.title]: res.data.data }); //Put the array of jsons into data
							} //End checking if we sre not in the insert or edit modal
						} //End success response
					} //End checking if we have a good reponse from server
					else { //Begin checking if there's an error with the server
						this.setState({ //Begin setting state for server error
							error: this.state.specificServerError //Get the data from the server on value state
						}); //End setting state for server error
					} //End checking if there's an error with the server
				}) ////End handling data sent by the the server.
			return 0;
		}) //End mapping the rows for tableTabs
		//}//End iterating over tableTabs
		} //Begin evaluating if there is a some table in the form dict

		//ReactModal.setAppElement('body'); //This prevents react-modal of trying to set the app element to document.body, while it doesn't exist yet. Hides the application from screenreaders and other assistive technologies while the modal is open
		this.buscarDados(this.state.dataGet, this.props.DBRoute, this.props.DBTable); //Get data to the websocket server. TODO: improve the performance
		//Handle the data sent by the server with a timeout, so the server should send a response within this time
		this.devolverDados(this.state.dataGet, res => { //Begin handling data sent by the the server. TODO: improve efficiency (beyond effectiveness)
			if (res.status === 200) { //Begin checking if we have a good reponse from server
				if (res.data.status === 400) { //Begin handling Client error during req
					this.setState({ //Begin setting the error in case of 400 response
						error: this.state.specificClientError //Each component should have its own error and validation
					}); //End setting the error in case of 400 response
				}  //End handling Client error during req
				else { //Begin success response
					if ((this.state.showModalSaveEdit === true) || (this.state.showModalDelete === true)) { //Begin checking if we're in the insert or edit modal
						this.setState({ data: res.data.data }); //Put the array of jsons into data even if it's undefined (for timeout)
						if (res.data.data !== undefined) { //Begin checking if the response is not undefined
							this.setState({ error: this.state.saveEditDeleteMessage }); //Update error after a CRUD operation only in case of success!
						} //End checking if the response is not undefined
						else { //Begin checking if the response is undefined
							this.setState({ //Begin setting server error
								error: this.props.serverOffline //Setting server error
							}) //End setting server error
						} //End checking if the response is undefined
					} //End checking if we're in the insert or edit modal
					else { //Begin checking if we sre not in the insert or edit modal
						this.setState({ data: res.data.data, error: '' }); //Put the array of jsons into data
					} //End checking if we sre not in the insert or edit modal
				} //End success response
			} //End checking if we have a good reponse from server
			else { //Begin checking if there's an error with the server
				this.setState({ //Begin setting state for server error
					error: this.state.specificServerError //Get the data from the server on value state
				}); //End setting state for server error
			} //End checking if there's an error with the server
		}); ////End handling data sent by the the server.
		setTimeout(() => { //Begin setting a timeout for waiting server response. TODO: Needs more analysis!...
			if (this.state.data !== undefined) { //Begin checking if the realtime API didn't send an undefined json in case the data server is unavailable
				if (this.state.data.length === 0) { //Begin checking if the server sent the assynchronous response in useful time
					this.setState({ //Begin setting server error 
						error: this.props.serverOffline
					}) //End setting server error
				} // End checking if the server sent the assynchronous response in useful time
			} //End checking if the realtime API didn't send an undefined json
			else { //Begin checking if the realtime API sent an undefined
				this.setState({ //Begin setting server error
					error: this.props.serverOffline
				}) //End setting server error
			} //End checking if the realtime API sent an undefined
		}, this.state.timeout); //End setting a timeout for waiting server response
	} //End componentDidMount for assynchronous handling
	generateImages = (fieldName, field) => { //Begin generation images for preview
		let serverImgList = (!this.state.capturedRow[field]) ? [] : [this.state.capturedRow[field]]; //To preview saved image
		let localImageList = (fieldName in this.state.imageFields) ? this.state.imageFields[fieldName] : false;
		let effectiveImageList = (localImageList) ? localImageList : serverImgList; //If user didn't change the image, we use trhe server's
		var imageList = []; //The list for all images
		for (var i=0; i< effectiveImageList.length; i++){ //Begin iterating through all images 
			let img = effectiveImageList[i];
			if (!localImageList)
				imageList.push (<img key={i} className="imagePreview" alt="Preview" src={hosts.ango_restapi + "/img/users/" + img} ref={(input) => { this.preview = input; }} onDoubleClick={() => {this.handleOpenImage(img, false)}}/>) 
			else
				imageList.push (<img key={i} className="imagePreview" alt="Preview" src={img} ref={(input) => { this.preview = input; }} onDoubleClick={() => {this.handleOpenImage(img, true)}}/>) //Second approach of image upload.
		}//End iterating through all images
		return ( //Begin returning a div containing one or more images	
			<div>
				{
					imageList.map((image, index) =>( //We don't need to use the index here because we put the indexes above
						image
					))
				}
			</div>	
		) //End returning a div containing one or more images
	} //End generation images for preview
	updateDataForModal = (field, value, extra) => { //Begin function to update values to send to the server when user updates some field
		let index = this.state.dataForModal.data_to_send[0].fields.indexOf(field); //Get the index of this field was already modified  (if it is in data_to_send)
		let aux = this.state.dataForModal; //Aux to not mutate state
		if (index > -1) { //Beging checking if the field is in data_to_send
			//this.state.dataForModal.data_to_send[0].values[index] = "'"+value+"'"; //Updating with the new value
			aux.data_to_send[0].values[index] = "'"+value+"'"; //Updating with the new value
		} //End checking if the field is in data_to_send
		else if (!extra){ //Beging else if the field is not in data_to_send
			//this.state.dataForModal.data_to_send[0].fields.push(field); //Add the field to data_to_send
			aux.data_to_send[0].fields.push(field); //Add the field to data_to_send
			aux.data_to_send[0].values.push("'"+value+"'"); //Add value associated to the field to data_to_send
		} //End else if the field is not in data_to_send.
		//Saving images in an array for preview
		else { //Begin evaluating if there is an extra (normally for local images)
			aux.data_to_send[0].fields.push(field); //Add the field to data_to_send. TODO: format for several images
			aux.data_to_send[0].values.push("'"+value+"'"); //Add value associated to the field to data_to_send
			let localImageList = []; // All images
			if (extra.images){
				for (var image of extra.images){ //Several images
					localImageList.push(image); //Several images upload.
				}
			}
			else{
				localImageList.push(extra.image); //Single image upload.
			}
			this.setState({imageFields: {...this.state.imageFields, [extra.key]: localImageList}});
		} //End evaluating if there is an extra (normally for images)
		this.setState({dataForModal: aux}); //modify dataForModal no matter in which condition the fiels where modified
	} //End function to update values to send to the server when user updates some field
	evaluatePattern = (field) => { //Begin function to validate each field according to expected pattern. This function is evaluating all fields all the time (TODO..)
		if (field.field in this.state.capturedRow) { //Begin checking if the field is in capturedRow (modified) to be validated 
			var isValid = (field.regex !== "") ? !(field.regex.test(this.state.capturedRow[field.field])) : true; //Compare the inserted field with expected pattern with the inserted value
			if (isValid) { //Begin checking if the pattern is valid. 
				if (this.state.countErrors.includes(field.field)) { //Begin checking if the field is already in countErrors (was wrong before)
					let index = this.state.countErrors.indexOf(field.field); //Get index of the current field in countErrors
					this.state.countErrors.splice(index, 1); //Remove the field from countErrors
				} //End checking if the field is already in countErrors (was wrong before)
				return 'form-control is-valid'; //Return the value to use in the field className
			} //End checking if the pattern is valid. 
			else { //Begin the case if the pattern is not valid.
				if (!(this.state.countErrors.includes(field.field))) { //Begin checking if the field isn't in countErrors yet
					this.state.countErrors.push(field.field); //Insert the field in countErrors 
				} //End checking if the field isn't in countErrors yet
				return 'form-control is-invalid'; //Return the value to use in the field className
			} //End the case if the pattern is not valid.
		} //End checking if the field is in capturedRow (modified) to be validated
		else {  //Begin checking if the field is not in capturedRow (not modified)
			return 'form-control is-valid'; //Return the valid value as field wasn't modified yet to use in the field className
		} //End checking if the field is not in capturedRow (not modified). TODO: Handle the case for required fields
	} //End function to validate each field according to expected pattern
	evaluatePatternError = (field) => { //Begin validation for each field according to expected pattern and return a valid or invalid message
		if (field.field in this.state.capturedRow) { //Begin checking if the field is in capturedRow (modified) to be validated 
			var isValid = (field.regex !== "") ? !(field.regex.test(this.state.capturedRow[field.field])) : true; //Compare the inserted field with expected pattern with the inserted value
			if (isValid) { //Begin checking if the pattern is valid. 
				return ''; //Empty message in case field is correct. TODO: Handle the case for required fields
			} //End checking if the pattern is valid.
			else { //Begin checking if the pattern is not valid. 
				return field.error; //returning the field error
			} //End checking if the pattern is not valid. 
		} //End checking if the field is in capturedRow (modified) to be validated 
		//else{ //Begin checking if the field is not in capturedRow (not modified). TODO: No need to return '' if the field is not in capturedRow?!
		//return ''; //TODO: Review this method: why is this function being called twice? Perhaps we'll need to call it in ()=>{}
		//} //End checking if the field is not in capturedRow (not modified)
	} //End validation for each field according to expected pattern and return a valid or invalid message
	generateInput = (field) => { //Begin function to return specific html field according to the field input property. TODO: find a way to not call this function for all fields all the time (page shuould not render all the time)
		if ((field.component === "input") && (field.type !== "file") && (field.type !== "drag_n_drop")) { //Begin checking if the current field is a commom input
			return ( //Begin returning an input with evaluated pattern. TODO: set a valid id for each field
				<input type={field.type} className={this.evaluatePattern(field)} id="validationServer01" value={!this.state.capturedRow[field.field] ? "" : this.state.capturedRow[field.field]}//Begin input component
					onChange={(event) => { //Begin handle change for the current component
						this.setState({ error: '', capturedRow: { ...this.state.capturedRow, [field.field]: event.target.value } }); //Add the current value from input to capturedRow
						this.updateDataForModal(field.field, event.target.value, null); //Updating dataForModal dict (json) with the modified value and its associated field
					}} //End handle change for the current component 
				/> // End input component 
			) //End returning an input 
		} //End checking if the current field is a commom input 
		else if (field.component === "select") { //Begin checking if the current field is a Select
			return ( //Begin returning an input with evaluated pattern. TODO: set a valid id for each field
				<SelectData type={field.type} className={this.evaluatePattern(field)} id="validationServer01" vvalue={!this.state.capturedRow[field.field] ? "" : this.state.capturedRow[field.field]}  //Begin select component
					onChange={(event) => { //TODO: create handleChange method for the code below
						this.setState({ error: '', capturedRow: { ...this.state.capturedRow, [field.field]: event.target.value } }); //Add the current value from input to capturedRow
						this.updateDataForModal(field.field, event.target.value, null); //Updating dataForModal dict (json) with the modified value and its associated field
						//alert (this.state.countErrors.length)
					}} //End handle change for the current component
				//TODO: Add here all props for this select
				> {/* End Select properties */}
				</SelectData> // End Select component
			) //End returning a SelectData (created by us) with evaluated pattern. TODO: set a valid id for each field
		} //End checking if the current field is a Select
		else if (field.type === "file") { //Begin checking if the current field is a input type file
			return ( //Begin returning an input with evaluated pattern. TODO: set a valid id for each field
				<input type="file"
					onChange={(event) => { //Begin handle change for the current component
						this.setState({ error: '', capturedRow: { ...this.state.capturedRow, [field.field]: event.target.value } }); //TODO: no good! Add the current value from input to capturedRow
						//this.updateDataForModal (field.field, auxiliaryFunctions.handleUploadFile(event), {"fieldType": field.type, "key":  field.key}); //Updating dataForModal dict (json) with the modified value and its associated field
						this.updateDataForModal(field.field, auxiliaryFunctions.handleUploadFile(event), { "fieldType": field.type, "key": field.key, "image": URL.createObjectURL(event.target.files[0]) }); //Second approach of image upload.
					}} //End handle change for the current component 
				/> // End input component
			) //End returning a input type file (created by us) with evaluated pattern. TODO: set a valid id for each field
		} //End checking if the current field is a input type file
		else if (field.type === "drag_n_drop") { //Begin checking if the current field is a input type file
			return ( //Begin returning an input with evaluated pattern. TODO: set a valid id for each field
				<Dropzone onDrop={acceptedFiles => auxiliaryFunctions.handleUploadFile2(acceptedFiles, callBack => {
					this.setState({ error: '', capturedRow: { ...this.state.capturedRow, [field.field]: callBack } }); ////TODO: no good! Add the current value from input to capturedRow
					//this.updateDataForModal (field.field, callBack, {"fieldType": field.type, "key":  field.key}); //Updating dataForModal dict (json) with the modified value and its associated field
					this.updateDataForModal(field.field, callBack.names, { "fieldType": field.type, "key": field.key, "images": callBack.images }); //Second approach of image upload.
					let aux = this.state.dataForModal; //Aux to not mutate state
					aux.data_to_send[0].imagens = callBack; //TODO: Doesn't it violate React Philosophy?
					this.setState({dataForModal: aux}); //modify dataForModal no matter in which condition the fiels where modified
				})}
					value={this.state.capturedRow[field.field]} >
					{({ getRootProps, getInputProps }) => (
						<section>
							<div {...getRootProps()}>
								<input {...getInputProps()} />
								<p>Selecione o(s) ficheiro(s) ou arraste-o(s) aqui</p>
							</div>
						</section>
					)}
				</Dropzone>
			) //End returning a input type file (created by us) with evaluated pattern. TODO: set a valid id for each field
		} //End checking if the current field is a input type file
		else if (field.type === "image") { //Begin image preview
			return (this.generateImages (field.associatedKey, field.field));
		} //End image preview*/
		else { //if //Begin other kind of component
			//Other kinds of components different from input and input type file
			return (
				<div></div>
			)
		} //End other kind of component
	} //End function to return specific html input according to the field input property.
	buscarDados = (listenMessage, DBRoute, DBTable) => { //Begin emitting a request to the server when the page is loaded
		socket.emit(this.state.dataSend, //Emitting a post request to the server. TODO: Use queries like select max(id) from tabele and getting only a table head with some records...
			{ 'route': DBRoute, 'listenMessage': listenMessage, 'operation': 'SelectAll', 'data_to_send': [{ 'table': DBTable, 'fields': [], 'values': [], 'id': {} }] },
			this.state.user ? this.state.user.token_cliente : null, this.state.componentID); //All routes in the servers should be according to this structure
	} //End emitting a request to the server when the page is loaded
	devolverDados = (listenMessage, res) => { //Begin handling data sent by the server on a specific message
		socket.on(listenMessage, response => res(response)); //Listening to the message
	} //End handling data sent by the server on a specific message
	handleSubmit = (event) => { //Begin method to handle form submit
		event.preventDefault(); //preventing form to be posted. We'll post by ourselves
	} //End method to handle form submit 
	protectPage() { //Begin function to protect the page if user has no permission
		if (this.state.thisPermission === -1) { //Begin case user has not permission for current component
			//userService.logout(); //Log the user out due to an attempt to get private resource
			//return (<Redirect to='/login' />); //Redirects user to login 
			alert (Languages.languages[this.state.language].General.notAllowed);
			return (<Redirect to='/' />); //Redirects user to index 
			//let location = useLocation();
			//return (<Redirect to={"/" + location.pathname} />);
			//alert(location.pathname)
		} //End case user has not permission for current component
	} //End function to protect the page if user has no permission

	/*//Begin functions to be used for document's lines
	
	handleLineItemChange = (elementIndex) => (event) => {
	let lineItems = this.state.lineItems.map((item, index) => {
		if (elementIndex !== index) return item
		return {...item, [event.target.name]: event.target.value}
	})
	this.setState({lineItems})
	}

	handleAddLineItem = (event) => {
	this.setState({
		// use optimistic uuid for drag drop; in a production app this could be a database id
		lineItems: this.state.lineItems.concat(
		[{ id: uuidv4(), name: '', description: '', quantity: 0, price: 0.00 }]
		)
	})
	}

	handleRemoveLineItem = (elementIndex) => (event) => {
	this.setState({
		lineItems: this.state.lineItems.filter((item, i) => {
		return elementIndex !== i
		})
	})
	}

	handleReorderLineItems = (newLineItems) => {
	this.setState({
		lineItems: newLineItems,
	})
	}

	handleFocusSelect = (event) => {
	event.target.select()
	}

	handlePayButtonClick = () => {
	alert('Not implemented')
	}

	formatCurrency = (amount) => {
	return (new Intl.NumberFormat(this.locale, {
		style: 'currency',
		currency: this.state.currency,
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	}).format(amount))
	}

	calcTaxAmount = (c) => {
	return c * (this.state.taxRate / 100)
	}

	calcLineItemsTotal = () => {
	return this.state.lineItems.reduce((prev, cur) => (prev + (cur.quantity * cur.price)), 0)
	}

	calcTaxTotal = () => {
	return this.calcLineItemsTotal() * (this.state.taxRate / 100)
	}

	calcGrandTotal = () => {
	return this.calcLineItemsTotal() + this.calcTaxTotal()
	}
	//End functions to be used for document's lines*/

	handleOpenImage = (img, localImage) => {
		this.setState({openImage: true, bigImage: {"image": img, "local": localImage}});
	}

	handleCreateBigImage = () =>{
		return (this.state.bigImage.local ? <img className="bigImage" alt="Preview" src={this.state.bigImage.image} /> : <img className="bigImage" alt="Preview" src={hosts.ango_restapi + "/img/users/" + this.state.bigImage.image} />);
	}

	render() { //Binding method.
		return ( //Returning the component wraper with everithing inside it
			<div className="container-fluid"> {/* Begin binding inside a container-fluid*/}
				{/*<LineItems
					items={this.state.lineItems}
					currencyFormatter={this.formatCurrency}
					addHandler={this.handleAddLineItem}
					changeHandler={this.handleLineItemChange}
					focusHandler={this.handleFocusSelect}
					deleteHandler={this.handleRemoveLineItem}
					reorderHandler={this.handleReorderLineItems}
				/>
				*/}
				{this.protectPage() /* Redirencting to login in case user has no permission to access this resource */}
				<div className="table-responsive"> {/* Begin table responsive container for material table*/}

					<MaterialTable //Begin Material table as dynamic table
						title={ //Begin table title 
							<div> {/* Begin container for Button save */}
								<button className="btn angoButton" hidden={this.state.hideSave} disabled={this.state.disableSave} //Begin Button to open Save modal
									onClick={() => { //Begin Onclick for Button Save to open modal to save data
										this.setState( //Begin setting variables for saving, then open modal 
											{ //Begin resetting capturedRow and setting  dataForModal for Insert
												capturedRow: {}, dataForModal: { 'route': this.props.DBRoute, 'listenMessage': this.state.dataGet, 'operation': 'Insert', 'data_to_send': [{ 'table': this.state.DBTable, 'fields': [], 'values': [] }] }
											}, //End resetting capturedRow and setting  dataForModal for insert
											() => { //Begin openning save modal after state variables are set
												this.handleShowModalSave();
											} //End openning save modal after state variables are set
										) //End setting variables for saving, then open modal 
									}} //End Onclick for Button Save to open modal to save data
								> {/* Begin Button save */}
									{<div>{this.props.titleSave}</div>} {/* The title for specific module */}
								</button> {/* End Button to open Save modal */}
								<p>{this.state.error}</p> {/* The eventual error for specific module */}
							</div> //End container for Button save
						}  //End table title 
						columns={this.state.tableColumns} //Adding the array of columns for data go be presented
						data={this.state.data} //Adding the array with assynchronous data from the server to the table
						localization={{ //Begin the table header and footer information 
							body: { //Begin some additional data for the inner of the table
								emptyDaSourceMesage: this.props.emptyMessage //TODO: Not working....
							}, //End some additional data for the inner of the table
							toolbar: this.props.toolbar, //Searchbox data and other future header if we need it later
							header: { //Begin other important header to complete toolbar
								actions: this.props.actionsTitle, //Search hint
							}, //End other important header to complete toolbar
							pagination: this.props.pagination, //The icons to appear on the footer. 
						}} //End the table header and footer information 
						actions={[ //Begin table actions (eg. Edit, Delete)
							{ //Begin Edit action
								icon: 'edit', //No need action add because we need only one Button for add
								tooltip: this.props.editButtonHint, //Hint for Button Edit
								disabled: this.state.disableEdit, //Enabled or disabled
								hidden: this.state.hideEdit, //Hide or show
								onClick: (object, rowData) => { //Begin Edit click - object is a class we do not need
									this.setState({ //Begin set state for edit dataForModal, get capturedRow to fill the form fields
										capturedRow: rowData, dataForModal: { 'route': this.props.DBRoute, 'listenMessage': this.state.dataGet, 'operation': 'Update', 'data_to_send': [{ 'table': this.state.DBTable, 'fields': [], 'values': [] }] }
									}, //End set state for edit dataForModal, get capturedRow to fill the form fields
										() => { //Begin set state callback where we set the table key (s) to be updated
											for (var i = 0; i < this.state.DBTableID.length; i++) { //Begin DB table id manipulation
												this.updateDataForModal(this.state.DBTableID[i], rowData[this.state.DBTableID[i]], null); //Updating data for modal
											} //End DB table id manipulation
											this.handleShowModalEdit(); //Showmodal with edit configurations
										} //End set state callback where we set the table key (s) to be updated
									) //End Edit setstate 
								} //End Edit click 
							}, //End Edit action
							{ //Begin Delete action
								icon: 'delete', //Action delete
								disabled: this.state.disableDelete, //Enabled or disabled
								hidden: this.state.hideDelete, //Hide or show
								tooltip: this.props.deleteButtonHint, //Hint for Button Delete
								onClick: (object, rowData) => { //Begin Edit click. notice object != Object (the js Object with functions like keys, values, etc.) 
									var someRowData = ''; //string to handle only the fields to be used as record label for delete modal
									for (var i = 0; i < this.state.DBTableLabel.length; i++) { //Begin DB table record label handle
										someRowData += rowData[this.state.DBTableLabel[i]] + ' '; //Add a string for label with a space for concatanation with the next label value
									} //End DB table record label handle
									this.setState({ //Begin set state for delete dataForModal, get capturedRow (id) to fill the form fields. The id and a label from capturedRow are used in modal
										stringLabel: someRowData, dataForModal: { 'route': this.props.DBRoute, 'listenMessage': this.state.dataGet, 'operation': 'Delete', 'data_to_send': [{ 'table': this.state.DBTable, 'fields': [], 'values': [] }] }
									}, //End set state for delete dataForModal, get capturedRow (id) to fill the form fields. The id and a label from capturedRow are used in modal
										() => { //Begin set state callback where we set the table key (s) to be deleted
											let id = this.state.DBTableID.length;
											for (var i = 0; i < id; i++) { //Begin DB table id manipulation
												this.updateDataForModal(this.state.DBTableID[i], rowData[this.state.DBTableID[i]], null); //Updating data for modal
											} //End DB table id manipulation												
											this.handleShowModalDelete();
										} //End set state callback where we set the table key (s) to be deleted
									) //End set state for delete dataForModal, get capturedRow (id) to fill the form fields
								} //End Edit click 
							}, //End Delete action
							{ //Begin Locked action
								icon: 'lock', //Other action. //NoEncryption, http, https,  Lock, LockOpen //icon: 'https://www.google.com/search?q=icons&sxsrf=ACYBGNR8rnVkLFcFMARSyLK3fd8XWcAMew:1574969101803&source=lnms&tbm=isch&sa=X&ved=2ahUKEwjWkeGO0Y3mAhUJ8BQKHfx0AsYQ_AUoAXoECAoQAw&biw=1920&bih=952#imgrc=MXFEHLPfuMd_dM:',
								tooltip: this.props.lockButtonHint, //Hint for Button Locked
								onClick: () => { alert(this.props.lockButtonMessage) }, //TODO...
								disabled: false, //Enabled or disabled
								hidden: false, //Hide or show
							} //End Locked action
						]} //End table actions (eg. Edit, Delete)
						options={{ //Begin formating options for our table
							actionsColumnIndex: -1, //The column for the Actions (update, delete, etc.). 0 is 1st, 1 is 2nd, -1 is last
							actionsCellStyle: { color: this.props.iconsColor }, //The icons color
							rowStyle: rowData => ({	 //Begin analysing whether row id is odd or even to set different style (TODO: See when id is set to 1,2,3...)
								backgroundColor: (rowData.tableData.id % 2) ? this.props.evenColor : this.props.oddColor //Table line background color. tableData is the default material table key where the id key is defined for each row
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
					> {/* End Material table properties */}
					</MaterialTable> {/* End Material table as dynamic table */}
				</div> {/* End table responsive container for material table */}
				<div align="center"> {/* Begin container for Save/Edit and Delete Modals */}
					<Modal //Begin react Modal from react-bootstrap
						//size="xl" //This property should be used for static modal.
						//For more properties: https://react-bootstrap.github.io/components/modal/#modal-custom-sizing
						show={this.state.showModalSaveEdit} //Show or not
						onHide={() => { this.handleCloseSaveEditModal() }} //Action to be performed by clicking the windows-like close button
						dialogClassName="main-modal" //CSS class
						centered //Vertically centered
					> {/* End Modal properties*/}
						<Modal.Header //Begin Modal Header
							closeButton //Adding traditional close button to the header as a prop. Other icones may also be added
						> {/* End Modal header properties*/}
							<Modal.Title id="example-custom-modal-styling-title">{this.state.modalTitle}</Modal.Title>  {/* The modal title either for save or delete */}
						</Modal.Header> {/* End Modal Header */}
						<Modal.Body> {/* Begin Delete Modal Body */}
							<Tabs> {/* Begin modal tabs for different form sections */}
								<TabList> {/* Begin modal tabs's titles for different form sections */}
									{ //Begin javascript for TabList of general type
										Tables.tables[this.props.DBTable].tabs.map((tab, index) => ( //Begin mapped data for tabs iteration 
											<Tab key={index} onClick={() => { this.setState({ hideButton: false }) }}>{tab.label}</Tab> //Setting each tab title
										)) //End mapped data for tabs iteration 
									} {/* End javascript for TabList of general type */}
									{ //Begin javascript for TabList of tableTabs type
										(Tables.tables[this.props.DBTable].tableTabs)
											? Tables.tables[this.props.DBTable].tableTabs.map((tab, index) => ( //Begin mapped data for tabs iteration 
												<Tab key={index} onClick={() => { this.setState({ hideButton: true }); }}>{tab.label}</Tab> //Setting each tab title
											)) //End mapped data for tabs iteration 
											: <div></div>
									} {/* End javascript for TabList  of tableTabs type*/}

								</TabList> {/* End modal tabs's titles for different form sections */}
								{ //Begin javascript for TabPanel (The tabs's data)
									Tables.tables[this.props.DBTable].tabs.map((form, index1) => ( //Begin mapped data for tabs iteration 
										<TabPanel key={index1}> {/* Begin Each tab containing a form */}
											{ //Begin Javascript for tab content
												<form> {/* Begin Save/Edit Form TODO: Remove form tag*/}
													{ //Begin form data 
														form.tab.rows.map((row, index2) => (  //Begin map for each form tab containing more than one row
															<div className="form-row" key={index2}> {/* Begin form row */}
																{ //Begin Javascript for form row content
																	row.fields.map((field, index3) => ( //Begin mapping row containing more than one field (column)
																		<div className="col-md-3 mb-3" key={index3}> {/* Begin columns (fields) */}
																			<label htmlFor="validationServer01">{field.label}</label> {/* Field label */}
																			{this.generateInput(field)} {/* Specific input according to the data provided */}
																			<div className="invalid-feedback"> {/* Begin validation message */}
																				{this.evaluatePatternError(field)} {/* get the message whether it's valid or not */}
																			</div> {/* End validation message */}
																		</div> //End columns (fields)
																	)) //End mapping row containing more than one field (column)
																} {/* End Javascript for form row content */}
															</div> //End form row
														)) //End map for each form tab containing more than one row
													} {/* End form data */}
												</form> //End Save/Edit Form
											} {/* End Javascript for tab content */}
										</TabPanel> // End Each tab containing a form
									)) //End mapped data for tabs iteration 
								} {/* End javascript for TabPanel (The tabs's data) */}
								{ //Begin general Table  (MaterialTable)
									(Tables.tables[this.props.DBTable].tableTabs) //Begin conditional rendering of tableTabs (if it exists it will be shown)
										? Tables.tables[this.props.DBTable].tableTabs.map((tableTab, index) => ( //Begin mapped data for tabs iteration 
											<TabPanel key={index}> {/* Begin Each tab containing a form */}
												<MaterialTable //Begin Material table as dynamic table
													title={tableTab.title} //table title 
													//columns={this.state.historyTableColumns} //Adding the array of columns for data go be presented
													columns={this.state[tableTab.label]} //Adding the array of columns for data go be presented
													data={this.state[tableTab.title]} //Adding the array with assynchronous data from the server to the table
													localization={{ //Begin the table header and footer information 
														body: { //Begin some additional data for the inner of the table
															emptyDaSourceMesage: this.props.emptyMessage //TODO: Not working....
														}, //End some additional data for the inner of the table
														toolbar: this.props.toolbar, //Searchbox data and other future header if we need it later
														header: { //Begin other important header to complete toolbar
															actions: this.props.actionsTitle, //Search hint
														}, //End other important header to complete toolbar
														pagination: this.props.pagination, //The icons to appear on the footer. 
													}} //End the table header and footer information 
													options={{ //Begin formating options for our table
														actionsColumnIndex: -1, //The column for the Actions (update, delete, etc.). 0 is 1st, 1 is 2nd, -1 is last
														actionsCellStyle: { color: this.props.iconsColor }, //The icons color
														rowStyle: rowData => ({	 //Begin analysing whether row id is odd or even to set different style (TODO: See when id is set to 1,2,3...)
															backgroundColor: (rowData.tableData.id % 2) ? this.props.evenColor : this.props.oddColor //Table line background color. tableData is the default material table key where the id key is defined for each row
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
												> {/* End Material table properties */}
												</MaterialTable> {/* End Material table as dynamic table */}
											</TabPanel> // End Each tab containing a form
										)) //End mapped data for tabs iteration 
										: <div></div> //Show nothing in case tableTabs doesn't exist
								} {/* End general Table  (MaterialTable) */}
								{ //Begin tableTabs Table  (MaterialTable)
									(Tables.tables[this.props.DBTable].tableTabs) //Begin conditional rendering of tableTabs (if it exists it will be shown)
										? Tables.tables[this.props.DBTable].tableTabs.map((tableTab, index) => ( //Begin mapped data for tabs iteration 
											<TabPanel key={index}> {/* Begin Each tab containing a form */}
												<MaterialTable //Begin Material table as dynamic table
													title={tableTab.title} //table title 
													//columns={this.state.historyTableColumns} //Adding the array of columns for data go be presented
													columns={this.state[tableTab.label]} //Adding the array of columns for data go be presented
													data={this.state[tableTab.title]} //Adding the array with assynchronous data from the server to the table
													localization={{ //Begin the table header and footer information 
														body: { //Begin some additional data for the inner of the table
															emptyDaSourceMesage: this.props.emptyMessage //TODO: Not working....
														}, //End some additional data for the inner of the table
														toolbar: this.props.toolbar, //Searchbox data and other future header if we need it later
														header: { //Begin other important header to complete toolbar
															actions: this.props.actionsTitle, //Search hint
														}, //End other important header to complete toolbar
														pagination: this.props.pagination, //The icons to appear on the footer. 
													}} //End the table header and footer information 
													options={{ //Begin formating options for our table
														actionsColumnIndex: -1, //The column for the Actions (update, delete, etc.). 0 is 1st, 1 is 2nd, -1 is last
														actionsCellStyle: { color: this.props.iconsColor }, //The icons color
														rowStyle: rowData => ({	 //Begin analysing whether row id is odd or even to set different style (TODO: See when id is set to 1,2,3...)
															backgroundColor: (rowData.tableData.id % 2) ? this.props.evenColor : this.props.oddColor //Table line background color. tableData is the default material table key where the id key is defined for each row
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
												> {/* End Material table properties */}
												</MaterialTable> {/* End Material table as dynamic table */}
											</TabPanel> // End Each tab containing a form
										)) //End mapped data for tabs iteration 
										: <div></div> //Show nothing in case tableTabs doesn't exist
								} {/* End tableTabs Table  (MaterialTable) */}

							</Tabs> {/* End modal tabs for different form sections */}
							<div> {/* Begin Save/Edit Button container */}
								<button className="btn angoButton" hidden={this.state.hideButton} //Begin Save/Edit Buutton
									onClick={() => { //Begin Save/Edit save Button
										if (this.state.countErrors.length === 0) { //Begin checking if all fields are valid								
											let idToSend = []; //Get the table id from state
											for (var i = 0; i < this.state.DBTableID.length; i++) { //Begin DB table id manipulation
												let index = this.state.dataForModal.data_to_send[0].fields.indexOf(this.state.DBTableID[i]); //Get the index of the id field to follow our standard
												idToSend.push({ 'key': this.state.DBTableID[i], 'value': this.state.dataForModal.data_to_send[0].values[index] }); //Get the id value associated to the id field name
											} //End DB table id manipulation
											let aux = this.state.dataForModal; //Aux to not mutate state
											aux.data_to_send[0].id = idToSend; //Add the id array of json json to data_to_send
											this.setState({dataForModal: aux}, ()=>{
												socket.emit(this.state.dataSend, this.state.dataForModal, this.state.user ? this.state.user.token_cliente : null, this.state.componentID); //Send the message for post request to the realtime API. TODO: add authentication credentials
											}); //modify dataForModal no matter in which condition the fiels where modified
											auxiliaryFunctions.getLocalization((callback) => {
												let data = { 'route': 'users/history', 'listenMessage': 'devolverLoginHistory', 'operation': 'Insert', 'data_to_send': [{ 'table': 'history', 'fields': ['local', 'acao', 'latitude', 'longitude'], 'values': ["'later'", "'" + this.state.dataForModal.operation + ' -> ' + this.state.dataForModal.data_to_send[0].table + "'", "'" + callback.latitude + "'", "'" + callback.longitude + "'"], 'id': {} }] } //capturedRow with only modified values to send to the sever. operation= 'Insert | Udate | Delete'. TODO Insert? Where is Update
												socket.emit(this.state.dataSend, data, this.state.user ? this.state.user.token_cliente : null, null); //Since we haven't token yet we can only use username
											});
											let saveEditMessage = ''; //Variable for good message
											if (this.state.dataForModal.operation === 'Insert') { //Begin setting message for Insert
												saveEditMessage = this.props.successSave; //Get the specific succefully message for save
											} //End setting message for Insert
											else { //else if (this.state.dataForModal.operation === 'Update')
												saveEditMessage = this.props.successEdit; //Get the specific succefully message for Edit
											} //End setting message for Edit
											this.setState({ saveEditDeleteMessage: saveEditMessage }); //Setting the success message for the "error" to replace the error
										} //End checking if all fields are valid	
										else { //Begin Save/Edit save Button error
											this.setState({ error: this.state.validationError }); //Data validation error!!!. TODO: Add one more key in mapeamentos to handle this specific client error
										} //End Save/Edit save Button error
									}} //End Save/Edit save Button
								> {/* End Save/Edit Button props */}
									{this.state.saveButton}
								</button> {/* End Save/Edit Buutton */}
							</div> {/* End Save/Edit Button container */}
							<div><p>{this.state.error}</p></div> {/* Save/Edit error */}
							{/*<div> {/* Begin Save/Edit Back Button container */}
							{/*<button className="angoButton backButton btn" onClick={() => {this.handleCloseSaveEditModal();}}><h2>{this.props.backButton}</h2></button> {/* Back Button */}
							{/*</div> {/* End Save/Edit Back Button container */}
						</Modal.Body> {/* End Delete Modal Body */}
					</Modal> {/* End react Modal from react-bootstrap */}
					<Modal //Begin react Modal from react-bootstrap
						//size="xl" //This property should be used for static modal.
						//For more properties: https://react-bootstrap.github.io/components/modal/#modal-custom-sizing
						show={this.state.showModalDelete} //Show or not
						onHide={() => { this.handleCloseDeleteModal() }} //Action to be performed by clicking the windows-like close button
						dialogClassName="main-modal" //CSS class
						centered //Vertically centered
					> {/* End Modal properties*/}
						<Modal.Header //Begin Modal Header 
							closeButton //Adding traditional close button to the header as a prop. Other icones may also be added
						> {/* End Modal header properties*/}
							<Modal.Title id="example-custom-modal-styling-title">{this.state.modalTitle}</Modal.Title> {/* Adding the modal title */}
						</Modal.Header> {/* End Modal Header */}
						<Modal.Body> {/* Begin Delete Modal Body */}
							<h1>{this.state.messageDelete}</h1> {/* Delete specific modal title according to the module */}
							<p>{this.state.stringLabel}</p> {/* Specific label for the delete confirmation */}
							<button className="btn angoButton" hidden={this.state.hideButton} //Begin Save/Edit Buutton
								onClick={() => { //Begin delete button onclick
									let idToSend = []; //Get the table id from state
									for (var i = 0; i < this.state.DBTableID.length; i++) { //Begin DB table id manipulation
										let index = this.state.dataForModal.data_to_send[0].fields.indexOf(this.state.DBTableID[i]); //Get the index of the id field to follow our standard
										idToSend.push({ 'key': this.state.DBTableID[i], 'value': this.state.dataForModal.data_to_send[0].values[index] }); //Get the id value associated to the id field name
									} //End DB table id manipulation
									let aux = this.state.dataForModal; //Aux to not mutate state
									aux.data_to_send[0].id = idToSend; //Add the id array of json json to data_to_send
									this.setState({dataForModal: aux}, ()=>{
										socket.emit(this.state.dataSend, this.state.dataForModal, this.state.user ? this.state.user.token_cliente : null, this.state.componentID); //Send the message for post request to the realtime API
									}); //modify dataForModal no matter in which condition the fiels where modified
									auxiliaryFunctions.getLocalization((callback) => {
										let data = { 'route': 'users/history', 'listenMessage': 'devolverLoginHistory', 'operation': 'Delete', 'data_to_send': [{ 'table': 'history', 'fields': ['local', 'acao', 'latitude', 'longitude'], 'values': ["'later'", "'" + this.state.dataForModal.operation + ' -> ' + this.state.dataForModal.data_to_send[0].table + "'", "'" + callback.latitude + "'", "'" + callback.longitude + "'"], 'id': {} }] } //capturedRow with only modified values to send to the sever. operation= 'Insert | Udate | Delete'
										socket.emit(this.state.dataSend, data, this.state.user ? this.state.user.token_cliente : null, null); //Since we haven't token yet we can only use username
									});
									this.setState({ saveEditDeleteMessage: this.props.successDelete }); //Setting the global message as delete message
								}} //End delete button onclick
							> {/* End delete button props */}
								{this.props.deleteButton} {/* Delete Button text */}
							</button> {/* End delete button */}
							<div><p>{this.state.error}</p></div>{/* Delete error */}
							{/*<div> {/* Begin back button container */}
							{/*<button className="angoButton backButton btn" onClick={() => {this.handleCloseDeleteModal();}}> <h2>{this.props.backButton}</h2> </button> {/* Back button */}
							{/*</div> {/* End back button container*/}
						</Modal.Body> {/* End Delete Modal Body */}
					</Modal> {/* End react Modal from react-bootstrap */}
				</div> {/*End container for Save/Edit and Delete Modals*/}
				{/*<div>{this.props.children}</div>*/}
				{/* End main */}
				<Modal //Begin react Modal from react-bootstrap 
					show={this.state.openImage} //Show or not 
					onHide={() => {this.handleCloseImage()}} //Action to be performed by clicking the windows-like close button
					dialogClassName="main-modal" //CSS class
					centered //Vertically centered
				> {/* End Modal properties*/}
					<Modal.Header //Begin Modal Header
						closeButton //Adding traditional close button to the header as a prop. Other icones may also be added
					> {/* End Modal header properties*/}
						<Modal.Title id="example-custom-modal-styling-title">Previsualização de imagem</Modal.Title> {/* Adding the modal title */}
					</Modal.Header> {/* End Modal Header */}
					<Modal.Body> {/* Begin Delete Modal Body */}
						<div>
							{this.handleCreateBigImage()}
						</div>
					</Modal.Body> {/* End Payment Modal Body */}
				</Modal>
			</div> // End binding inside a container-fluid
		) //End returning the component wraper with everything inside it
	} //End Binding method
} //End Component (class) DynamicTable for ango_restapi Application - 6292a9bb828f4cfbd5b16ba4a3c1228b6db7f188996a20c2c89998ea49ae6a48311add05e3b89b1f616afdeb7b32dc004cce351bdbd6ec9c6dcda57071e25513
export default DynamicTable; //Exporting DynamicTable. It could be in the class declaration moment.
