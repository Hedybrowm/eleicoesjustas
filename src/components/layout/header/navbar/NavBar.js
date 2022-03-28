import {Link} from 'react-router-dom';

export default function NavBAr(){
    return(
        <nav>
            <img src='' alt='logo' />
            <h1>Eleições Seguras</h1>
            <button>Pesquisar</button>
            <a href=''>Login</a>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/votosnacionais">Votos Nacionais</Link></li>
                <li><Link to="/votosprovinciais">Votos Provinciais</Link></li>
                <li><Link to="/votoscontadospelospartidos">Votos Contados pelos Partidos</Link></li>
            </ul>
        </nav>
    )
}
