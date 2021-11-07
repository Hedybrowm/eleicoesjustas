/**
 * @api {JANELA} TEMPLATE Template reutilizável
 * @apiName Template
 * @apiGroup Template
 *
 * @apiDescription Template
 * - Template reutilizável em toda aplicação
 */
import React from 'react'; 
//import {Link} from "react-router-dom";
//import { userService } from './userService';
//import Popup from "reactjs-popup";
//import ReactModal from 'react-modal';
import openSocket from 'socket.io-client'; //Importing Websocket Client to access the realtime API which uses sockets.io
//import Modal from 'react-bootstrap/Modal'; //Modals are unmounted when closed. Bootstrap only supports one modal window at a time. With react-overlays we can
import SelectData from './Select'; //Importing our dynamic select
import Dropzone from 'react-dropzone'; //The drag an drop component
const auxiliaryFunctions = require ('./utils'); //Auxiliary functions
var Tables = require ('./Mapeamentos'); //Creating an instance containing all tables with specific data to be used in this dynamic table
const Languages = require('./Idiomas.js'); //Importing the file containing all the strings for each language
//const auxiliaryFunctions = require ('./utils'); //Auxiliary functions
var currentLanguage = (window.navigator.language || window.navigator.userLanguage).toLowerCase(); //The choosen language which should be dynamic. This should be in lower case because some Browsers like chrome use a format like pt-PT, en-GB and others use pt-PT, en-BG, etc. 
if (!Languages.languages[currentLanguage]){ //Begin evaluating current language
	currentLanguage = "en-gb";//If the currentLanguage is not defined in idiomas.js, then the system should assume the international language (en-gb)
} //End evaluating current language
//TODO: Bring the implementation of the chart from index.html to here
const hosts = require('../hosts'); //Using hosts (eg. servers) to be conected with the current application
const socket = openSocket(hosts.realtimeAPI); //creating a client instance conected to our websocket server (the sockets.io realtime server)

//var fileDownload = require('js-file-download'); //For file download

