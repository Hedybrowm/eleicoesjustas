import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Login from './components/pages/login/Login'
import StatBar from './components/layout/header/navbar/NavBar'
import Register from './components/pages/register/Register'
import Administrar from './components/pages/administrar'
//import PaginaInicial from './components/pages/PaginaInicial'

export default function App() {
  return (
    <Router>
      <Route exact path = "/">
          <Login />
      </Route>
      <Route path = "/a">
          <Administrar />
      </Route>
      <Switch>
        <Route path = "/home">
            <StatBar />
        </Route>
      </Switch>
    </Router>
    )
}
