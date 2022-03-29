import React from "react";
import './PaginaInicial.css';

export default function StatBar(){
    return(
        <>
            <div className='row mx-4 my-3 p-2' id='stat-bar'>
                <div className='col-2'>
                    <div className='row title-statistic my-1 px-2'>Votos esperados</div>
                    <div className='row title-statistic my-1 px-2'>Mesas</div>
                    <div className='row title-statistic my-1 px-2'>Mesas escrutinadas</div>
                </div>
                <div className='col-2'>
                    <div className='row statistic my-1 px-2'>99999</div>
                    <div className='row statistic my-1 px-2'>88888</div>
                    <div className='row statistic my-1 px-2'>77777</div>
                </div>                
                <div className='col-4 align-self-center'>
                    <h2 className='text-center'>Total de votos</h2>
                    <h3 className='text-center'>99999</h3>
                </div>
                <div className='col-2'>
                    <div className='row title-statistic my-1 px-2'>Votos brancos</div>
                    <div className='row title-statistic my-1 px-2'>Votos nulos</div>
                    <div className='row title-statistic my-1 px-2'>Votos reclamados</div>
                </div>
                <div className='col-2'>
                    <div className='row statistic my-1 px-2'>11111</div>
                    <div className='row statistic my-1 px-2'>22222</div>
                    <div className='row statistic my-1 px-2'>33333</div>
                </div> 
            </div>
        </>
    )
}