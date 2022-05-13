import React from 'react';
//import {Link} from 'react-router-dom';

import './administrar.css';

export default function Administrador(){
    const imageFooterSideNav = '/images/bandeira.jpeg';
    const url = '';

    return(
        <div className='container'>
            <div className='row topBar'>
                
            </div>
            <div className='row'>
                <div className='col-sm-3 sideNav'>
                    <div className='row align-self-center'>
                        <img src='' alt='logotipo' />
                        <p>Administrar</p>
                    </div>
                    <nav className='row'>
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
                <div className='col-sm-9'>
                    <div className = "col-md-6 col-sm-12">
                        <form className = " boxAdmFormRegister m-2">
                            <div className='row'>
                                <div className='col-sm-6'>
                                    <div>
                                        <h2 className='title'>Cadastrar partidos</h2>
                                        <div className='row'>
                                            <label htmlFor="name" className="form-label">Número de identificação</label>
                                            <input type = "text" id = "numberID" className = "numberID"></input>
                                        </div>
                                        <div className='row'>
                                            <label htmlFor="name" className="form-label">Nome do partido</label>
                                            <input type = "number" id = "numberID" className = "numberID"></input>
                                        </div>                                    
                                    </div>
                                    <div className='row'>
                                        <label htmlFor="name" className="form-label">Nome do Presidente</label>
                                        <select value={'xxxxx'} onChange={'xxxxxx'} className='select-president-name'>
                                            <option value={'xxxxxx'}>XXXXXX</option>
                                            <option value={'xxxxxx'}>XXXXXX</option>
                                            <option value={'xxxxxx'}>XXXXXX</option>
                                            <option value={'xxxxxx'}>XXXXXX</option>
                                        </select>
                                    </div>
                                </div>
                                <div className='col-sm-6 align-self-center text-center'>
                                    <p>Bandeira do Partido</p>
                                    <input type={'file'} onChange={'change'} className='inputFile'/>
                                </div>
                            </div>
                            <br/>
                            <div className='row'>
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
        </div>
    )
}