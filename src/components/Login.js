/**
 * @api {JANELA} LOGIN Iniciar Sessão
 * @apiName Login
 * @apiGroup Login
 *
 * @apiDescription Iniciar Sessão:
 * - Iniciar Sessão
 * - Recuperar Password
 * - Apoio do Suporte
 * - Guardar Password
 */

//TODO: use login form from mapeamentos
import React from 'react';
//import React, { useCallback } from 'react'; 
import openSocket from 'socket.io-client';
import { userService } from './userService';
import Modal from 'react-bootstrap/Modal'; //Modals are unmounted when closed. Bootstrap only supports one modal window at a time. With react-overlays we can
import {Link} from "react-router-dom";
const hosts = require('../hosts'); //Using hosts (eg. servers) to be conected with the current application
const socket = openSocket(hosts.realtimeAPI); //creating a client instance conected to our websocket server (the sockets.io realtime server)
const Languages = require('./Idiomas.js'); //Importing the file containing all the strings for each language
const auxiliaryFunctions = require ('./utils'); //Auxiliary functions
var currentLanguage = (window.navigator.language || window.navigator.userLanguage).toLowerCase(); //The choosen language which should be dynamic. This should be in lower case because some Browsers like chrome use a format like pt-PT, en-GB and others use pt-PT, en-BG, etc. 
if (!Languages.languages[currentLanguage]){ //Begin evaluating current language
	currentLanguage = "en-gb";//If the currentLanguage is not defined in idiomas.js, then the system should assume the international language (en-gb)
} //End evaluating current language
var Tables = require ('./Mapeamentos'); //Creating an instance containing all tables with specific data to be used in this dynamic table
export default class Login extends React.Component{
	constructor(props) {
		super(props);

		this.state = {
			users: [],
			username: '', //or email
			password: '', //TODO: make the password strong
			error: '',
			language: currentLanguage, //The system language. TODO: Implement some kind of parameterization and an option to choose language manually
			DBTable: 'userRecovery', //DB Table for this component
			DBRoute: 'users', //DB Backend route for this component
			DBTableID: ['id'], //DB Table Primary Key for this component
			countErrors: [], //All fields with errors will be here, if the quantity is > 0, then the validation failed, so an error should be shown
			capturedRow: {}, //A selected row, as it will be assynchronous, if we do not declare here, it won't be accessed after being rendered. Dictionary (json) containing all the data in the row to edit (modified fields) or delete (id)
			dataSend: 'GetPostPutDeleteUtilizadores', //Socket message to get data. TODO: This won't exist any longer since we'll get data from the same route we retrieve from
			dataForModal: {'route': 'users/recovery', 'listenMessage': 'devolverPasswordRecovery', 'operation': 'none' , 'data_to_send': [{'table': 'utilizadores', 'fields':[], 'values': [], 'id': {}}]}, //capturedRow with only modified values to send to the sever. operation= 'Insert | Udate | Delete'
			//TODO: Make dataForModal more genertal to handle signup, user recovery, etc.
			showUserData: "showDiv", //Show or hide the first element in a user confirmation modal
			showUserConfirmation: "hideDiv", //Show or hide the first element in a user confirmation modal
			showUserExtra: "hideDiv" //Show or hide the first element in a user confirmation modal
		};
	}

	componentDidMount() {
		this.username.focus();
		if (localStorage.getItem('keepConnected')){ //Begin checking if permissions_angosoftwares exists
			let connection = JSON.parse(localStorage.getItem('keepConnected'));
			this.setState({username: connection.username, password: connection.password})
		}
	}

	resetUserDataConfirmationExtra = () =>{
		this.setState({
			showUserData: "showDiv", //Show or hide the first element in a user confirmation modal
			showUserConfirmation: "hideDiv", //Show or hide the first element in a user confirmation modal
			showUserExtra: "hideDiv" //Show or hide the first element in a user confirmation modal
		})
	}

