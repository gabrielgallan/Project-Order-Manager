import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { autenticateUser } from './autenticar.js'
import './login-form.css'

//Função que retorna o formulário de login, autenticação e loader
function LoginForm({setLoading, setIsAuth, setUser}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const res = useRef()
    const navigate = useNavigate()

// => Função que envia o formulário e valida o usuário
    async function handleSubmit(e) {
        e.preventDefault()

        const reply = /*{status:true, message:'Autenticado', name: 'João'}*/ await autenticateUser(email, password)

        if (reply.status) {
            setUser(reply.user)
            setLoading(true)
            setTimeout(() => {
                setLoading(false)
                setIsAuth(true)
                navigate("/dashboard/pedidos"); //Redireciona para o Dashboard
            }, 1000)
        
        } else {
            res.current.innerText = reply.message
        }

    }    

// => Retorno do formulário ou loader
    return  (
        <div className="login-box">
            <h2>Login to Maestro</h2>
            <form onSubmit={handleSubmit}>
                <div className="user-box">
                    <input 
                        type="text"
                        required autoComplete='off'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <label>Email</label>
                </div>
                <div className="user-box">
                    <input 
                        type="password"
                        required autoComplete='off'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <label>Password</label>
                </div>
                <div className="buttons">
                    <button className="login"type='submit'>
                        Log In
                    </button>
                </div>
                <div className="change">
                    <p>No account ? <a href="#" className="changeButton">Sign Up</a></p>
                </div>
                <div className="logResponse" ref={res}></div>
            </form>
        </div>
    )
}

export default LoginForm