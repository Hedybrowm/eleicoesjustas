import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import NavBar from '../layout/navbar/NavBar'

export default function VotosNacionais(){
    return
        (
        <Router>
            <NavBar />
            <h1>Votos Nacionais</h1>
        </Router>
        )
}
