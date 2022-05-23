import React from 'react'; //React main module
//import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom"; //Router to create all routes to our application using Route
import { BrowserRouter as Router, Route } from "react-router-dom"; //Router to create all routes to our application using Route
import { PrivateRoute } from './components/PrivateRoute'; //Module to prevent users to enter on protected pages without credentials
import Login from './components/Login'; //Application login module
import Menu from './components/Menu'; //Main page module
import Pagina_Principal from './components/Pagina_Principal'; //Main page module
import Comparar_Votos from './components/Comparar_Votos'; //Main page module
import Alertas from './components/Alertas'; //Module for application Alerts
import Configuracoes from './components/Configuracoes'; //Module for application configuratations
import Presidentes_Candidatos from './components/Presidentes_Candidatos'; //Module for application Candidates to Presidency
import Partidos from './components/Partidos'; //Module for application Political party
import Votos_Presidentes from './components/Votos_Presidentes'; //Module for application votes to president
import Votos_Partidos from './components/Votos_Partidos'; //Module for application votes to parties
import Assembleias from './components/Assembleias'; //Module for application Polling Station
import Mesas_Eleitorais from './components/Mesas_Eleitorais'; //Module for application Polling station table
import Delegados from './components/Delegados'; //Module for application delegate
import Documentos from './components/Documentos'; //Module for application documents
import Relatorios from './components/Relatorios'; //Module for application reports
import Utilitarios from './components/Utilitarios'; //Module for application utilities
import Utilizadores from './components/Utilizadores'; //Module for application users management
import PDFReader from './components/PDFReader'; //Module for application users management
import PDFRenderer from './components/PDFRenderer'; //Module for application users management
import Testes from './components/Testes'; // Test Module
import Admin from './components/Admin'; // Administrator Module

export default class App extends React.Component{ //Begin Apllication main class (component) where the other all components (modules) are used
	render (){ //Begin rendering the application
		return ( //Begin returning the components to be rendered
			<Router> {/* Begin creating applications routes */}
				{/*<Switch>  Begin switching so if a router is found twice, it will only be used the first?*/}
				<Route  exact path="/login" component={Login} /> {/*Login Route*/}				
				<Route exact path="/" component={Menu} /> {/*Menu Route*/}
				<Route exact path="/principal" component={Pagina_Principal} /> {/*Main Page Route*/}
				<Route exact path="/comparar" component={Comparar_Votos} /> {/*Votes comparison Page Route*/}
				<Route exact path="/admin" component={Admin} /> {/*Votes comparison Page Route*/}
				<Route exact path="/testes" component={Testes} /> {/*Test Page Route*/}
				<PrivateRoute exact path="/alertas" component={Alertas} /> {/*Warnings Page Route*/}
				<PrivateRoute exact path="/configuracoes" component={Configuracoes} /> {/*Module for application configuratations*/}
				<PrivateRoute exact path="/presidentes_candidatos" component={Presidentes_Candidatos} /> {/*Module for application Candidates to Presidency*/}
				<PrivateRoute exact path="/partidos" component={Partidos} /> {/*Module for application Political party*/}
				<PrivateRoute exact path="/votos_presidentes" component={Votos_Presidentes} /> {/*Module for application votes to president*/}
				<PrivateRoute exact path="/votos_partidos" component={Votos_Partidos} /> {/*Module for application votes to parties*/}
				<PrivateRoute exact path="/assembleias" component={Assembleias} /> {/*Module for application Polling Station*/}
				<PrivateRoute exact path="/mesas_Eleitorais" component={Mesas_Eleitorais} /> {/*Module for application Polling station table*/}
				<PrivateRoute exact path="/delegados" component={Delegados} /> {/*Module for application delegate*/}
				<Route exact path="/documentos" component={Documentos} /> {/*Module for application documents*/}
				<PrivateRoute exact path="/relatorios" component={Relatorios} /> {/*Module for application reports*/}
				<PrivateRoute exact path="/utilitarios" component={Utilitarios} /> {/*Module for application utilities*/}
				<PrivateRoute exact path="/utilizadores" component={Utilizadores} /> {/*Module for application users management*/}
				<PrivateRoute  exact path="/pdfreader" component={PDFReader} /> {/*Users managememt*/}
				<PrivateRoute  exact path="/pdfrenderer" component={PDFRenderer} /> {/*Users managememt*/}
				{/*</Switch> End switching so if a router is found twice, it will only be used the first?*/}
			</Router>  //End creating applications routes
		); //End returning the components to be rendered
	} //End rendering the application
} //End Apllication main class (component) where the other all components (modules) are used
//export default App;
//6292a9bb828f4cfbd5b16ba4a3c1228b6db7f188996a20c2c89998ea49ae6a48311add05e3b89b1f616afdeb7b32dc004cce351bdbd6ec9c6dcda57071e25513
