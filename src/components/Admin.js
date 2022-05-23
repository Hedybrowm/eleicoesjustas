import React from 'react';
import { FaBalanceScale } from 'react-icons/fa';

//import {Link} from 'react-router-dom';

export default function Administrador(){
    const imageFooterSideNav = '/banner.png';

    const placeholder = 'Número...';
    const url = '';

    return(
        <div className='container'>
            <div className='row topBar'>
                
            </div>
            <div className='row container record_container'>
                <div className='col-12 col-sm-1 col-md-3 col-lg-3 col-xl-3 col-xxl-3 sideNav bandeira'>
                    <div className='header-navBar row align-self-center'>
                        <FaBalanceScale id='logo-img'/>
                    </div>
                    <nav className='row showNavBar'>
                        <ul className='nav flex-column'>
                            <li className='nav-item'>Partidos</li>
                            <li className='nav-item'>Presidentes</li>
                            <li className='nav-item'>Assembleias</li>
                            <li className='nav-item'>Mesas eleitorais</li>
                            <li className='nav-item'>Delegados</li>
                            <li className='nav-item'>Lançar votos</li>
                            <li className='nav-item'>Utilizadores</li>
                        </ul>
                    </nav>
                    <div className='row' id="bandeira">
                        <img src={imageFooterSideNav} alt='bandeira'/>
                    </div>
                </div>
                 {/* Formulário de registos */}
                <div className='col-12 col-sm-11 col-md-9 col-lg-9 col-xl-8 col-xxl-9 record_container'>
                    <form className = "boxAdmFormRegister">
                        <div className='row'>
                            <div className='col-7'>
                                <h2 className='title-adm'>Cadastrar partido</h2>
                                <div className='row'>
                                    <label htmlFor="numberID" className="formLabel">Número de identificação</label>
                                    <input type = "text" id = "numberID" className = "numberID" placeholder={placeholder}></input>
                                </div>
                                <div className='row'>
                                    <label htmlFor="nomePartido" className="formLabel">Nome do partido</label>
                                    <input type = "text" id="nomePartido" className="nomePartido"></input>
                                </div>                                    
                                <div className='row'>
                                    <label htmlFor="name" className="formLabel">Nome do Presidente</label>
                                    <select value={'xxxxx'} onChange={'xxxxxx'} id="select-president-name" className='select-president-name'>
                                        <option value={'xxxxxx'}>XXXXXX</option>
                                        <option value={'xxxxxx'}>XXXXXX</option>
                                        <option value={'xxxxxx'}>XXXXXX</option>
                                        <option value={'xxxxxx'}>XXXXXX</option>
                                    </select>
                                </div>
                            </div>
                            <div className='col-5 align-self-center'>
                                <br/>
                                <br/>
                                <p className='m-2'>Bandeira do Partido</p>
                                <input type={'file'} onChange={'change'} className='inputFile'/>
                            </div>
                        </div>
                        <br/>
                        <div className='row record_container'>
                            <table class="table table-striped col-sm-12">
                                <thead>
                                    <tr className='header-table'>
                                        <th scope="col">Nº</th>
                                        <th scope="col">Número Ident.</th>
                                        <th scope="col">Partido</th>
                                        <th scope="col">Nome do Presidente</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>99999</td>
                                        <td>Jacob</td>
                                        <td>Jacob</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">2</th>
                                        <td>99999</td>
                                        <td>AAAAA</td>
                                        <td>AAAAA</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">3</th>
                                        <td>99999</td>
                                        <td>AAAAA</td>
                                        <td>AAAAA</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">4</th>
                                        <td>99999</td>
                                        <td>AAAAA</td>
                                        <td>AAAAA</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">5</th>
                                        <td>99999</td>
                                        <td>AAAAA</td>
                                        <td>AAAAA</td>
                                    </tr>
                                </tbody>
                            </table> 
                            <div className='buttons'>
                                <input type = "button" id = "btnAdmFormRegister" className = "btnAdmFormRegister" value = "Gravar"></input>
                                <input type = "button" id = "btnAdmFormRegister" className = "btnAdmFormRegister" value = "Gerir Dados"></input>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
