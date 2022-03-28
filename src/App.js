import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Login from './components/pages/login/Login'
//import NavBar from './components/layout/header/navbar/NavBar'
import Register from './components/pages/register/Register'
import PaginaInicial from './components/pages/PaginaInicial'

export default function App() {
  return (
    <Router>
      <Route exact path = "/">
          <Login />
      </Route>
      <Route path = "/register">
          <Register />
      </Route>
      <Switch>
        <Route path = "/home">
            <PaginaInicial />
        </Route>
      </Switch>
    </Router>
    )
}
