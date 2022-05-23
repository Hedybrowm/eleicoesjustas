
/**
 * @api {JANELA} MAPEAMENTOS Mapear dados para o eleicoesSegurasCore
 * @apiName eleicoesSegurasMapeamentos
 * @apiGroup mapeamentos
 *
 * @apiDescription Mapear dados:
 * - Adicionar nova tabela da BD manualmente com todas as regras inerentes a ele
 * - Copiar as mesmas configurações dos outros idiomas para o novo baseadndo-se nos campos da própria tabela
 */
//Json file to map each DB table with values for views
const Languages = require('./Idiomas.js'); //Importing the file containing all the strings for each language
var currentLanguage = (window.navigator.language || window.navigator.userLanguage).toLowerCase(); //The choosen language which should be dynamic. This should be in lower case because some Browsers like chrome use a format like pt-PT, en-GB and others use pt-PT, en-BG, etc. 
if (!Languages.languages[currentLanguage]){ //Begin evaluating current language
	currentLanguage = "en-gb";//If the currentLanguage is not defined in idiomas.js, then the system should assume the international language (en-gb)
} //End evaluating current language
/*
LIST OF GTML INPUT TYPES THAT WE CAN USE IN THE JSON INSIDE THE INPUT KEY
Button, reset, submit -> general, clear and form submit Buttons, respectivelly
text, number, password-> Commom text, number and hdden password
search, range -> Search and range bar
checkbox -> For independent boxes
radio -> For exclusive /disjoint) boxes
color -> For simple RGB
time -> On Only time
date -> only date
datetime-local -> date-time
week, month -> Week or month only
file -> For selecting any file
image -> Only for images ???
hidden -> For a hidden value (eg., some non-mutable)
email, tel, url -> only internal format
*/
var tables = {  //Begin tables json containing all tables with its rows and fields
	"utilizadores": { //Begin table Utilizadores
		"componentID": 1, //The current component's ID to be sent to the server for each request
		"tabs": [ //Begin form tabs for Utilizadores
			{ //Begin first tab for Utilizadores
				"label": Languages.languages[currentLanguage].Utilizadores.modalTabs[0], //First tab label
				"title": Languages.languages[currentLanguage].Utilizadores.modalTabsTitles[0], //First tab label
				"tab": { //Begin first tab json data
					"rows": [ //Begin rows for first tab
						{ //Begin first row of the first tab -> main atributes to be be shown on the table of contents, but user can "see more fields" (TODO)
							"fields": [ //Begin fields for first row of the first tab - each field contains some atributes for its organization, presenbtation and validation    
								//{ "css": " ", hideSave: true, disableSave: true, exceptionalHideSave: true, exceptionalDisableSave: true, hideEdit: true, disableEdit: true, exceptionalHideEdit: true, exceptionalDisableEdit: true, "component": "input", "type": "text", "error": Languages.languages[currentLanguage].General.inputError, "placeholder": " ", "regex": /[^0-9\d]/i, "label": Languages.languages[currentLanguage].Utilizadores.data.id, "field": "id" },
								{ "css": " ", hideSave: false, disableSave: false, exceptionalHideSave: false, exceptionalDisableSave: false, hideEdit: false, disableEdit: false, exceptionalHideEdit: false, exceptionalDisableEdit: false, "component": "input", "type": "text", "error": Languages.languages[currentLanguage].General.inputError, "placeholder": " ", "regex": /[^a-z @_.\d]/i, "label": Languages.languages[currentLanguage].Utilizadores.data.email, "field": "email" },
								{ "css": " ", hideSave: false, disableSave: false, exceptionalHideSave: false, exceptionalDisableSave: false, hideEdit: false, disableEdit: false, exceptionalHideEdit: false, exceptionalDisableEdit: false, "component": "input", "type": "text", "error": Languages.languages[currentLanguage].General.inputError, "placeholder": " ", "regex": /[^a-z áàâãéèêíìîóòôõúùûçñäëïöüýÿªº.-\d]/i, "label": Languages.languages[currentLanguage].Utilizadores.data.username, "field": "username" },
								{ "css": " ", hideSave: false, disableSave: false, exceptionalHideSave: false, exceptionalDisableSave: false, hideEdit: false, disableEdit: false, exceptionalHideEdit: false, exceptionalDisableEdit: false, "component": "input", "type": "password", "error": Languages.languages[currentLanguage].General.inputError, "placeholder": " ", "regex": /[^a-z áàâãéèêíìîóòôõúùûçñäëïöüýÿªº.-\d]/i, "label": Languages.languages[currentLanguage].Utilizadores.data.password, "field": "password" },
							] //End fields for first row of the first tab  
						}, //End first row of the first tab 
						{ //Begin second row of the first tab -> main atributes to be be shown on the table of contents, but user can "see more fields" (TODO)
							"fields": [ //Begin fields for first row of the first tab - each field contains some atributes for its organization, presenbtation and validation    
								{ "css": " ", hideSave: false, disableSave: false, exceptionalHideSave: false, exceptionalDisableSave: true, hideEdit: false, disableEdit: false, exceptionalHideEdit: false, exceptionalDisableEdit: true, "component": "input", "type": "text", "error": Languages.languages[currentLanguage].General.inputError, "placeholder": " ", "regex": /[^a-z áàâãéèêíìîóòôõúùûçñäëïöüýÿªº.-\d]/i, "label": Languages.languages[currentLanguage].Utilizadores.data.perfil, "field": "perfil" },
								{ "css": " ", hideSave: false, disableSave: false, exceptionalHideSave: false, exceptionalDisableSave: true, hideEdit: false, disableEdit: false, exceptionalHideEdit: false, exceptionalDisableEdit: true, "component": "input", "type": "text", "error": Languages.languages[currentLanguage].General.inputError, "placeholder": " ", "regex": /[^a-z áàâãéèêíìîóòôõúùûçñäëïöüýÿªº.-\d]/i, "label": Languages.languages[currentLanguage].Utilizadores.data.verificar, "field": "verificar" }, //TODO: discuss this with Antonio
								{ "css": " ", hideSave: false, disableSave: false, exceptionalHideSave: false, exceptionalDisableSave: true, hideEdit: false, disableEdit: false, exceptionalHideEdit: false, exceptionalDisableEdit: true, "component": "input", "type": "text", "error": Languages.languages[currentLanguage].General.inputError, "placeholder": " ", "regex": /[^a-z áàâãéèêíìîóòôõúùûçñäëïöüýÿªº.-\d]/i, "label": Languages.languages[currentLanguage].Utilizadores.data.ativo, "field": "ativo" }, //TODO: discuss this with Antonio
								{ "css": " ", hideSave: false, disableSave: false, exceptionalHideSave: false, exceptionalDisableSave: true, hideEdit: false, disableEdit: false, exceptionalHideEdit: false, exceptionalDisableEdit: true, "component": "input", "type": "file", "error": Languages.languages[currentLanguage].General.inputError, "placeholder": " ", "regex": "", "label": Languages.languages[currentLanguage].Utilizadores.data.imagem, "field": "imgname", "key": "userImage"}, //TODO: discuss this with Antonio. TODO: Every field should have a key
								//TODO - Add TFA option and the correspoding phone number
							] //End fields for second row of the first tab 
						}, //End first row of the first tab 
						{ //Begin second row of the first tab -> main atributes to be be shown on the table of contents, but user can "see more fields" (TODO)
							"fields": [ //Begin fields for first row of the first tab - each field contains some atributes for its organization, presenbtation and validation    
								{ "css": " ", hideSave: false, disableSave: false, exceptionalHideSave: false, exceptionalDisableSave: false, hideEdit: false, disableEdit: false, exceptionalHideEdit: false, exceptionalDisableEdit: false, "component": "input", "type": "text", "error": Languages.languages[currentLanguage].General.inputError, "placeholder": " ", "regex": /[^a-z @_.\d]/i, "label": Languages.languages[currentLanguage].Utilizadores.data.tfa, "field": "tfa" },
								{ "css": " ", hideSave: false, disableSave: false, exceptionalHideSave: false, exceptionalDisableSave: false, hideEdit: false, disableEdit: false, exceptionalHideEdit: false, exceptionalDisableEdit: false, "component": "input", "type": "text", "error": Languages.languages[currentLanguage].General.inputError, "placeholder": " ", "regex": /[^a-z áàâãéèêíìîóòôõúùûçñäëïöüýÿªº.-\d]/i, "label": Languages.languages[currentLanguage].Utilizadores.data.phone, "field": "phone" },
								{ "css": " ", hideSave: false, disableSave: false, exceptionalHideSave: false, exceptionalDisableSave: true, hideEdit: false, disableEdit: false, exceptionalHideEdit: false, exceptionalDisableEdit: true, "component": "image", "type": "image", "error": Languages.languages[currentLanguage].General.inputError, "placeholder": " ", "regex": "", "label": Languages.languages[currentLanguage].General.preview, "field": "imgname", "associatedKey": "userImage"}, //TODO: discuss this with Antonio. userImage is the key of the input which updates the image
								//TODO - Add TFA option and the correspoding phone number
							] //End fields for second row of the first tab 
						}, //End first row of the first tab 
					] //End rows for first tab
				} //End first tab json data
			}, //End first tab for Utilizadores
		], //End tabs for Utilizadores
		"tableTabs": [ //Begin table tabs for Utilizadores
			{ //Begin first table tab for Utilizadores
				"label": Languages.languages[currentLanguage].Utilizadores.modalTabs[1], //second tab label
				"title": Languages.languages[currentLanguage].Utilizadores.modalTabsTitles[1], //second tab label
				"dataGet": "devolverHistory", //Message to get the data to the server
				"DBRoute": "users/history", //Server route 
				"DBTable": "history", //DB table
				"tab": { //Begin first tab json data
					"rows": [ //Begin rows for first tab.
						{ //Begin first row of the second tab -> main atributes to be be shown on the table of contents, but user can "see more fields" (TODO)
							"fields": [ //Begin fields for first row of the second tab - each field contains some atributes for its organization, presenbtation and validation    
								{ "css": " ", hideSave: false, disableSave: false, exceptionalHideSave: false, exceptionalDisableSave: false, hideEdit: false, disableEdit: false, exceptionalHideEdit: false, exceptionalDisableEdit: false, "component": "input", "type": "text", "error": Languages.languages[currentLanguage].General.inputError, "placeholder": " ", "regex": /[^a-z áàâãéèêíìîóòôõúùûçñäëïöüýÿªº.-\d]/i, "label": Languages.languages[currentLanguage].Utilizadores.data.ip, "field": "ip" },
								{ "css": " ", hideSave: false, disableSave: false, exceptionalHideSave: false, exceptionalDisableSave: false, hideEdit: false, disableEdit: false, exceptionalHideEdit: false, exceptionalDisableEdit: false, "component": "input", "type": "text", "error": Languages.languages[currentLanguage].General.inputError, "placeholder": " ", "regex": /[^a-z áàâãéèêíìîóòôõúùûçñäëïöüýÿªº.-\d]/i, "label": Languages.languages[currentLanguage].Utilizadores.data.local, "field": "local" },
								{ "css": " ", hideSave: false, disableSave: false, exceptionalHideSave: false, exceptionalDisableSave: false, hideEdit: false, disableEdit: false, exceptionalHideEdit: false, exceptionalDisableEdit: false, "component": "input", "type": "text", "error": Languages.languages[currentLanguage].General.inputError, "placeholder": " ", "regex": /[^a-z áàâãéèêíìîóòôõúùûçñäëïöüýÿªº.-\d]/i, "label": Languages.languages[currentLanguage].Utilizadores.data.data, "field": "data" },
								{ "css": " ", hideSave: false, disableSave: false, exceptionalHideSave: false, exceptionalDisableSave: false, hideEdit: false, disableEdit: false, exceptionalHideEdit: false, exceptionalDisableEdit: false, "component": "input", "type": "text", "error": Languages.languages[currentLanguage].General.inputError, "placeholder": " ", "regex": /[^a-z áàâãéèêíìîóòôõúùûçñäëïöüýÿªº.-\d]/i, "label": Languages.languages[currentLanguage].Utilizadores.data.hora, "field": "hora" },
								{ "css": " ", hideSave: false, disableSave: false, exceptionalHideSave: false, exceptionalDisableSave: false, hideEdit: false, disableEdit: false, exceptionalHideEdit: false, exceptionalDisableEdit: false, "component": "input", "type": "text", "error": Languages.languages[currentLanguage].General.inputError, "placeholder": " ", "regex": /[^a-z áàâãéèêíìîóòôõúùûçñäëïöüýÿªº.-\d]/i, "label": Languages.languages[currentLanguage].Utilizadores.data.acao, "field": "acao" },
								{ "css": " ", hideSave: false, disableSave: false, exceptionalHideSave: false, exceptionalDisableSave: false, hideEdit: false, disableEdit: false, exceptionalHideEdit: false, exceptionalDisableEdit: false, "component": "input", "type": "text", "error": Languages.languages[currentLanguage].General.inputError, "placeholder": " ", "regex": /[^a-z áàâãéèêíìîóòôõúùûçñäëïöüýÿªº.-\d]/i, "label": Languages.languages[currentLanguage].Utilizadores.data.utilizador, "field": "username" },
							] //End fields for first row of the second tab 
						}, //End first row of the second tab
					] //End rows for first tab
				} //End first tab json data
			}, //End first table tab for Utilizadores
		] //End table tabs for Utilizadores
	}, //End of table Utilizadores
	"Login": { //Begin table Login
		"componentID": -1, //The current component's ID to be sent to the server for each request- -1 means not applicable - Anyone can try a login
		"tabs": [ //Begin form tabs for Login
			{ //Begin first tab for Login
				"label": null, //First tab label - not applicable
				"title": null, //First tab label - not applicable
				"tab": { //Begin first tab json data
					"rows": [ //Begin rows for first tab
						{ //Begin first row of the first tab -> main atributes to be be shown on the table of contents, but user can "see more fields" (TODO)
							"fields": [ //Begin fields for first row of the first tab - each field contains some atributes for its organization, presenbtation and validation    
								//TODO - Use this on the login form. 
								{ "css": " ", hideSave: false, disableSave: false, exceptionalHideSave: false, exceptionalDisableSave: false, hideEdit: false, disableEdit: false, exceptionalHideEdit: false, exceptionalDisableEdit: false, "component": "input", "type": "text", "error": Languages.languages[currentLanguage].General.inputError, "placeholder": " ", "regex": /[^a-z áàâãéèêíìîóòôõúùûçñäëïöüýÿªº.-\d]/i, "label": Languages.languages[currentLanguage].Utilizadores.data.username, "field": "username" },
								{ "css": " ", hideSave: false, disableSave: false, exceptionalHideSave: false, exceptionalDisableSave: false, hideEdit: false, disableEdit: false, exceptionalHideEdit: false, exceptionalDisableEdit: false, "component": "input", "type": "password", "error": Languages.languages[currentLanguage].General.inputError, "placeholder": " ", "regex": /[^a-z áàâãéèêíìîóòôõúùûçñäëïöüýÿªº.-\d]/i, "label": Languages.languages[currentLanguage].Utilizadores.data.password, "field": "password" },
							] //End fields for first row of the first tab 
						}, //End first row of the first tab 
					] //End rows for first tab
				} //End first tab json data
			}, //End first tab for Login
		], //End tabs for Login
	}, //End of table Login
	"userRecovery": { //Begin table userRecovery - Anyone can try a password recovery
		"componentID": -1, //The current component's ID to be sent to the server for each request- -1 means not applicable
		"tabs": [ //Begin form tabs for userRecovery
			{ //Begin first tab for userRecovery
				"label": null, //First tab label - not applicable
				"title": null, //First tab label - not applicable
				"tab": { //Begin first tab json data
					"rows": [ //Begin rows for first tab
						{ //Begin first row of the first tab -> main atributes to be be shown on the table of contents, but user can "see more fields" (TODO)
							"fields": [ //Begin fields for first row of the first tab - each field contains some atributes for its organization, presenbtation and validation    
								{ "css": " ", hideSave: false, disableSave: false, exceptionalHideSave: false, exceptionalDisableSave: false, hideEdit: false, disableEdit: false, exceptionalHideEdit: false, exceptionalDisableEdit: false, "component": "input", "type": "text", "error": Languages.languages[currentLanguage].General.inputError, "placeholder": " ", "regex": /[^a-z áàâãéèêíìîóòôõúùûçñäëïöüýÿªº.-_@\d]/i, "label": Languages.languages[currentLanguage].Utilizadores.data.username, "field": "username" },
							] //End fields for first row of the first tab 
						}, //End first row of the first tab 
					] //End rows for first tab
				} //End first tab json data
			}, //End first tab for userRecovery
		], //End tabs for userRecovery
		"tabsPassword": [ //Begin form tabs for userRecovery
			{ //Begin first tab for userRecovery
				"label": null, //First tab label - not applicable
				"title": null, //First tab label - not applicable
				"tab": { //Begin first tab json data
					"rows": [ //Begin rows for first tab
						{ //Begin first row of the first tab -> main atributes to be be shown on the table of contents, but user can "see more fields" (TODO)
							"fields": [ //Begin fields for first row of the first tab - each field contains some atributes for its organization, presenbtation and validation    
								{ "css": " ", hideSave: false, disableSave: false, exceptionalHideSave: false, exceptionalDisableSave: false, hideEdit: false, disableEdit: false, exceptionalHideEdit: false, exceptionalDisableEdit: false, "component": "input", "type": "password", "error": Languages.languages[currentLanguage].General.inputError, "placeholder": " ", "regex": /[^a-z áàâãéèêíìîóòôõúùûçñäëïöüýÿªº.-\d]/i, "label": Languages.languages[currentLanguage].General.newPassword, "field": "password" }, 
								{ "css": " ", hideSave: false, disableSave: false, exceptionalHideSave: false, exceptionalDisableSave: false, hideEdit: false, disableEdit: false, exceptionalHideEdit: false, exceptionalDisableEdit: false, "component": "input", "type": "password", "error": Languages.languages[currentLanguage].General.inputError, "placeholder": " ", "regex": /[^a-z áàâãéèêíìîóòôõúùûçñäëïöüýÿªº.-\d]/i, "label": Languages.languages[currentLanguage].General.password2, "field": "password" },
							] //End fields for first row of the first tab 
						}, //End first row of the first tab 
					] //End rows for first tab
				} //End first tab json data
			}, //End first tab for userRecovery
		], //End tabs for userRecovery
		"tabsConfirmation": [ //Begin form tabs for userRecovery
			{ //Begin first tab for userRecovery
				"label": null, //First tab label - not applicable
				"title": null, //First tab label - not applicable
				"tab": { //Begin first tab json data
					"rows": [ //Begin rows for first tab
						{ //Begin first row of the first tab -> main atributes to be be shown on the table of contents, but user can "see more fields" (TODO)
							"fields": [ //Begin fields for first row of the first tab - each field contains some atributes for its organization, presenbtation and validation    
								{ "css": " ", hideSave: false, disableSave: false, exceptionalHideSave: false, exceptionalDisableSave: false, hideEdit: false, disableEdit: false, exceptionalHideEdit: false, exceptionalDisableEdit: false, "component": "input", "type": "password", "error": Languages.languages[currentLanguage].General.inputError, "placeholder": " ", "regex": /[^a-z áàâãéèêíìîóòôõúùûçñäëïöüýÿªº.-\d]/i, "label": Languages.languages[currentLanguage].General.confirmationCode, "field": "password" },
							] //End fields for first row of the first tab 
						}, //End first row of the first tab 
					] //End rows for first tab
				} //End first tab json data
			}, //End first tab for userRecovery
		], //End tabs for userRecovery
		"tabsSignUp": [ //Begin form tabs for userRecovery
			{ //Begin first tab for userRecovery
				"label": null, //First tab label - not applicable
				"title": null, //First tab label - not applicable
				"tab": { //Begin first tab json data
					"rows": [ //Begin rows for first tab
						{ //Begin first row of the first tab -> main atributes to be be shown on the table of contents, but user can "see more fields" (TODO)
							"fields": [ //Begin fields for first row of the first tab - each field contains some atributes for its organization, presenbtation and validation    
								{ "css": " ", hideSave: false, disableSave: false, exceptionalHideSave: false, exceptionalDisableSave: false, hideEdit: false, disableEdit: false, exceptionalHideEdit: false, exceptionalDisableEdit: false, "component": "input", "type": "text", "error": Languages.languages[currentLanguage].General.inputError, "placeholder": " ", "regex": /[^a-z áàâãéèêíìîóòôõúùûçñäëïöüýÿªº.-_@\d]/i, "label": Languages.languages[currentLanguage].Utilizadores.data.username, "field": "username" },
								{ "css": " ", hideSave: false, disableSave: false, exceptionalHideSave: false, exceptionalDisableSave: false, hideEdit: false, disableEdit: false, exceptionalHideEdit: false, exceptionalDisableEdit: false, "component": "input", "type": "text", "error": Languages.languages[currentLanguage].General.inputError, "placeholder": " ", "regex": /[^a-z áàâãéèêíìîóòôõúùûçñäëïöüýÿªº.-_@\d]/i, "label": Languages.languages[currentLanguage].Utilizadores.data.email, "field": "email" },
							] //End fields for first row of the first tab 
						}, //End first row of the first tab 
						{ //Begin first row of the first tab -> main atributes to be be shown on the table of contents, but user can "see more fields" (TODO)
							"fields": [ //Begin fields for first row of the first tab - each field contains some atributes for its organization, presenbtation and validation    
								{ "css": " ", hideSave: false, disableSave: false, exceptionalHideSave: false, exceptionalDisableSave: false, hideEdit: false, disableEdit: false, exceptionalHideEdit: false, exceptionalDisableEdit: false, "component": "input", "type": "password", "error": Languages.languages[currentLanguage].General.inputError, "placeholder": " ", "regex": /[^a-z áàâãéèêíìîóòôõúùûçñäëïöüýÿªº.-_@\d]/i, "label": Languages.languages[currentLanguage].Utilizadores.data.password, "field": "password" },
								{ "css": " ", hideSave: false, disableSave: false, exceptionalHideSave: false, exceptionalDisableSave: false, hideEdit: false, disableEdit: false, exceptionalHideEdit: false, exceptionalDisableEdit: false, "component": "input", "type": "password", "error": Languages.languages[currentLanguage].General.inputError, "placeholder": " ", "regex": /[^a-z áàâãéèêíìîóòôõúùûçñäëïöüýÿªº.-\d]/i, "label": Languages.languages[currentLanguage].General.password2, "field": "password" },
							] //End fields for first row of the first tab 
						}, //End first row of the first tab 
					] //End rows for first tab
				} //End first tab json data
			}, //End first tab for userRecovery
		], //End tabs for userRecovery
	}, //End of table userRecovery
	"votos": { //Begin table votos
		"componentID": 2, //The current component's ID to be sent to the server for each request
		"tabs": [ //Begin form tabs for votos
			{ //Begin first tab for Votos. 
				"label": Languages.languages[currentLanguage].Votos.modalTabs[0], //First tab label
				"title": Languages.languages[currentLanguage].Votos.modalTabsTitles[0], //First tab label
				"tab": { //Begin first tab json data
					"rows": [ //Begin rows for first tab
						{ //Begin first row of the first tab -> main atributes to be be shown on the table of contents, but user can "see more fields" (TODO)
							"fields": [ //Begin fields for first row of the first tab - each field contains some atributes for its organization, presenbtation and validation
								{ "css": " ", hideSave: false, disableSave: false, exceptionalHideSave: true, exceptionalDisableSave: true, hideEdit: false, disableEdit: false, exceptionalHideEdit: true, exceptionalDisableEdit: true, "component": "input", "type": "text", "error": Languages.languages[currentLanguage].General.inputError, "placeholder": " ", "regex": /[^0-9\d]/i, "label": Languages.languages[currentLanguage].Votos.data.codvoto, "field": "codvoto" },
								{ "css": " ", hideSave: false, disableSave: false, exceptionalHideSave: false, exceptionalDisableSave: false, hideEdit: false, disableEdit: false, exceptionalHideEdit: false, exceptionalDisableEdit: false, "component": "input", "type": "text", "error": Languages.languages[currentLanguage].General.inputError, "placeholder": " ", "regex": /[^a-z áàâãéèêíìîóòôõúùûçñäëïöüýÿªº.-\d]/i, "label": Languages.languages[currentLanguage].Votos.data.designacao, "field": "designacao" },
								{ "css": " ", hideSave: false, disableSave: false, exceptionalHideSave: false, exceptionalDisableSave: false, hideEdit: false, disableEdit: false, exceptionalHideEdit: false, exceptionalDisableEdit: false, "component": "input", "type": "text", "error": Languages.languages[currentLanguage].General.inputError, "placeholder": " ", "regex": /[^a-z áàâãéèêíìîóòôõúùûçñäëïöüýÿªº.-\d]/i, "label": Languages.languages[currentLanguage].Votos.data.designacaoabreviada, "field": "designacaoabreviada" },
								{ "css": " ", hideSave: false, disableSave: false, exceptionalHideSave: false, exceptionalDisableSave: false, hideEdit: false, disableEdit: false, exceptionalHideEdit: false, exceptionalDisableEdit: false, "component": "input", "type": "text", "error": Languages.languages[currentLanguage].General.inputError, "placeholder": " ", "regex": /[^a-z áàâãéèêíìîóòôõúùûçñäëïöüýÿªº.-\d]/i, "label": Languages.languages[currentLanguage].Votos.data.tipo, "field": "tipo" },
							] //End fields for first row of the first tab 
						}, //End first row of the first tab 
					] //End rows for first tab
				} //End first tab json data
			}, //End first tab for votos
		] //End tabs for votos
	}, //End of table votos
	/*
	"alertas": { //Begin table alertas
		"componentID": 3, //The current component's ID to be sent to the server for each request
		"tabs": [ //Begin form tabs for alertas
			{ //Begin first tab for alertas. 
				"label": Languages.languages[currentLanguage].Alertas.modalTabs[0], //First tab label
				"title": Languages.languages[currentLanguage].Alertas.modalTabsTitles[0], //First tab label
				"tab": { //Begin first tab json data
					"rows": [ //Begin rows for first tab
						{ //Begin first row of the first tab -> main atributes to be be shown on the table of contents, but user can "see more fields" (TODO)
							"fields": [ //Begin fields for first row of the first tab - each field contains some atributes for its organization, presenbtation and validation
								{ "css": " ", hideSave: false, disableSave: false, exceptionalHideSave: true, exceptionalDisableSave: true, hideEdit: false, disableEdit: false, exceptionalHideEdit: true, exceptionalDisableEdit: true, "component": "input", "type": "text", "error": Languages.languages[currentLanguage].General.inputError, "placeholder": " ", "regex": /[^0-9\d]/i, "label": Languages.languages[currentLanguage].Alertas.data.codalerta, "field": "codalerta" },
								{ "css": " ", hideSave: false, disableSave: false, exceptionalHideSave: false, exceptionalDisableSave: false, hideEdit: false, disableEdit: false, exceptionalHideEdit: false, exceptionalDisableEdit: false, "component": "input", "type": "text", "error": Languages.languages[currentLanguage].General.inputError, "placeholder": " ", "regex": /[^a-z áàâãéèêíìîóòôõúùûçñäëïöüýÿªº.-\d]/i, "label": Languages.languages[currentLanguage].Alertas.data.designacao, "field": "designacao" },
								{ "css": " ", hideSave: false, disableSave: false, exceptionalHideSave: false, exceptionalDisableSave: false, hideEdit: false, disableEdit: false, exceptionalHideEdit: false, exceptionalDisableEdit: false, "component": "input", "type": "text", "error": Languages.languages[currentLanguage].General.inputError, "placeholder": " ", "regex": /[^a-z áàâãéèêíìîóòôõúùûçñäëïöüýÿªº.-\d]/i, "label": Languages.languages[currentLanguage].Alertas.data.designacaoabreviada, "field": "designacaoabreviada" },
								{ "css": " ", hideSave: false, disableSave: false, exceptionalHideSave: false, exceptionalDisableSave: false, hideEdit: false, disableEdit: false, exceptionalHideEdit: false, exceptionalDisableEdit: false, "component": "input", "type": "text", "error": Languages.languages[currentLanguage].General.inputError, "placeholder": " ", "regex": /[^a-z áàâãéèêíìîóòôõúùûçñäëïöüýÿªº.-\d]/i, "label": Languages.languages[currentLanguage].Alertas.data.tipo, "field": "tipo" },
							] //End fields for first row of the first tab 
						}, //End first row of the first tab 
					] //End rows for first tab
				} //End first tab json data
			}, //End first tab for alertas
		] //End tabs for alertas
	}, //End of table alertas
	"utilitarios": { //Begin table utilitarios
		"componentID": 4, //The current component's ID to be sent to the server for each request
		"tabs": [ //Begin form tabs for utilitarios
			{ //Begin first tab for utilitarios. 
				"label": Languages.languages[currentLanguage].Utilitarios.modalTabs[0], //First tab label
				"title": Languages.languages[currentLanguage].Utilitarios.modalTabsTitles[0], //First tab label
				"tab": { //Begin first tab json data
					"rows": [ //Begin rows for first tab
						{ //Begin first row of the first tab -> main atributes to be be shown on the table of contents, but user can "see more fields" (TODO)
							"fields": [ //Begin fields for first row of the first tab - each field contains some atributes for its organization, presenbtation and validation
								{ "css": " ", hideSave: false, disableSave: false, exceptionalHideSave: true, exceptionalDisableSave: true, hideEdit: false, disableEdit: false, exceptionalHideEdit: true, exceptionalDisableEdit: true, "component": "input", "type": "text", "error": Languages.languages[currentLanguage].General.inputError, "placeholder": " ", "regex": /[^0-9\d]/i, "label": Languages.languages[currentLanguage].Utilitarios.data.codutilitario, "field": "codutilitario" },
								{ "css": " ", hideSave: false, disableSave: false, exceptionalHideSave: false, exceptionalDisableSave: false, hideEdit: false, disableEdit: false, exceptionalHideEdit: false, exceptionalDisableEdit: false, "component": "input", "type": "text", "error": Languages.languages[currentLanguage].General.inputError, "placeholder": " ", "regex": /[^a-z áàâãéèêíìîóòôõúùûçñäëïöüýÿªº.-\d]/i, "label": Languages.languages[currentLanguage].Utilitarios.data.designacao, "field": "designacao" },
								{ "css": " ", hideSave: false, disableSave: false, exceptionalHideSave: false, exceptionalDisableSave: false, hideEdit: false, disableEdit: false, exceptionalHideEdit: false, exceptionalDisableEdit: false, "component": "input", "type": "text", "error": Languages.languages[currentLanguage].General.inputError, "placeholder": " ", "regex": /[^a-z áàâãéèêíìîóòôõúùûçñäëïöüýÿªº.-\d]/i, "label": Languages.languages[currentLanguage].Utilitarios.data.designacaoabreviada, "field": "designacaoabreviada" },
								{ "css": " ", hideSave: false, disableSave: false, exceptionalHideSave: false, exceptionalDisableSave: false, hideEdit: false, disableEdit: false, exceptionalHideEdit: false, exceptionalDisableEdit: false, "component": "input", "type": "text", "error": Languages.languages[currentLanguage].General.inputError, "placeholder": " ", "regex": /[^a-z áàâãéèêíìîóòôõúùûçñäëïöüýÿªº.-\d]/i, "label": Languages.languages[currentLanguage].Utilitarios.data.tipo, "field": "tipo" },
							] //End fields for first row of the first tab 
						}, //End first row of the first tab 
					] //End rows for first tab
				} //End first tab json data
			}, //End first tab for utilitarios
		] //End tabs for utilitarios
	}, //End of table utilitarios
	"configuracoes": { //Begin table configuracoes
		"componentID": 5, //The current component's ID to be sent to the server for each request
		"tabs": [ //Begin form tabs for configuracoes
			{ //Begin first tab for configuracoes
				"label": Languages.languages[currentLanguage].Configuracoes.modalTabs[0], //First tab label
				"title": Languages.languages[currentLanguage].Configuracoes.modalTabsTitles[0], //First tab label
				"tab": { //Begin first tab json data
					"rows": [ //Begin rows for first tab
						{ //Begin first row of the first tab -> main atributes to be be shown on the table of contents, but user can "see more fields" (TODO)
							"fields": [ //Begin fields for first row of the first tab - each field contains some atributes for its organization, presenbtation and validation
								{ "css": " ", hideSave: false, disableSave: false, exceptionalHideSave: true, exceptionalDisableSave: true, hideEdit: false, disableEdit: false, exceptionalHideEdit: true, exceptionalDisableEdit: true, "component": "input", "type": "text", "error": Languages.languages[currentLanguage].General.inputError, "placeholder": " ", "regex": /[^0-9\d]/i, "label": Languages.languages[currentLanguage].Configuracoes.data.codconfiguracao, "field": "codconfiguracao" },
								{ "css": " ", hideSave: false, disableSave: false, exceptionalHideSave: false, exceptionalDisableSave: false, hideEdit: false, disableEdit: false, exceptionalHideEdit: false, exceptionalDisableEdit: false, "component": "input", "type": "text", "error": Languages.languages[currentLanguage].General.inputError, "placeholder": " ", "regex": /[^a-z áàâãéèêíìîóòôõúùûçñäëïöüýÿªº.-\d]/i, "label": Languages.languages[currentLanguage].Configuracoes.data.designacao, "field": "designacao" },
								{ "css": " ", hideSave: false, disableSave: false, exceptionalHideSave: false, exceptionalDisableSave: false, hideEdit: false, disableEdit: false, exceptionalHideEdit: false, exceptionalDisableEdit: false, "component": "input", "type": "text", "error": Languages.languages[currentLanguage].General.inputError, "placeholder": " ", "regex": /[^a-z áàâãéèêíìîóòôõúùûçñäëïöüýÿªº.-\d]/i, "label": Languages.languages[currentLanguage].Configuracoes.data.designacaoabreviada, "field": "designacaoabreviada" },
								{ "css": " ", hideSave: false, disableSave: false, exceptionalHideSave: false, exceptionalDisableSave: false, hideEdit: false, disableEdit: false, exceptionalHideEdit: false, exceptionalDisableEdit: false, "component": "input", "type": "text", "error": Languages.languages[currentLanguage].General.inputError, "placeholder": " ", "regex": /[^a-z áàâãéèêíìîóòôõúùûçñäëïöüýÿªº.-\d]/i, "label": Languages.languages[currentLanguage].Configuracoes.data.tipo, "field": "tipo" },
							] //End fields for first row of the first tab 
						}, //End first row of the first tab 
					] //End rows for first tab
				} //End first tab json data
			}, //End first tab for configuracoes
		] //End tabs for configuracoes
	}, //End of table configuracoes
	"parametrizacoes": { //Begin table Login
		"componentID": 6, //The current component's ID to be sent to the server for each request- -1 means not applicable - Anyone can try a login
		"tabs": [ //Begin form tabs for Login
			{ //Begin first tab for Login
				"label": Languages.languages[currentLanguage].Entidades.modalTabs[0], //First tab label
				"title": Languages.languages[currentLanguage].Entidades.modalTabsTitles[0], //First tab label
				"tab": { //Begin first tab json data
					"rows": [ //Begin rows for first tab
						{ //Begin first row of the first tab -> main atributes to be be shown on the table of contents, but user can "see more fields" (TODO)
							"fields": [ //Begin fields for first row of the first tab - each field contains some atributes for its organization, presenbtation and validation    
								//TODO - Use this on the login form. 
								{ "css": " ", hideSave: false, disableSave: false, exceptionalHideSave: false, exceptionalDisableSave: false, hideEdit: false, disableEdit: false, exceptionalHideEdit: false, exceptionalDisableEdit: false, "component": "input", "type": "text", "error": Languages.languages[currentLanguage].General.inputError, "placeholder": " ", "regex": /[^a-z áàâãéèêíìîóòôõúùûçñäëïöüýÿªº.-\d]/i, "label": Languages.languages[currentLanguage].Parametrizacoes.data.cod_parametrizacao, "field": "cod_parametrizacao" },
								{ "css": " ", hideSave: false, disableSave: false, exceptionalHideSave: false, exceptionalDisableSave: false, hideEdit: false, disableEdit: false, exceptionalHideEdit: false, exceptionalDisableEdit: false, "component": "input", "type": "password", "error": Languages.languages[currentLanguage].General.inputError, "placeholder": " ", "regex": /[^a-z áàâãéèêíìîóòôõúùûçñäëïöüýÿªº.-\d]/i, "label": Languages.languages[currentLanguage].Parametrizacoes.data.cod_utilizador, "field": "cod_utilizador" },
								{ "css": " ", hideSave: false, disableSave: false, exceptionalHideSave: false, exceptionalDisableSave: false, hideEdit: false, disableEdit: false, exceptionalHideEdit: false, exceptionalDisableEdit: false, "component": "input", "type": "password", "error": Languages.languages[currentLanguage].General.inputError, "placeholder": " ", "regex": /[^a-z áàâãéèêíìîóòôõúùûçñäëïöüýÿªº.-\d]/i, "label": Languages.languages[currentLanguage].Parametrizacoes.data.moeda, "field": "moeda"},
								{ "css": " ", hideSave: false, disableSave: false, exceptionalHideSave: false, exceptionalDisableSave: false, hideEdit: false, disableEdit: false, exceptionalHideEdit: false, exceptionalDisableEdit: false, "component": "input", "type": "password", "error": Languages.languages[currentLanguage].General.inputError, "placeholder": " ", "regex": /[^a-z áàâãéèêíìîóòôõúùûçñäëïöüýÿªº.-\d]/i, "label": Languages.languages[currentLanguage].Parametrizacoes.data.simbolo_moeda, "field": "simbolo_moeda"},
								{ "css": " ", hideSave: false, disableSave: false, exceptionalHideSave: false, exceptionalDisableSave: false, hideEdit: false, disableEdit: false, exceptionalHideEdit: false, exceptionalDisableEdit: false, "component": "input", "type": "password", "error": Languages.languages[currentLanguage].General.inputError, "placeholder": " ", "regex": /[^a-z áàâãéèêíìîóòôõúùûçñäëïöüýÿªº.-\d]/i, "label": Languages.languages[currentLanguage].Parametrizacoes.data.idioma, "field": "idioma"},
								{ "css": " ", hideSave: false, disableSave: false, exceptionalHideSave: false, exceptionalDisableSave: false, hideEdit: false, disableEdit: false, exceptionalHideEdit: false, exceptionalDisableEdit: false, "component": "input", "type": "password", "error": Languages.languages[currentLanguage].General.inputError, "placeholder": " ", "regex": /[^a-z áàâãéèêíìîóòôõúùûçñäëïöüýÿªº.-\d]/i, "label": Languages.languages[currentLanguage].Parametrizacoes.data.simbolo_idioma, "field": "simbolo_idioma"},
							] //End fields for first row of the first tab 
						}, //End first row of the first tab 
					] //End rows for first tab
				} //End first tab json data
			}, //End first tab for Login
		], //End tabs for Login
	}, //End of table parametrizacoes
	*/
} //End tables json containing all tables with its rows and fields
module.exports = { //Begin exporting languages module to be required and used in the main files
	tables,
	//"codigodocumento" "nome" "nomeabreviado" "tipo"
} //End exporting languages module to be required and used in the main files - 6292a9bb828f4cfbd5b16ba4a3c1228b6db7f188996a20c2c89998ea49ae6a48311add05e3b89b1f616afdeb7b32dc004cce351bdbd6ec9c6dcda57071e25513