export default class Template extends React.Component{
	constructor(props) {
		super(props);

		this.state = {
			user: JSON.parse (localStorage.getItem('token_eleicoes')),
			permissionsEleicoes: localStorage.getItem('permissions_eleicoes'),
			component: 0, //The current component
			error: '', //To handle any error
			//height: window.innerHeight, //To handle screen height
			//width: window.innerWidth //To handle screen width
			showModalHelp: false, 
			showModalUser: false, //TODO: User will be another page intead
			language: currentLanguage, //The system language. TODO: Perhaps it will be passed by props
			//TODO: Language should only be passed here!!! Other files should receive it 
			capturedRow: {}, //A selected row, as it will be assynchronous, if we do not declare here, it won't be accessed after being rendered. Dictionary (json) containing all the data in the row to edit (modified fields) or delete (id)
			countErrors: [], //All fields with errors will be here, if the quantity is > 0, then the validation failed, so an error should be shown
			DBRoute: 'users', //DB Backend route for this component 
			dataSend: 'GetPostPutDeleteUtilizadores', //Socket message to get data. TODO: This won't exist any longer since we'll get data from the same route we retrieve from
			dataGet: 'devolverUtilizador', //Socket message to handle gotten data. 
			DBTable: 'utilizadores', //DB Table for this component
			componentID: Tables.tables["utilizadores"].componentID,
			DBTableID: ['id'], //DB Table Primary Key for this component
			dataForModal: {'route': 'users/user', 'listenMessage': 'devolverUtilizador', 'operation': 'none' , 'data_to_send':[{'table':'utilizadores', 'fields':[], 'values':[], 'id':{}}]}, //capturedRow with only modified values to send to the sever. operation= 'Insert | Udate | Delete'
			titleEdit: Languages.languages[currentLanguage].Utilizadores.titleEdit, //Page Edit tittle
			editButton: Languages.languages[currentLanguage].Utilizadores.editButton, //Button Edit Label
			errorEditClient: Languages.languages[currentLanguage].Utilizadores.errorEditClient, //Client Side  Error message in case case of some exception during PUT
			errorEditServer: Languages.languages[currentLanguage].Utilizadores.errorEditServer, //Server Side  Error message in case case of some exception during PUT
			serverOffline: Languages.languages[currentLanguage].General.serverOffline, //Server error message. TODO: edit this message
			successEdit: Languages.languages[currentLanguage].Utilizadores.successEdit, //Success PUP message
			imageFields: {'samplefield': {localImageList: [], serverImageList: []}}, //A dictionary containing all image fields, each image field contains two lists of images (local's and server's)
			bigImage: {}
		};
	}
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
					imageList.map((image, index) =>( //Index already applied above
						image
					))
				}
			</div>	
		) //End returning a div containing one or more images
	} //End generation images for preview
	updateDataForModal = (field, value, extra) => { //Begin function to update values to send to the server when user updates some field
		//console.log ("updateDataForModal");
		let index = this.state.dataForModal.data_to_send[0].fields.indexOf(field); //Get the index of this field was already modified  (if it is in data_to_send)
		let aux = this.state.dataForModal; //Aux to not mutate state
		if (index > -1) { //Beging checking if the field is in data_to_send
			aux.data_to_send[0].values[index] = "'"+value+"'"; //Updating with the new value
		} //End checking if the field is in data_to_send
		else if (!extra){ //Beging else if the field is not in data_to_send
			aux.data_to_send[0].fields.push(field); //Add the field to data_to_send
			aux.data_to_send[0].values.push("'"+value+"'"); //Add value associated to the field to data_to_send
		} //End else if the field is not in data_to_send.
		//Saving images in an array for preview
		else { //Begin evaluating if there is an extra (normally for local images)
			aux.data_to_send[0].fields.push(field); //Add the field to data_to_send. TODO: format for several images
			aux.data_to_send[0].values.push("'"+value+"'"); //Add value associated to the field to data_to_send
			let localImageList = []; // All images
			localImageList.push(extra.image); //Image to upload.	
			this.setState({imageFields: {...this.state.imageFields, [extra.key]: localImageList}});
		} //End evaluating if there is an extra (normally for images)
		this.setState({dataForModal: aux}); //modify dataForModal no matter in which condition the fiels where modified
	} //End function to update values to send to the server when user updates some field
	componentDidMount() {
		this.buscarDados(); //Get data to the websocket server. TODO: improve the performance
		//Handle the data sent by the server with a timeout, so the server should send a response within this time
		this.devolverDados((res) => { //Begin handling data sent by the the server. TODO: improve efficiency (beyond effectiveness)
			if (res.status === 200) { //Begin checking if we have a good reponse from server
				if(res.data.status === 400){ //Begin handling Client error during req
					this.setState({ //Begin setting the error in case of 400 response
						error: this.state.specificClientError //Each component should have its own error and validation
					}); //End setting the error in case of 400 response
				}  //End handling Client error during req
				else{ //Begin success response
					for (var user of res.data.data){ //Begin iterating through all users
						if (user.token_cliente === this.state.user ? this.state.user.token_cliente : null){ //Bergin finding current user. TODO: add a route for single user
							this.setState({capturedRow: user, user: user}); //Put the array of jsons into capturedRow even if it's undefined (for timeout)
							break;
						} //End finding current user. TODO: add a route for single user. Also update everything in realtime
					} //End iterating through all users
					if (res.data.data !== undefined){ //Begin checking if the response is not undefined
						this.setState({error: this.state.saveEditDeleteMessage}); //Update error after a CRUD operation only in case of success!
					} //End checking if the response is not undefined
					else{ //Begin checking if the response is undefined
						this.setState ({ //Begin setting server error
							error: this.state.serverOffline //Setting server error
						}) //End setting server error
					} //End checking if the response is undefined
				} //End success response
			} //End checking if we have a good reponse from server
			else{ //Begin checking if there's an error with the server
				this.setState({ //Begin setting state for server error
					error: this.state.specificServerError //Get the data from the server on value state
				}); //End setting state for server error
			} //End checking if there's an error with the server
		}); ////End handling data sent by the the server.
		setTimeout( ()=> { //Begin setting a timeout for waiting server response. TODO: Needs more analysis!...
			if (this.state.capturedRow !== undefined){ //Begin checking if the realtime API didn't send an undefined json in case the data server is unavailable
				if (this.state.capturedRow.length === 0){ //Begin checking if the server sent the assynchronous response in useful time
					this.setState ({ //Begin setting server error 
						error: this.state.serverOffline
					}) //End setting server error
				} // End checking if the server sent the assynchronous response in useful time
			} //End checking if the realtime API didn't send an undefined json
			else{ //Begin checking if the realtime API sent an undefined
				this.setState ({ //Begin setting server error
					error: this.state.serverOffline
				}) //End setting server error
			} //End checking if the realtime API sent an undefined
		}, this.state.timeout); //End setting a timeout for waiting server response
	} //End componentDidMount for assynchronous handling

	handleOpenModalHelp = () => {
		this.setState({ showModalHelp: true });
	}

	handleCloseModalHelp = () => {
		this.setState({ showModalHelp: false });
	}

	handleOpenModalUser = () => {
		this.setState({ //Begin set state for edit dataForModal, get capturedRow to fill the form fields
			dataForModal: {'route':this.state.DBRoute, 'listenMessage': this.state.dataGet, 'operation': 'Update' , 'data_to_send':[{'table': this.state.DBTable, 'fields':[], 'values':[]}]} 
		}, //End set state for edit dataForModal, get capturedRow to fill the form fields
			() => { //Begin set state callback where we set the table key (s) to be updated
				for (var i=0; i<this.state.DBTableID.length; i++){ //Begin DB table id manipulation
					this.updateDataForModal (this.state.DBTableID[i], this.state.capturedRow[this.state.DBTableID[i]], null); //Updating id data for modal
				} //End DB table id manipulation
				this.setState({ showModalUser: true, modalTitle: this.state.titleEdit, saveButton: this.state.editButton, error: '', specificClientError: this.state.errorEditClient, specificServerError: this.state.errorEditServer});
			} //End set state callback where we set the table key (s) to be updated
		) //End Edit setstate 
	}

	handleCloseModalUser = () => {
		this.setState({imageFields: {'samplefield': []}, showModalUser: false, modalTitle: '', saveButton: '', error: '', dataForModal: {'route':this.state.DBRoute, 'listenMessage': this.state.dataGet,'operation': 'none' , 'data_to_send':[{'table':this.state.DBTable, 'fields':[], 'values':[], 'id':{}}]}}) //Set modal variables as default. 
	}

	handleSubmitForm  = (event) => {
		event.preventDefault();//cancells the evet, without stopping its propagation
	}

	evaluatePattern = (field) => { //Begin function to validate each field according to expected pattern. This function is evaluating all fields all the time (TODO..)
		if (field.field in this.state.capturedRow){ //Begin checking if the field is in capturedRow (modified) to be validated 
			var isValid = (field.regex !== "") ? !(field.regex.test(this.state.capturedRow[field.field])) : true; //Compare the inserted field with expected pattern with the inserted value
			if (isValid) { //Begin checking if the pattern is valid. 
				if (this.state.countErrors.includes (field.field)){ //Begin checking if the field is already in countErrors (was wrong before)
					let index = this.state.countErrors.indexOf (field.field); //Get index of the current field in countErrors
					this.state.countErrors.splice (index, 1); //Remove the field from countErrors
				} //End checking if the field is already in countErrors (was wrong before)
				return 'form-control is-valid'; //Return the value to use in the field className
			} //End checking if the pattern is valid.
			else{ //Begin the case if the pattern is not valid.
				if (!(this.state.countErrors.includes (field.field))){ //Begin checking if the field isn't in countErrors yet
					this.state.countErrors.push (field.field); //Insert the field in countErrors 
				} //End checking if the field isn't in countErrors yet
				return 'form-control is-invalid'; //Return the value to use in the field className
			} //End the case if the pattern is not valid.
		} //End checking if the field is in capturedRow (modified) to be validated
		else{  //Begin checking if the field is not in capturedRow (not modified)
			return 'form-control is-valid'; //Return the valid value as field wasn't modified yet to use in the field className
		} //End checking if the field is not in capturedRow (not modified). TODO: Handle the case for required fields
	} //End function to validate each field according to expected pattern
	evaluatePatternError = (field) => { //Begin validation for each field according to expected pattern and return a valid or invalid message
		if (field.field in this.state.capturedRow){ //Begin checking if the field is in capturedRow (modified) to be validated 
			var isValid = (field.regex !== "") ? !(field.regex.test(this.state.capturedRow[field.field])) : true; //Compare the inserted field with expected pattern with the inserted value
			if (isValid){ //Begin checking if the pattern is valid. 
				return ''; //Empty message in case field is correct. TODO: Handle the case for required fields
			} //End checking if the pattern is valid.
			else{ //Begin checking if the pattern is not valid. 
				return field.error; //returning the field error
			} //End checking if the pattern is not valid. 
		} //End checking if the field is in capturedRow (modified) to be validated 
		//else{ //Begin checking if the field is not in capturedRow (not modified). TODO: No need to return '' if the field is not in capturedRow?!
			//return ''; //TODO: Review this method: why is this function being called twice? Perhaps we'll need to call it in ()=>{}
		//} //End checking if the field is not in capturedRow (not modified)
	} //End validation for each field according to expected pattern and return a valid or invalid message

	generateInput = (field) => { //Begin function to return specific html field according to the field input property. TODO: find a way to not call this function for all fields all the time (page shuould not render all the time)
		//console.log (field.field, " -> ", this.state.capturedRow[field.field])
		if ((field.component === "input") && (field.type !== "file") && (field.type !== "drag_n_drop")){ //Begin checking if the current field is a commom input
			return( //Begin returning an input with evaluated pattern. TODO: set a valid id for each field
				<input type={field.type} className={this.evaluatePattern (field)} id="validationServer01" value={!this.state.capturedRow[field.field] ? "" : this.state.capturedRow[field.field]}  //Begin input component
					onChange={(event) => { //Begin handle change for the current component
						this.setState({error: '', capturedRow:{...this.state.capturedRow, [field.field]:  event.target.value}}); //Add the current value from input to capturedRow
						this.updateDataForModal (field.field, event.target.value, null); //Updating dataForModal dict (json) with the modified value and its associated field
					}} //End handle change for the current component 
				/> // End input component
			) //End returning an input 
		} //End checking if the current field is a commom input 
		else if (field.component === "select"){ //Begin checking if the current field is a Select
			return ( //Begin returning an input with evaluated pattern. TODO: set a valid id for each field
				<SelectData className={this.evaluatePattern (field)} id="validationServer01" value={!this.state.capturedRow[field.field] ? "" : this.state.capturedRow[field.field]}  //Begin select component
				onChange={(event)=>{ //TODO: create handleChange method for the code below
					this.setState({error: '', capturedRow:{...this.state.capturedRow, [field.field]:  event.target.value}}); //Add the current value from input to capturedRow
					this.updateDataForModal (field.field, event.target.value, null); //Updating dataForModal dict (json) with the modified value and its associated field
					//alert (this.state.countErrors.length)
				}} //End handle change for the current component
				//TODO: Add here all props for this select
				> {/* End Select properties */}
				</SelectData> // End Select component
			) //End returning a SelectData (created by us) with evaluated pattern. TODO: set a valid id for each field
		} //End checking if the current field is a Select
		else if (field.type === "file"){ //Begin checking if the current field is a input type file
			//let serverImg = (!this.state.capturedRow[field.field]) ? "" : this.state.capturedRow[field.field];
			return ( //Begin returning an input with evaluated pattern. TODO: set a valid id for each field
				<input type="file"
					onChange={(event) => {//Begin handle change for the current component
						this.setState({error: '', capturedRow:{...this.state.capturedRow, [field.field]:  event.target.value}}); //Add the current value from input to capturedRow
						//this.updateDataForModal (field.field, auxiliaryFunctions.handleUploadFile(event), {"fieldType": field.type, "key":  field.key}); //Updating dataForModal dict (json) with the modified value and its associated field
						this.updateDataForModal (field.field, auxiliaryFunctions.handleUploadFile(event), {"fieldType": field.type, "key":  field.key, "image":  URL.createObjectURL (event.target.files[0])}); //Second approach of image upload.
					}} //End handle change for the current component 
				/> // End input component
			) //End returning a input type file (created by us) with evaluated pattern. TODO: set a valid id for each field
		} //End checking if the current field is a input type file
		else if (field.type === "drag_n_drop"){ //Begin checking if the current field is a input type file
			return ( //Begin returning an input with evaluated pattern. TODO: set a valid id for each field
				<Dropzone onDrop={acceptedFiles => auxiliaryFunctions.handleUploadFile2(acceptedFiles, callBack=>{
					//console.log ("imagens -> ", callBack);
					this.setState({error: '', capturedRow:{...this.state.capturedRow, [field.field]:  callBack}}); //Add the current value from input to capturedRow
					//this.updateDataForModal (field.field, callBack, {"fieldType": field.type, "key":  field.key}); //Updating dataForModal dict (json) with the modified value and its associated field
					//this.state.dataForModal.data_to_send[0].imagens = callBack;
					let aux = this.state.dataForModal; //Aux to not mutate state
					aux.data_to_send[0].imagens = callBack;
					this.setState({dataForModal: aux}); //modify dataForModal no matter in which condition the fiels where modified
					//alert (this.state.countErrors.length)
					})}
					value={this.state.capturedRow[field.field]} >
					{({getRootProps, getInputProps}) => (
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
		else if (field.type === "image"){ //Begin image preview
			//console.log (field.field)
			return (this.generateImages (field.associatedKey, field.field));
		} //End image preview
		else{ //if //Begin other kind of component
			//Other kinds of components different from input and input type file
			return (
				<div></div>
			)
		} //End other kind of component
	} //End function to return specific html input according to the field input property.
	buscarDados  = () => { //Begin emitting a request to the server when the page is loaded. get data for current user only
		socket.emit(this.state.dataSend, //Emitting a post request to the server. TODO: Use queries like select max(id) from tabele and getting only a table head with some records...
			{'route':this.state.DBRoute, listenMessage: this.state.dataGet, 'operation': 'SelectOne' , 'data_to_send':[{'table':this.state.DBTable, 'fields':[], 'values':[], 'id':{}}]},
			this.state.user ? this.state.user.token_cliente : null, this.state.componentID); //All routes in the servers should be according to this structure
	} //End emitting a request to the server when the page is loaded
	devolverDados  = (res) => { //Begin handling data sent by the server on a specific message
		socket.on(this.state.dataGet, response => res(response)); //Listening to the message
	} //End handling data sent by the server on a specific message

	handleOpenImage = (img, localImage) => {
		this.setState({openImage: true, bigImage: {"image": img, "local": localImage}});
	}

	handleCreateBigImage = () =>{
		return (this.state.bigImage.local ? <img className="bigImage" alt="Big Preview" src={this.state.bigImage.image} /> : <img className="bigImage" alt="Big Preview" src={hosts.ango_restapi + "/img/users/" + this.state.bigImage.image} />);
	}
	
	handleCloseImage = () => {
	this.setState({openImage: false});
	}

	render (){ 
		return (
			<div>
				O layout do design fica aqui!
			</div>
		);
	}
}

//export default Template;
//6292a9bb828f4cfbd5b16ba4a3c1228b6db7f188996a20c2c89998ea49ae6a48311add05e3b89b1f616afdeb7b32dc004cce351bdbd6ec9c6dcda57071e25513

