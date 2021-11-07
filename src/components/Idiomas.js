/**
 * @api {JANELA} IDIOMAS Gerir dados
 * @apiName eleicoesSegurasIdiomas
 * @apiGroup Idiomas
 *
 * @apiDescription Gestão de Idiomas:
 * - Adicionar novo Idioma manualmente
 * - Copiar as mesmas strings dos outros idiomas para o novo
 */
//TODO: Define Code Rules and a simple parser to assure the rules are being followed
const languages = { //Begin Json to map each DB table with values for views. All keys should be equal for all languages in order to be translatable, but comments may be in the correspondent language or in english
	"pt-pt": { //Início português de Portugal
		"General": { //Início da chave que contém as strings genéricas para toda aplicação
			"mon": "Segunda-Feira", //Texto para Segunda-Feira
			"tue": "Terça-Feira", //Texto para Terça-Feira"
			"wed": "Quarta-Feira", //Texto para Quarta-Feira
			"thu": "Quinta-Feira", //Texto para Quinta-Feira
			"fri": "Sexta-Feira", //Texto para Sexta-Feira
			"sat": "Sábado", //Texto para Sábado
			"sun": "Domingo", //Texto para Domingo
			"jan": "Janeiro", //Texto para Janeiro
			"feb": "Fevereiro", //Texto para Fevereiro
			"mar": "Março", //Texto para Março
			"apr": "Abril", //Texto para Abril
			"may": "Maio", //Texto para Maio
			"jun": "Junho", //Texto para Junho
			"jul": "Julho", //Texto para Julho
			"aug": "Agosto", //Texto para Agosto
			"sep": "Setembro", //Texto para Setembro
			"oct": "Outubro", //Texto para Outubro
			"nov": "Novembro", //Texto para Novembro
			"dec": "Dezembro", //Texto para Dezembro
			"signInTitle": "Iniciar Sessão",  //Label para iniciar sessão
			"userEmail": "Utilizador ou email", //Placeholder para iniciar sessão
			"userEmailPlaceholder": "Nome de utilizador ou email", //Label para nome de utilizador ou email
			"password": "Palavra-passe", //Label para palavra-passe
			"newPassword": "Nova Palavra-passe", //Label para nova palavra-passe
			"passwordPlaceholder": "sua palavra-passe", //Placeholder para palavra-passe
			"password2": "Confirmar Palavra-passe", //Label para palavra-passe
			"passwordPlaceholder2": "confirmação da palavra-passe", //Placeholder para palavra-passe
			"confirmationCode": "Código de confirmação", //Código de confirmação enviado ao email ou telemóvel
			"keepConnected": "Permanecer ligado", //Texto associado a uma checkbox para manter a sessão ativa
			"signInButton": "Iniciar Sessão",  //Botão iniciar sessão
			"lostData": "Perdeu os seus dados de acesso? ", //Texto associado ao link para recuperar a palavra-passe
			"clickHere": "Clique aqui!", //Texto para o link que leva a uma hiperligação ou rota específica
			"notRegistered": "Não tem uma conta? ", //Texto associado ao link para criar nova conta
			"signUp": "Criar conta", //Link para criar uma nova conta
			"needHelp": "Precisa de ajuda? Contacte os nossos serviços de ", //Texto associado ao link para ajuda
			"termsOfUse": "Termos de utilização", //Texto para o link de acesso aos termos de utilização
			"copyright": "Desenvolvido por", //Texto de direitos autorais
			"contact": "Apoio ao cliente", //Texto de contacto
			"painelPrincipal": "Painel Principal",  //Texto do Menu Painel principal. TODO: Talvez no futuro os menus poderão estar todos dentro de uma chave "menus" para serem dinâmicos
			"utilitarios": "Utilitários", //Texto do Menu Utilitários. 
			"configuracoes": "Configurações", //Texto do Menu Configurações. 
			"alertas": "Alertas", //Texto do Menu Alertas. 
			"helpHint": "Manual do Utilizador", //Hint do Modal de Ajuda. TODO: Para ser utilizado no futuro
			"userHint": "Página do Utilizador", //Hint do Modal da Página do Utilizador. TODO: Para ser utilizado no futuro
			"logoutHint": "Terminar sessão", //Hint para o botão logout. TODO: Para ser utilizado no futuro
			"help": "Manual do Utilizador", //Título do Modal de Ajuda. 
			"user": "Página do Utilizador", //Título do Modal da Página do Utilizador.
			"logoutMessage": "Deseja realmente sair?", //Mensagem de confirmação de logout
			"yesButton": "Sim", //Texto do botão aceitar
			"noButton": "Não", //Texto do botão negar
			"backButton": "Voltar", //Texto do botão voltar
			"searchBox": "Pesquisar", //hint da caixa (ícone) de pesquisa
			"search": "Pesquisa", //Placeholder da caixa de pesquisa
			"linesNumber": "linhas", //Texto de rodapé indicativo do número de linhas na tabela genérica
			"firstPage": "Primeira Página", //hint de rodapé para a seta Primeira Página da tabela genérica
			"nextPage": "Próxima Página", //hint de rodapé para a seta Próxima Página da tabela genérica
			"previousPage": "Página Anterior", //hint de rodapé para a seta Página Anterior da tabela genérica
			"lastPage": "Última Página", //hint de rodapé para a seta Última Página da tabela genérica
			"serverOffline": "Erro no servidor. Verifique a sua conexão ou contacte o administrador!", //Texto de excessão associada ao servidor (ex: 500)
			"inputError": "Preencha o campo corretamente!", //Texto de erro para campo mal preenchido
			"emptyInputError": "Campo obrigatório", //Texto de erro para campo obrigatório não preenchido. TODO: Use it in the future
			"validationError": "Corrija os campos mal preenchidos!", //Mensagem para erro de validação em algum formulário
			"passwordRecovery": "Recuperação de Password", //Título de recuperação
			"passwordRecoveryButton": "Recuperar Password", //Botão de recuperação
			"sendConfirmationCodeButton": "Enviar código de recuperação", //Botão enviuar código de recuperação
			"recoveryCodeMessage": "Um cógigo de confirmação foi enviado ao seu email. Utilize-o  no formulário abaixo", //Mensagem após enviar código
			"passwordRecoveryMessage": "A sua palavra-passe foi atualizada com sucesso!", //Mensagem após atualizar pass
			"signUpMessage": "Conta criada com sucesso!", //Menssagem de criação de conta
			"signUpError": "Ocorreu um erro ao criar a conta. Verifique os seus dados e a conexão ao servidor", //Mensagem de erro ao criar conta
			"passwordRecoveryError": "Os dados fornecidos são inválidos!", //Erro ao tentar recuperar password
			"recoveryCodeError": "O código de verificação não pode ser enviado, verifica a sua conexão e os dados fornecidos", //Erro ao enviar o código
			"missmatchPasswordError": "As passwords devem coincidir",  //Erro de confirmação da palavra passe
			"weakPasswordError": "Palavra passe fraca. Utilize letras, números e caracteres especiais", //Erro de palavra passe fraca
			"preview": "Previsualização",
			"notAllowed": "Não tem permissões para aceder essa área restrita!",
			"print": "Imprimir",
		}, //Fim da chave que contém as strings genéricas para toda aplicação
		"Votos": { //Início da chave que contém as strings associadas ao módulo Votos
			"name": "Votos", //Nome do título da página
			"mainTabs": ["Votos Tab 1", "Votos Tab 2", "Votos Tab 3"], //Tabs para os diferentes tipos do módulo
			"modalTabs": ["Campos principais", "Campos auxiliares", "Outros"], //Tabs para os diferentes separadores no fomulário do módulo
			"modalTabsTitles": ["Campos principais", "Campos auxiliares", "Outros"], //Títulos para o conteúdo de cada tab de formulário
			"saveButtonHint": "Gravar Voto", //Hint do botão guardar
			"editButtonHint": "Editar Voto", //Hint do botão editar
			"deleteButtonHint": "Eliminar Voto", //Hint do botão eliminar
			"lockButtonHint": "Voto já assinada ou em edição", //Hint do botão lock (cadeado de bloqueio sobre registos não editáveis no momento)
			"lockButtonMessage": "Não poderá alterar dados a serem alterados por outra pessoa ou documentos já assinados!", //Texto de mensagem ao clicar no botão lock
			"saveButton": "Guardar Voto", //Texto do botão guardar
			"editButton": "Editar Voto", //Texto do botão editar
			"deleteButton": "Eliminar Voto", //Texto do botão eliminar
			"titleSave": "Novo Voto", //Título do modal de inserção e do botão para abrir tal modal
			"titleEdit": "Editar Voto", //Título do modal de edição
			"titleDelete": "Eliminar Voto?", //Título do modal de eliminação
			"messageDelete": "Pretende eliminar a seguinte Voto?", //Mensagem de confirmação do modal de eliminação
			"successSave": "Dados do Voto gravados com sucesso!", //Mensagem do POST bem sucedido
			"successEdit": "Dados do Voto atualizados com sucesso!", //Mensagem do PUT bem sucedido
			"successDelete": "Voto eliminada com sucesso!", //Mensagem do DELETE bem sucedido
			"errorSaveClient": "Ocorreu um erro ao gravar o Voto, verifique a sua conexão com servidor e tente novamente!", //Mensagemn de erro no cliente para POST
			"errorSaveServer": "Ocorreu um erro ao gravar o Voto, servidor em manutenção por pouco tempo; tente mais tarde!", //Mensagemn de erro no servidor para POST
			"errorEditClient": "Ocorreu um erro ao atualizar o Voto, verifique a sua conexão com servidor e tente novamente!", //Mensagemn de erro no cliente para PUT
			"errorEditServer": "Ocorreu um erro ao atualizar o Voto, servidor em manutenção por pouco tempo; tente mais tarde!", //Mensagemn de erro no servidor para PUT
			"errorDeleteClient": "Ocorreu um erro ao eliminar o Voto, verifique a sua conexão com servidor e tente novamente!", //Mensagemn de erro no cliente para DELETE
			"errorDeleteServer": "Ocorreu um erro ao eliminar o Voto, servidor em manutenção por pouco tempo; tente mais tarde!", //Mensagemn de erro no servidor para DELETE
			"emptyMessage": "Sem Votos disponíveis; verifique a sua conexão ao servidor!", //Mensagem de tabela vazia. TODO: use it!
			"actionsTitle": "Gerir Votos", //Título acima dos botões de CRUD na tabela genérica
			"data":{ //Início das labels para os campos deste módulo
				"codvoto": "Código Voto",
			}, //Fim das labels para os campos deste módulo
		}, //Fim da chave que contém as strings associadas ao módulo Votos
		"Utilizadores": { //Início da chave que contém as strings associadas ao módulo Votos
			"name": "Utilizadores", //Nome do título da página
			"mainTabs": ["Utilizadores Tab 1", "Utilizadores Tab 2", "Utilizadores Tab 3"], //Tabs para os diferentes tipos do módulo
			"modalTabs": ["Campos principais", "Campos auxiliares", "Outros"], //Tabs para os diferentes separadores no fomulário do módulo
			"modalTabsTitles": ["Campos principais", "Campos auxiliares", "Outros"], //Títulos para o conteúdo de cada tab de formulário
			"saveButtonHint": "Gravar Utilizador", //Hint do botão guardar
			"editButtonHint": "Editar Utilizador", //Hint do botão editar
			"deleteButtonHint": "Eliminar Utilizador", //Hint do botão eliminar
			"lockButtonHint": "Utilizador já assinada ou em edição", //Hint do botão lock (cadeado de bloqueio sobre registos não editáveis no momento)
			"lockButtonMessage": "Não poderá alterar dados a serem alterados por outra pessoa ou documentos já assinados!", //Texto de mensagem ao clicar no botão lock
			"saveButton": "Guardar Utilizador", //Texto do botão guardar
			"editButton": "Editar Utilizador", //Texto do botão editar
			"deleteButton": "Eliminar Utilizador", //Texto do botão eliminar
			"titleSave": "Novo Utilizador", //Título do modal de inserção e do botão para abrir tal modal
			"titleEdit": "Editar Utilizador", //Título do modal de edição
			"titleDelete": "Eliminar Utilizador?", //Título do modal de eliminação
			"messageDelete": "Pretende eliminar a seguinte Utilizador?", //Mensagem de confirmação do modal de eliminação
			"successSave": "Dados do Utilizador gravados com sucesso!", //Mensagem do POST bem sucedido
			"successEdit": "Dados do Utilizador atualizados com sucesso!", //Mensagem do PUT bem sucedido
			"successDelete": "Utilizador eliminada com sucesso!", //Mensagem do DELETE bem sucedido
			"errorSaveClient": "Ocorreu um erro ao gravar o Utilizador, verifique a sua conexão com servidor e tente novamente!", //Mensagemn de erro no cliente para POST
			"errorSaveServer": "Ocorreu um erro ao gravar o Utilizador, servidor em manutenção por pouco tempo; tente mais tarde!", //Mensagemn de erro no servidor para POST
			"errorEditClient": "Ocorreu um erro ao atualizar o Utilizador, verifique a sua conexão com servidor e tente novamente!", //Mensagemn de erro no cliente para PUT
			"errorEditServer": "Ocorreu um erro ao atualizar o Utilizador, servidor em manutenção por pouco tempo; tente mais tarde!", //Mensagemn de erro no servidor para PUT
			"errorDeleteClient": "Ocorreu um erro ao eliminar o Utilizador, verifique a sua conexão com servidor e tente novamente!", //Mensagemn de erro no cliente para DELETE
			"errorDeleteServer": "Ocorreu um erro ao eliminar o Utilizador, servidor em manutenção por pouco tempo; tente mais tarde!", //Mensagemn de erro no servidor para DELETE
			"emptyMessage": "Sem Utilizadores disponíveis; verifique a sua conexão ao servidor!", //Mensagem de tabela vazia. TODO: use it!
			"actionsTitle": "Gerir Utilizadores", //Título acima dos botões de CRUD na tabela genérica
			"data":{ //Início das labels para os campos deste módulo
				"codutilizador": "Código Utilizador",
			}, //Fim das labels para os campos deste módulo
		}, //Fim da chave que contém as strings associadas ao módulo Votos
	}, //Fim português de Portugal
	"en-gb": { //Begin Great Britain English strings
		"General": { //Begin the key containing all generic strings for the whole application
			"mon": "Monday", //Monday Text
			"tue": "Tuesday", //Tuesday Text
			"wed": "Wednesday", //Wednesday Text
			"thu": "Thursday", //Thursday Text
			"fri": "Friday", //Friday Text
			"sat": "Saturday", //Saturday Text
			"sun": "Sunday", //Sunday Text
			"jan": "January", //January Text
			"feb": "February", //February Text
			"mar": "March", //March Text
			"apr": "April", //April Text
			"may": "may", //May Text
			"jun": "June", //June Text
			"jul": "July", //July Text
			"aug": "August", //August Text
			"sep": "September", //September Text
			"oct": "October", //October Text
			"nov": "November", //Monday Text
			"dec": "December", //December Text
			"signInTitle": "Sign-In", //Log in title text
			"userEmail": "Username or email", //Log in ID label
			"userEmailPlaceholder": "Your username or email", //Log in passwords placeholder
			"password": "Password", //Log in password label
			"newPassword": "New Password", //Log in password label
			"passwordPlaceholder": "Your password", //Log in password placeholder
			"password2": "Confirm Password", //Log in password confitmastion label
			"passwordPlaceholder2": "Your password confirmation", //Log in password placeholder
			"confirmationCode": "Confirmation code", //Confirmation code sent to email or phone
			"keepConnected": "Keep conected", //Keep conected text associated to a checkbox
			"signInButton": "Sign-in", //Login Button https://ux.stackexchange.com/questions/1080/using-sign-in-vs-using-log-in
			"lostData": "Forgot your login data? ", //Forgot login text associated to a link to recover password
			"clickHere": "Click here!", //Click here text to go to be used for a specific link
			"notRegistered": "Don't have an account? ", //Text associated to a link to create a new account
			"signUp": "Sign up", //Link to create a new account
			"needHelp": "Need help? Contact our services of ", //Need help text to go to be used for a specific link
			"termsOfUse": "Terms of use", //Software terms of use link text
			"copyright": "Developed by ", //Copyright text
			"painelPrincipal": "Main Painel", //Text for Menu Main Panel. 
			"alertas": "Warnings", //Text for Warnings Menu. 
			"helpHint": "User Help", //Help modal hint
			"userHint": "User Page", //User modal hint
			"logoutHint": "Logout", //Logout hint
			"help": "User Help", //Modal Help title
			"user": "User Page", //Modal user title
			"logoutMessage": "Do you confirm logout?", //Logout confirmation message
			"yesButton": "Yes", //Yes button text
			"noButton": "No", //No button text
			"backButton": "Go Back", //Go back button text
			"searchBox": "Search something here", //search box hint
			"search": "Search",	//Search box placeholder
			"linesNumber": "lines", //Footer hint for number of lines
			"firstPage": "First Page", //Footer hint for first page
			"nextPage": "Next Page", //Footer hint for next page
			"previousPage": "Previous Page", //Footer hint for previous page
			"lastPage": "Last Page", //Footer hint for last page
			"serverOffline": "Server error. Verify your connection or contact the system administrator!", //Exception text associated to a server error (eg. 500)
			"inputError": "Fill this field properly!", //Error text for some misfiled field
			"emptyInputError": "Required field", //Error text for non-filed required field
			"validationError": "Check the misfilled fields!", //Message for validation error in any form
			"passwordRecovery": "Password Recovery", //Recovery title
			"sendConfirmationCodeButton": "Send recovery code", //Send recovery button
			"passwordRecoveryButton": "Recover Password", //Recovery button
			"recoveryCodeMessage": "A confirmation code was sent to your account. Use it in the form below", //Message after sending code
			"passwordRecoveryMessage": "Your password was updated sucessfully!", //Message after password update
			"signUpMessage": "User data created sucessfully!", //Message after Signing up
			"signUpError": "Something went wrong on creating the user. Check your connection to the server!", //Message after Signing up
			"passwordRecoveryError": "The provided information is invalid!", //Error during password update
			"recoveryCodeError": "The recovery code could not be sent, verify your connection and the provided contact", //Error on sending the recovery code
			"missmatchPasswordError": "The passwords should match!", 
			"weakPasswordError": "Weak password. Use letters, numbers and special characters!",
			"preview": "Prfeview",
			"notAllowed": "You haven't permission to access this restricted area!",
			"print": "Print"
		}, //End the key containing all generic strings for the whole application
		"Votos": { //Begin the key containing strings associated to Votes module
			"name": "Votes", //Page title name
			"mainTabs": ["Votes Tab 1", "Votes Tab 2", "Votes Tab 3"], //Tabs for different types in the module
			"modalTabs": ["Main Fields", "Auxiliary Fields", "Others"], //Tabs for different types in the module form
			"modalTabsTitles": ["Main Fields", "Auxiliary Fields", "Others"], //Titles for each tab content for different types in the module form
			"saveButtonHint": "Save new entiry", //Hint for button save
			"editButtonHint": "Edit Vote", //Hint for button edit
			"deleteButtonHint": "Delete Vote", //Hint for button delete
			"lockButtonHint": "Already signed Vote or in edition", //Hint for button lock. TODO: The icon should be dynamic and we'll need another message in alternative to this
			"lockButtonMessage": "You cannot edit an Vote already signed or being edited by someone else", //Text for button lock click
			"saveButton": "Save Vote", //Text for button save
			"editButton": "Edit Vote", //Text for button edit
			"deleteButton": "Delete Vote", //text for button delete
			"titleSave": "New Vote", //Title for modal save and for the button to open this modal
			"titleEdit": "Edit Vote", //Title for modal edit
			"titleDelete": "Delete Vote", //Title for modal delete
			"messageDelete": "Do you really want to delete this Vote?", //Delete confirmation message
			"successSave": "Vote saved successfully!", //Successful POST message
			"successEdit": "Vote edited successfully!", //Successful PUT message
			"successDelete": "Vote deleted successfully!", //Successful DELETE message
			"errorSaveClient": "Some error occured while saving Vote, Check your connection to the server, then try again!", //Client error message for POST
			"errorSaveServer": "Some error occured while saving Vote, contact the server administrator or try again later!", //Server error message for POST
			"errorEditClient": "Some error occured while editing Vote, Check your connection to the server, then try again!", //Client error message for PUT
			"errorEditServer": "Some error occured while editing Vote, contact the server administrator or try again later!", //Server error message for PUT
			"errorDeleteClient": "Some error occured while deleting Vote, Check your connection to the server, then try again!", //Client error message for DELETE
			"errorDeleteServer": "Some error occured while deleting Vote, contact the server administrator or try again later!", //Server error message for DELETE
			"emptyMessage": "No available Votes; Check your connection to the server!", //Empty table message
			"actionsTitle": "Manage Votes", //CRUD Title text
			"data":{ //Begin labels for the fields in the current module
				"codvoto": "Vote Code",
			}, //End labels for the fields in the current module
		}, //End the key containing strings associated to the current module
		"Utilizadores": { //Início da chave que contém as strings associadas ao módulo Votos
			"name": "Users", //Nome do título da página
			"mainTabs": ["Users Tab 1", "Users Tab 2", "Users Tab 3"], //Tabs para os diferentes tipos do módulo
			"modalTabs": ["Campos principais", "Campos auxiliares", "Outros"], //Tabs para os diferentes separadores no fomulário do módulo
			"modalTabsTitles": ["Campos principais", "Campos auxiliares", "Outros"], //Títulos para o conteúdo de cada tab de formulário
			"saveButtonHint": "Gravar User", //Hint do botão guardar
			"editButtonHint": "Editar User", //Hint do botão editar
			"deleteButtonHint": "Eliminar User", //Hint do botão eliminar
			"lockButtonHint": "User já assinada ou em edição", //Hint do botão lock (cadeado de bloqueio sobre registos não editáveis no momento)
			"lockButtonMessage": "Não poderá alterar dados a serem alterados por outra pessoa ou documentos já assinados!", //Texto de mensagem ao clicar no botão lock
			"saveButton": "Guardar User", //Texto do botão guardar
			"editButton": "Editar User", //Texto do botão editar
			"deleteButton": "Eliminar User", //Texto do botão eliminar
			"titleSave": "Novo User", //Título do modal de inserção e do botão para abrir tal modal
			"titleEdit": "Editar User", //Título do modal de edição
			"titleDelete": "Eliminar User?", //Título do modal de eliminação
			"messageDelete": "Pretende eliminar a seguinte User?", //Mensagem de confirmação do modal de eliminação
			"successSave": "Dados do User gravados com sucesso!", //Mensagem do POST bem sucedido
			"successEdit": "Dados do User atualizados com sucesso!", //Mensagem do PUT bem sucedido
			"successDelete": "User eliminada com sucesso!", //Mensagem do DELETE bem sucedido
			"errorSaveClient": "Ocorreu um erro ao gravar o User, verifique a sua conexão com servidor e tente novamente!", //Mensagemn de erro no cliente para POST
			"errorSaveServer": "Ocorreu um erro ao gravar o User, servidor em manutenção por pouco tempo; tente mais tarde!", //Mensagemn de erro no servidor para POST
			"errorEditClient": "Ocorreu um erro ao atualizar o User, verifique a sua conexão com servidor e tente novamente!", //Mensagemn de erro no cliente para PUT
			"errorEditServer": "Ocorreu um erro ao atualizar o User, servidor em manutenção por pouco tempo; tente mais tarde!", //Mensagemn de erro no servidor para PUT
			"errorDeleteClient": "Ocorreu um erro ao eliminar o User, verifique a sua conexão com servidor e tente novamente!", //Mensagemn de erro no cliente para DELETE
			"errorDeleteServer": "Ocorreu um erro ao eliminar o User, servidor em manutenção por pouco tempo; tente mais tarde!", //Mensagemn de erro no servidor para DELETE
			"emptyMessage": "Sem Users disponíveis; verifique a sua conexão ao servidor!", //Mensagem de tabela vazia. TODO: use it!
			"actionsTitle": "Gerir Users", //Título acima dos botões de CRUD na tabela genérica
			"data":{ //Início das labels para os campos deste módulo
				"codutilizador": "Código Users",
			}, //Fim das labels para os campos deste módulo
		}, //Fim da chave que contém as strings associadas ao módulo Votos
	}, //End Great Britain English strings
	/*"en-us":{ //Begin US English strings

	}, //End US English strings
	"fr-fr":{//Début strings français - France

	},//Fin strings français France
	"fr-bg":{ //Début strings français - Belgique

	}, //Fin trings français Belgique
	/*"pt-br":{ //Início strings em Português do Brasil

	}, //Fim strings em Português do Brasil*/
};	//End Json to map each DB table with values for views
module.exports = { //Begin exporting languages module to be required and used in the main files
	languages,
} //End exporting languages module to be required and used in the main files - 6292a9bb828f4cfbd5b16ba4a3c1228b6db7f188996a20c2c89998ea49ae6a48311add05e3b89b1f616afdeb7b32dc004cce351bdbd6ec9c6dcda57071e25513
