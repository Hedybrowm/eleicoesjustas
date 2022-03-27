import './App.css'

function Login() {
  return (
    <header className='container'>
        <div className='row'>
            <div className='col-12 topBar'></div>
        </div>
        <div className='row'>
            <div className = "col-md-6 col-sm-12 align-self-center">
                <div className='row text-center mt-5'>
                    <h1 clasName = "titulo">Eleições Seguras</h1>
                </div>
                <div className = "row">
                    <p className='paragrafo text-center'>
                        Contribuir para que as eleições em Angola sejam justas, transparentes e 
                        com um elevado grau de participação, não é só um acto de cidadania e patriotismo, 
                        acima de tudo é amor ao próximo!
                    </p>
                </div>
            </div>
            <div className = "col-md-6 col-sm-12">
                <form className = "formLogin mx-5">
                    <h3 className="text-center">Acesse a sua conta</h3>
                    <label for="name" className="form-label">Nome do utilizador</label>
                    <input type = "email" id = "email" className = "email mb-4" placeholder = "escreve aqui teu email"></input>
                    <label for="password" className="form-label">Password</label>
                    <input type = "password" id = "senha" className = "senha mb-4" placeholder = "escreve aqui tua senha"></input>
                    <input type = "button" id = "btn_login" className = "btn_login mb-3" value = "Entrar"></input>
                    <div className='text-center'>
                        <a className="passRecovery" href="#" target="_blank" rel="noopener noreferrer">Esqueceu a senha?</a>
                    </div>
                </form>
            </div>
        </div>
    </header>
  );
}

export default Login;