 /**
 * @api { Modulos } Listagem EleicoesSeguras
 * @apiName eleicoesSeguras
 * @apiGroup Descrição
 *
 * @apiParam {Componente} Alertas Contém todas as alertas, avisos da aplicação eleicoesSeguras
 * @apiParam {Componente} Configuracoes Contém todas as Configurações e parametrizações da aplicação eleicoesSeguras
 * @apiParam {Componente} DynamicTable núcleo da aplicação que renderiza de forma genérica os módulos, para tal cada módulo deve invocá-lo e passar os seus parâmentros para ele
 * @apiParam {Componente} Idiomas Contém todas traduções da aplicação eleicoesSeguras - Vários idiomas são disponibilizados, se um idioma não estiver definido aqui, a DynamicTable assume o Inglês
 * @apiParam {Componente} Login Iniciar Sessão no eleicoesSeguras
 * @apiParam {Componente} Mapeamentos Contém todas as regras de apresentação e validação de cada módulo
 * @apiParam {Componente} Pagina_Principal Página Principal da aplicação eleicoesSeguras
 * @apiParam {Componente} PrivateRoute Módulo que impede acessos não autorizados
 * @apiParam {Componente} Select Contém um select para listar itens de uma forma já integrada com a BD
 * @apiParam {Componente} userService Gestor de sessões (Login, Logout, Credenciais) da aplicação eleicoesSeguras
 *
 * */
