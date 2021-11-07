/**
 * @api {JANELA} SELECTDATA Select dinâmico
 * @apiName eleicoesSegurasSelectData
 * @apiGroup SelectData
 *
 * @apiDescription Gestão de SelectData:
 * - Gerir Select dinâmico
 */
// ($env:HTTPS="true") -and (npm start)
import React from 'react'; //'React' must be in scope when using JSX  react/react-in-jsx-scope
import Select from 'react-select'; //Common select to be used 

import openSocket from 'socket.io-client'; //Importing Websocket Client to access the realtime API which uses sockets.io
const hosts = require('../hosts'); //Using hosts (eg. servers) to be conected with the current application
const socket = openSocket(hosts.realtimeAPI); //creating a client instance conected to our websocket server (the sockets.io realtime server)


//The gerneric select class
class SelectData extends React.Component{
	
	constructor(props) {
		super(props);
		this.state = {
			//This state
			isLoading: true,
			options: [], //Assync data
			isDisabled: this.props.isDisabled,
			//User order
			emitRequest: this.props.emitRequest, //false?
			isHidden: this.props.isHidden, //false?
			reset: this.props.reset, //Reload the data?!
			//Static props
			user: this.props.user, //The user credentials to get data
			componente: this.props.componente, //The environment
			codigo: this.props.codigo, //Associated to the data - 0
			dataSend: this.props.dataSend, //Emit request
			dataGet: this.props.dataGet, //Emit retrieve data
			empty: this.props.emptyMessage,
			focus: false,
			value: {label:this.props.placeholder, value:''},
			DBRoute: this.props.DBRoute,
			DBTable: this.props.DBTable
		}
	}

	emitRequest = () => {
		//alert (this.state.dataSend)
		this.buscarDados();

		//Handle the data sent by the server
		this.devolverDados((res) => {
			console.log ("Aqui -> ", res)
			if ((res.status === 200)) {//We can show the exception result somewhere
				if (res.data.data.length !== 0){
					this.setState({ options: [], isLoading: true},
						() => {
							
						}
					); //Reset the selectable options
					res.data.data.map( //data is the genereric callback for any kind of information
						result =>(
							this.setState({ //Get the data from the server on value state
								options : [ ...this.state.options, {
									value: result, label: result[this.props.field] //All queries should have these two fields
								}] 
							})
						)
					);
					//this.setState({reset: false}) //reset should always be set to false when we get data, so it will be used to reset again
				}
				else
					this.setState ({ options: [{value: '', label: this.state.emptyMessage}]}); //Reset
			}
			else{
				this.setState({ //Get the data from the server on value state
				error: 'Houve um erro na sua requisição!' //Each component should have its own error and validation
				});
			} 
			this.setState({ isLoading: false, isDisabled: false}); //Inform the data processing is finished
		});
	}
	
	componentDidMount() {
	
		if (this.state.emitRequest === true)
			this.emitRequest();
	}

	componentWillReceiveProps(nextProps) {
		// You don't have to do this check first, but it can help prevent an unneeded render
		//if (this.props != nextProps)
		if (nextProps.isHidden !== this.state.isHidden) 
			this.setState({ isHidden: nextProps.isHidden}); //Change the hiden property if there is a new value

		if (nextProps.reset !== this.state.reset) 
		{
			this.setState({ reset: nextProps.reset}); //Change the reset property if there is a new value
			if (nextProps.reset === true)
			{
				this.setState({ options: [], value: {label: this.props.placeholder, value: ''}}); //reset the data for any reason
			}
		}

		if (nextProps.emitRequest !== this.state.emitRequest)
		{
			this.setState({ emitRequest: nextProps.emitRequest });
			if ((nextProps.emitRequest === true)) //if (this.state.emitRequest === true)
				this.emitRequest(); //Emit a new request
		}

		//if ((nextProps.emitRequest === true) && this.state.options.length===0) //if (this.state.emitRequest === true)
			//this.emitRequest(); //Emit a new request

		if (nextProps.codigo !== this.state.codigo) 
			this.setState({ codigo: nextProps.codigo}); //Change the hiden property if there is a new value
		
		if (nextProps.focus === true)
			this.selectFocus.focus();
	  }

	//Emit a request to the server when the page is loaded

	buscarDados  = () => { //Begin emitting a request to the server when the page is loaded. get data for current user only
		socket.emit(this.state.dataSend, //Emitting a post request to the server. TODO: Use queries like select max(id) from tabele and getting only a table head with some records...
			{'route':this.state.DBRoute, listenMessage: this.state.dataGet, 'operation': this.props.operation , 'data_to_send':[{'table':this.state.DBTable, 'fields':[], 'values':[], 'id':{}}]},
			this.state.user ? this.state.user.token_cliente : null, this.state.componentID); //All routes in the servers should be according to this structure
	} //End emitting a request to the server when the page is loaded

	//Handle the data sent by the server
	devolverDados  = (res) => {
		socket.on(this.state.dataGet, response => res(response));
	}
	
	render (){ 
		if (this.state.isHidden === true)
		{ //Return nothing (hide)
			return (<div></div>); //Empty
		}
		else
		{
			return ( 
				<div>
					<Select ref= {(input) => {this.selectFocus = input}}
						onChange = {(selectedValue)=> {
							this.setState({value: selectedValue});
							this.props.onChange(()=>{return selectedValue});
						}}
						placeholder ={this.props.placeholder} //invariable, thus not state data
						isDisabled={this.state.isDisabled} //user decision
						isLoading  = {this.state.isLoading} //data loading decision
						//value={this.props.value} //user decision for tjhe first moment
						//value={this.state.error} //user decision for tjhe first moment
						options={this.state.options} //Data 
						value={this.state.value}
					/> 
					<p>{this.state.error}</p>
				</div>
			);
		}
	}
}

export default SelectData;
