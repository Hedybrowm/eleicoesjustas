import {BrowserRouter as Router, Link} from 'react-router-dom'

function NavBAr(){
    return(
        <Router>
            <nav>
                <img src='' alt=''>Logo</img>
                <h1>Title</h1>
                <input></input>
                <button>Pesquisar</button>
                <a href=''>Login</a>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/votosnacionais">Votos Nacionais</Link></li>
                    <li><Link to="/votosprovinciais">Votos Provinciais</Link></li>
                    <li><Link to="/votoscontadospelospartidos">Votos Contados pelos Partidos</Link></li>
                </ul>
            </nav>
        </Router>
    )
}

export default NavBAr;