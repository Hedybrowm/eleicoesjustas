import './App.css'

function Login() {
  return (
    <header>
    <div className="topBar"></div>
    <div className="container">
        <div className = "containerLeft">
            <h1 clasName = "titulo"><div className="parag">Eleições Seguras</div></h1>
            <div className = "paragrafo">
            Contribuir para que as eleições em Angola sejam justas, transparentes e 
            com um elevado grau de participação, não é só um acto de cidadania e patriotismo, 
            acima de tudo é amor ao próximo!
            </div>
        </div>
        <div className = "containerRight">
            <form className = "formLogin">
                <h3 className="titleRegister">Login</h3>
                <input type = "email" id = "email" className = "email" placeholder = "escreve aqui teu email"></input>
                <input type = "password" id = "senha" className = "senha" placeholder = "escreve aqui tua senha"></input>
                <input type = "button" id = "btn_login" className = "btn_login" value = "Entrar"></input>
                <a className="passRecovery" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">Esqueceu a senha?</a>
            </form>
        </div>
    </div>
</header>
  );
}

export default Login;