import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Login from './components/pages/login/Login'
import NavBar from './components/layout/navbar/NavBar'
import Register from './components/pages/register/Register'

function App() {
  return (
    <Router>
      <Route exact path = "/">
        <header>
          <Login />
        </header>
      </Route>
      <Route exact path = "/register">
          <Register />
      </Route>
      <Switch>
        <Route exact path = "/navbar">
            <NavBar />
        </Route>
      </Switch>
    </Router>
    )
}

export default App;
