import React from 'react';
import MaterialTable from 'material-table'
import './PaginaInicial.css'

export default function PaginaInicial(){
    return(
        <header className='container-fluid'>
            <div className='row m-2 p-1' id='statistic-bar'>
                <div className='col-2'>
                    <div className='row title-statistic m-1'>Votos esperados</div>
                    <div className='row title-statistic m-1'>Mesas</div>
                    <div className='row title-statistic m-1'>Mesas escrutinadas</div>
                </div>
                <div className='col-2'>
                    <div className='row statistic m-1'>99999</div>
                    <div className='row statistic m-1'>88888</div>
                    <div className='row statistic m-1'>77777</div>
                </div>                
                <div className='col-4 align-self-center'>
                    <h2 className='text-center'>Total de votos</h2>
                    <h3 className='text-center'>99999</h3>
                </div>
                <div className='col-2'>
                    <div className='row title-statistic m-1'>AAA</div>
                    <div className='row title-statistic m-1'>AAA</div>
                    <div className='row title-statistic m-1'>AAA</div>
                </div>
                <div className='col-2'>
                    <div className='row statistic m-1'>AAA</div>
                    <div className='row statistic m-1'>AAA</div>
                    <div className='row statistic m-1'>AAA</div>
                </div> 
            </div>
            <br/>
            <div className='container'>
                <MaterialTable
                title="Resultados da votação a nível nacional"
                columns={[
                    { title: 'Nº', field: 'numero', type: 'string'},
                    { title: 'Partido', field: 'partido', type: 'string'},
                    {
                        title: 'Bandeira',
                        field: 'bandeira',
                        render: rowData => (
                            <img
                                style={{ height: 60, borderRadius: '5%' }}
                                src={rowData.avatar}
                            />
                        ),
                    },
                    { title: 'Candidato', field: 'candidato', type: 'string'},
                    { title: 'Nº de Votos', field: 'numeroVotos', type: 'numeric'},
                    { title: 'Percentagem', field: 'percentagem', type: 'numeric'}
                ]}
                data={query =>
                    new Promise((resolve, reject) => {
                    let url = 'https://reqres.in/api/users?'
                    url += 'per_page=' + query.pageSize
                    url += '&page=' + (query.page + 1)
                    fetch(url)
                        .then(response => response.json())
                        .then(result => {
                        resolve({
                            data: result.data,
                            page: result.page - 1,
                            totalCount: result.total,
                        })
                        })
                    })
                }
                />
            </div>
        </header>   
    )
}