	toggleDataConfirmation(){
		let aux = this.state.showUserData;
		//this.setState({showUserExtra: this.state.showUserData}, ()=>{
		this.setState({showUserData: this.state.showUserConfirmation}, () =>{
			this.setState({ showUserConfirmation: aux})
		});
		//})
	} 

	toggleConfirmationExtra(){
		let aux = this.state.showUserExtra;
		this.setState({showUserExtra: this.state.showUserConfirmation}, ()=>{
			this.setState({showUserConfirmation: aux})
		});
	} 

	handleChange = (event) => {
		const { name, value } = event.target;
		this.setState({[name]: value, error: ''});
    }
	
	handleSubmit = (event) => { //event may be any other identifier
		
        this.setState({username: '', password: ''}); //This will only happens after handleSave
		event.preventDefault();//Cancel the event if its possible, without stopping its propagation

        const { username, password} = this.state;

		auxiliaryFunctions.getLocalization ((callback)=>{
			let data = {'route': 'users/history', 'listenMessage': 'devolverLoginHistory', 'operation': 'Insert' , 'data_to_send': [{'table': 'history', 'fields':['local', 'acao', 'latitude', 'longitude'], 'values': ["'later'", "'Login'", "'"+callback.latitude+"'", "'"+callback.longitude+"'"], 'id': {}}]} //capturedRow with only modified values to send to the sever. operation= 'Insert | Udate | Delete'
			socket.emit(this.state.dataSend, data, username, null); //Since we haven't token yet we can only use username
		});

        userService.login(username, password, this.state.keepConnected) 
		.then(
			user => {
				if (user !== undefined){
					const { from } = this.props.location.state || { from: { pathname: "/" } };
					this.props.history.push(from);
				}
				else{
					this.setState({error: 'Utilizador e/ou palavra-passe inválidos!'})
					this.username.focus();
				}
			},
		)
		.catch((error) =>{ 
			//console.log (error)
			this.setState({error: 'Ocorreu um erro com o seu login!'})
		});
    }
	handleShowModalRecovery = () => {
		this.setState({ showModalRecovery: true, recoverError1: "", recoverError2: "" });
	}
	
