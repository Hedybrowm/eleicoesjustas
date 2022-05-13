import React from 'react';
import {Link} from 'react-router-dom';
import { FaBalanceScale } from 'react-icons/fa';
import './NavBar.css';
import StatBar from '../../../pages/StatBar';
import PaginaInicial from '../../../pages/PaginaInicial';

export default function NavBar(){

    //create useState hooks
    
    const searchBtn = 'Pesquisar';
    const placeholder = 'Start typing...';
    const login = 'Login';

    return(
        <nav id='nav-bar'>
            <div id='header-top' className='container-fluid'>
                <div className='row'>
                    <div id='logo' className='col-4 align-self-center text-center'>
                        <FaBalanceScale id='logo-img'/>
                        <h3 clasName=''>Eleições justas</h3>
                    </div>
                    <div className='col-6 align-self-center'>
                        <form>
                            <input type={'search'} placeholder={placeholder} id={'searchInput'}/>
                            <input type={'button'} value={searchBtn} id={'searchBtn'}/>
                        </form>
                    </div>
                    <div id="login" className='col-2 align-self-center right'>
                        <Link to='/login'>{login}</Link>
                    </div>
                </div>
            </div>
            <div id='div-menu' className='row'>
                <ul id='menu'>
                    <li>Votos Nacionais</li>
                    <li>Votos por Províncias</li>
                    <li>Votos contados pelos Partidos</li>
                </ul>
            </div>
            <StatBar />
            <PaginaInicial />
        </nav>
    )
}