	handleCloseModalRecovery = () => {
		this.setState({dataForModal: {'route': 'users/recovery', 'listenMessage': 'devolverPasswordRecovery', 'operation': 'none' , 'data_to_send': [{'table': 'utilizadores', 'fields':[], 'values': [], 'id': {}}]}})
		this.setState({ showModalRecovery: false });
		this.resetUserDataConfirmationExtra();
	}
	handleShowModalSignUp = () => {
		this.setState({ showModalSignUp: true, recoverError1: "", recoverError2: "" });
	}
	handleCloseModalSignUp = () => {
		this.setState({dataForModal: {'route': 'users/recovery', 'listenMessage': 'devolverPasswordRecovery', 'operation': 'none' , 'data_to_send': [{'table': 'utilizadores', 'fields':[], 'values': [], 'id': {}}]}})
		this.setState({ showModalSignUp: false });
		this.resetUserDataConfirmationExtra();
	}
	updateDataForModal = (field, value) => { //Begin function to update values to send to the server when user updates some field
		let index = this.state.dataForModal.data_to_send[0].fields.indexOf(field); //Get the index of this field was already modified  (if it is in data_to_send)
		let aux = this.state.dataForModal; //Aux to not mutate state
		if (index > -1) { //Beging checking if the field is in data_to_send
			aux.data_to_send[0].values[index] = "'"+value+"'"; //Updating with the new value
		} //End checking if the field is in data_to_send
		else{ //Beging else if the field is not in data_to_send
			aux.data_to_send[0].fields.push(field); //Add the field to data_to_send
			aux.data_to_send[0].values.push("'"+value+"'"); //Add value associated to the field to data_to_send
		} //End else if the field is not in data_to_send.
		this.setState({dataForModal: aux}); //modify dataForModal no matter in which condition the fiels where modified
	} //End function to update values to send to the server when user updates some field
	//TODO - The functions below and all those which will be in different components, should be in a different (utils) file
	evaluatePattern = (field) => { //Begin function to validate each field according to expected pattern. This function is evaluating all fields all the time (TODO..)
		if (field.field in this.state.capturedRow){ //Begin checking if the field is in capturedRow (modified) to be validated 
			var isValid = !(field.regex.test(this.state.capturedRow[field.field])); //Compare the inserted field with expected pattern with the inserted value
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
			var isValid = !(field.regex.test(this.state.capturedRow[field.field])); //Compare the inserted field with expected pattern with the inserted value
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
		return( //Begin returning an input with evaluated pattern. TODO: set a valid id for each field
			<input type={field.type} className={this.evaluatePattern (field)} id="validationServer01" value={this.state.capturedRow[field.field]}  //Begin input component
				onChange={(event) => { //Begin handle change for the current component
					this.setState({error: '', capturedRow:{...this.state.capturedRow, [field.field]:  event.target.value}}); //Add the current value from input to capturedRow
					this.updateDataForModal (field.field, event.target.value); //Updating dataForModal dict (json) with the modified value and its associated field
				}} //End handle change for the current component 
			/> // End input component
		) //End returning an input 
	} //End function to return specific html input according to the field input property.
	render (){ 
		return (
			<div  className="login container-fluid">
				<div  className="row">
					<div  className="col-xl-6 col-lg-12 col-md-12 col-sm-12 col-xs-12"> 
						<div className="bannerLoginDiv">
							<img className="bannerLogin" src={process.env.PUBLIC_URL + '/banner.png'} alt="Banner Login" width="99%" height="99%"/>
						</div>
					</div>
					<div  className="divLogin col-xl-6 col-lg-12 col-md-12 col-sm-12 col-xs-12"> 
						<form onSubmit={this.handleSubmit}>
							<h3  className="feature-title">{Languages.languages[this.state.language].General.signInTitle.toUpperCase()}</h3>

							<div  className="form_group form-group">
								<p>{Languages.languages[this.state.language].General.userEmail.toUpperCase()}</p>
								<input type="text" tabIndex="0" ref={(input) => { this.username = input; }}  className="loginInput form-control" placeholder={Languages.languages[this.state.language].General.userEmailPlaceholder} name="username" required  value={this.state.username} onChange={this.handleChange}/> 
							</div>
							
							<div  className="form_group form-group">
								<p>{Languages.languages[this.state.language].General.password.toUpperCase()}</p>
								<input type="password" tabIndex="0" ref={(input) => { this.password = input; }} className="loginInput form-control" placeholder={Languages.languages[this.state.language].General.passwordPlaceholder} name="password" required value={this.state.password} onChange={this.handleChange}/> 
								<br/>
								<h6>{this.state.error}</h6>
								<label>{Languages.languages[this.state.language].General.keepConnected}</label>
								<input className="keepConnected" type="checkbox" name="keepConnected" checked={this.state.keepConnected} onClick={()=>{this.setState({keepConnected: this.state.keepConnected ^ 1})}}/>
							</div>

							<div  className="form_group form-group">
								<input type="submit"  className="btn btnLogin" value={Languages.languages[this.state.language].General.signInButton.toUpperCase()} name=""/>
							</div>

							<div  className="form_group form-group">
								<p>{Languages.languages[this.state.language].General.lostData}<Link to="/login" onClick={()=>{this.handleShowModalRecovery()}}>{Languages.languages[this.state.language].General.clickHere}</Link></p> 
								<p>{Languages.languages[this.state.language].General.notRegistered}<Link to="/login" onClick={()=>{this.handleShowModalSignUp()}}>{Languages.languages[this.state.language].General.signUp}</Link></p> 
								<p>
									{Languages.languages[this.state.language].General.needHelp}<a href="https://angola.sytes.net">{Languages.languages[this.state.language].General.contact}</a>
									{Languages.languages[this.state.language].General.contact} | {Languages.languages[this.state.language].General.termsOfUse} | {Languages.languages[this.state.language].General.copyright} 
									<img className="logoLogin" src={/*process.env.PUBLIC_URL + */'/logo.png'} alt="Logo" width="5%" height="5%"/>
								</p> 
							</div>
						</form>
					</div>
				</div>
				<div align = "center">
					<Modal //Begin react Modal from react-bootstrap
						show={this.state.showModalRecovery} //Show or not
						onHide={() => {this.handleCloseModalRecovery()}} //Action to be performed by clicking the windows-like close button
						dialogClassName="main-modal" //CSS class
						centered //Vertically centered
					> {/* End Modal properties*/}
						<Modal.Header //Begin Modal Header
							closeButton //Adding traditional close button to the header as a prop. Other icones may also be added
						> {/* End Modal header properties*/}
							<Modal.Title id="example-custom-modal-styling-title">{Languages.languages[this.state.language].General.passwordRecovery}</Modal.Title> {/* Adding the modal title */}
						</Modal.Header> {/* End Modal Header */}
						<Modal.Body> {/* Begin Delete Modal Body */}
							{ //Begin Javascript for tab content
								<form> {/* Begin Save/Edit Form TODO: Remove form tag*/}
								{ //Begin form data 
								//TODO: use userRecovery instead of [this.state.DBTable
									Tables.tables[this.state.DBTable].tabs[0].tab.rows.map((row, index1) =>(  //Begin map for each form tab containing more than one row
										<div className="form-row" key={index1}> {/* Begin form row */}
										{ //Begin Javascript for form row content
											row.fields.map((field, index2) =>( //Begin mapping row containing more than one field (column)
												<div className={this.state.showUserData + " col-md-3 mb-3"} key={index2}> {/* Begin columns (fields) */}
													<label for="validationServer01">{field.label}</label> {/* Field label */}
													{this.generateInput(field)} {/* Specific input according to the data provided */}
													<div className="invalid-feedback"> {/* Begin validation message */}
														{this.evaluatePatternError (field)} {/* get the message whether it's valid or not */}
													</div> {/* End validation message */}
												</div> //End columns (fields)
											)) //End mapping row containing more than one field (column)
										} {/* End Javascript for form row content */}
										</div> //End form row
									)) //End map for each form tab containing more than one row
								} {/* End form data */}
								</form> //End Save/Edit Form
							} {/* End Javascript for tab content */ }
							<div className = {this.state.showUserData}>
								<button className="btn angoButton" //Begin Save/Edit Buutton
									onClick={() => { //Begin Save/Edit save Button							
										socket.emit(this.state.dataSend, this.state.dataForModal, null, null); //Both token_cliente and componentID are null here
										if (0){ //TODO: handle this
											this.setState({recoverError1: "Utilizador não encontrado!"});
										}
										else{
											this.setState({recoverError1: Languages.languages[this.state.language].General.recoveryCodeMessage}) 
											this.toggleDataConfirmation();
										}
									}}
								>
									{Languages.languages[this.state.language].General.sendConfirmationCodeButton}
								</button> {/* End Save/Edit Buutton */}
							</div>
							{/*<p className={"this.state.showUserConfirmation"}>{this.state.recoverError1}</p>*/}
							<p>{this.state.recoverError1}</p>

							{ //Begin Javascript for tab content
								<form> {/* Begin Save/Edit Form TODO: Remove form tag*/}
								{ //Begin form data 
									Tables.tables[this.state.DBTable].tabsConfirmation[0].tab.rows.map((row, index1) =>(  //Begin map for each form tab containing more than one row
										<div className={this.state.showUserConfirmation + " form-row"} key={index1}> {/* Begin form row */}
										{ //Begin Javascript for form row content
											row.fields.map((field, index2) =>( //Begin mapping row containing more than one field (column)
												<div className="col-md-3 mb-3" key={index2}> {/* Begin columns (fields) */}
													<label for="validationServer01">{field.label}</label> {/* Field label */}
													{this.generateInput(field)} {/* Specific input according to the data provided */}
													<div className="invalid-feedback"> {/* Begin validation message */}
														{this.evaluatePatternError (field)} {/* get the message whether it's valid or not */}
													</div> {/* End validation message */}
												</div> //End columns (fields)
											)) //End mapping row containing more than one field (column)
										} {/* End Javascript for form row content */}
										</div> //End form row
									)) //End map for each form tab containing more than one row
								} {/* End form data */}
								</form> //End Save/Edit Form
							} {/* End Javascript for tab content */ }
							<div className = {this.state.showUserConfirmation}>
								<button className="btn angoButton" //Begin Save/Edit Buutton
									onClick={() => { //Begin Save/Edit save Button							
										socket.emit(this.state.dataSend, this.state.dataForModal, null, null); //Both token_cliente and componentID are null here
										if (0){ //TODO: handle this
											this.setState({recoverError1: "Código incorreto!"});
										}
										else{
											this.setState({recoverError1: Languages.languages[this.state.language].General.recoveryCodeMessage}) 
											this.toggleConfirmationExtra();
										}
									}}
								>
									{Languages.languages[this.state.language].General.passwordRecoveryButton}
								</button> {/* End Save/Edit Buutton */}
								<p>{this.state.recoverError2}</p>
							</div>	


							{ //Begin Javascript for tab content
								<form> {/* Begin Save/Edit Form TODO: Remove form tag*/}
								{ //Begin form data 
									Tables.tables[this.state.DBTable].tabsPassword[0].tab.rows.map((row, index1) =>(  //Begin map for each form tab containing more than one row
										<div className={this.state.showUserExtra + " form-row"} key={index1}> {/* Begin form row */}
										{ //Begin Javascript for form row content
											row.fields.map((field, index2) =>( //Begin mapping row containing more than one field (column)
												<div className="col-md-3 mb-3" key={index2}> {/* Begin columns (fields) */}
													<label for="validationServer01">{field.label}</label> {/* Field label */}
													{this.generateInput(field)} {/* Specific input according to the data provided */}
													<div className="invalid-feedback"> {/* Begin validation message */}
														{this.evaluatePatternError (field)} {/* get the message whether it's valid or not */}
													</div> {/* End validation message */}
												</div> //End columns (fields)
											)) //End mapping row containing more than one field (column)
										} {/* End Javascript for form row content */}
										</div> //End form row
									)) //End map for each form tab containing more than one row
								} {/* End form data */}
								</form> //End Save/Edit Form
							} {/* End Javascript for tab content */ }

							<div className = {this.state.showUserExtra}>
								<button className="btn angoButton" //Begin Save/Edit Buutton
									onClick={() => { //Begin Save/Edit save Button							
										socket.emit(this.state.dataSend, this.state.dataForModal, null, null); //Both token_cliente and componentID are null here
										this.setState({recoverError3: Languages.languages[this.state.language].General.passwordRecoveryMessage})
									}}
								>
									{Languages.languages[this.state.language].General.passwordRecoveryButton}
								</button> {/* End Save/Edit Buutton */}
								<p>{this.state.recoverError3}</p>
							</div>	

							</Modal.Body> {/* End Delete Modal Body */}
					</Modal> {/* End react Modal from react-bootstrap */}
				</div>
				<div align = "center">
					<Modal //Begin react Modal from react-bootstrap
						show={this.state.showModalSignUp} //Show or not 
						onHide={() => {this.handleCloseModalSignUp()}} //Action to be performed by clicking the windows-like close button
						dialogClassName="main-modal" //CSS class
						centered //Vertically centered
					> {/* End Modal properties*/}
						<Modal.Header //Begin Modal Header
							closeButton //Adding traditional close button to the header as a prop. Other icones may also be added
						> {/* End Modal header properties*/}
							<Modal.Title id="example-custom-modal-styling-title">{Languages.languages[this.state.language].General.signUp}</Modal.Title> {/* Adding the modal title */}
						</Modal.Header> {/* End Modal Header */}
						<Modal.Body> {/* Begin Delete Modal Body */}
							{ //Begin Javascript for tab content
								<form> {/* Begin Save/Edit Form TODO: Remove form tag*/}
								{ //Begin form data 
									Tables.tables[this.state.DBTable].tabsSignUp[0].tab.rows.map((row, index1) =>(  //Begin map for each form tab containing more than one row
										<div className={this.state.showUserData + " form-row"} key={index1}> {/* Begin form row */}
										{ //Begin Javascript for form row content
											row.fields.map((field, index2) =>( //Begin mapping row containing more than one field (column)
												<div className="col-md-3 mb-3" key={index2}> {/* Begin columns (fields) */}
													<label for="validationServer01">{field.label}</label> {/* Field label */}
													{this.generateInput(field)} {/* Specific input according to the data provided */}
													<div className="invalid-feedback"> {/* Begin validation message */}
														{this.evaluatePatternError (field)} {/* get the message whether it's valid or not */}
													</div> {/* End validation message */}
												</div> //End columns (fields)
											)) //End mapping row containing more than one field (column)
										} {/* End Javascript for form row content */}
										</div> //End form row
									)) //End map for each form tab containing more than one row
								} {/* End form data */}
								</form> //End Save/Edit Form
							} {/* End Javascript for tab content */ }
							<div className = {this.state.showUserData}>
								<button className="btn angoButton" //Begin Save/Edit Buutton
									onClick={() => { //Begin Save/Edit save Button							
										socket.emit(this.state.dataSend, this.state.dataForModal, null, null); //Both token_cliente and componentID are null here
										if (0){ //TODO: handle this
											this.setState({recoverError1: "Código incorreto!"});
										}
										else{
											this.setState({recoverError1: Languages.languages[this.state.language].General.recoveryCodeMessage}) 
											this.toggleDataConfirmation();
										}
									}}
								> 
									{Languages.languages[this.state.language].General.signUp}
								</button> {/* End Save/Edit Buutton */}
								<p>{this.state.recoverError1}</p>
							</div>
							<br/>

							{ //Begin Javascript for tab content
								<form> {/* Begin Save/Edit Form TODO: Remove form tag*/}
								{ //Begin form data 
									Tables.tables[this.state.DBTable].tabsConfirmation[0].tab.rows.map((row, index1) =>(  //Begin map for each form tab containing more than one row
										<div className={this.state.showUserConfirmation + " form-row"} key={index1}> {/* Begin form row */}
										{ //Begin Javascript for form row content
											row.fields.map((field, index2) =>( //Begin mapping row containing more than one field (column)
												<div className="col-md-3 mb-3" key={index2}> {/* Begin columns (fields) */}
													<label for="validationServer01">{field.label}</label> {/* Field label */}
													{this.generateInput(field)} {/* Specific input according to the data provided */}
													<div className="invalid-feedback"> {/* Begin validation message */}
														{this.evaluatePatternError (field)} {/* get the message whether it's valid or not */}
													</div> {/* End validation message */}
												</div> //End columns (fields)
											)) //End mapping row containing more than one field (column)
										} {/* End Javascript for form row content */}
										</div> //End form row
									)) //End map for each form tab containing more than one row
								} {/* End form data */}
								</form> //End Save/Edit Form
							} {/* End Javascript for tab content */ }
							<div className = {this.state.showUserConfirmation}>
								<button className="btn angoButton" //Begin Save/Edit Buutton
									onClick={() => { //Begin Save/Edit save Button							
										socket.emit(this.state.dataSend, this.state.dataForModal, null, null); //Both token_cliente and componentID are null here
										this.setState({recoverError2: Languages.languages[this.state.language].General.signUpMessage})
									}}
								>
									{Languages.languages[this.state.language].General.passwordRecoveryButton}
								</button> {/* End Save/Edit Buutton */}
								<p>{this.state.recoverError2}</p>
							</div>
						</Modal.Body> {/* End Delete Modal Body */}
					</Modal> {/* End react Modal from react-bootstrap */}
				</div>
			</div>
		);
	}
}
//
//export default Login;
//6292a9bb828f4cfbd5b16ba4a3c1228b6db7f188996a20c2c89998ea49ae6a48311add05e3b89b1f616afdeb7b32dc004cce351bdbd6ec9c6dcda57071e25513
