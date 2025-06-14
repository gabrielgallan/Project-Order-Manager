import React, { useState, useEffect } from 'react'
import { setUserStatus } from './components/login-form/autenticar.js'
import LoginForm from './components/login-form/login_form.jsx'
import Background from './components/background/background.jsx'
import Layouts from './components/layouts/layouts.jsx'
import Loader from './components/loader/loader.jsx'
import Dashboard from './components/dashboard/dashboard.jsx'
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
    const [loading, setLoading] = useState(false)
    const [isAuth, setIsAuth] = useState(false)
    const [user, setUser] = useState({})


    //Após autenticação e setUser, ao fechar a janela esta função altera o status do user para false
    useEffect(() => {
        if (isAuth && user.id) {
            const handleUnload = () => {
                // Não use await aqui, pois o navegador pode fechar antes da requisição terminar
                setUserStatus(user.id, false)
            }
            window.addEventListener('beforeunload', handleUnload)
            return () => window.removeEventListener('beforeunload', handleUnload)
        }
    }, [isAuth, user.id])

    return (
        <BrowserRouter>
        {loading ? (
            <Loader user={user}/>
        ) : isAuth ? (
            <Routes>
                <Route path="/dashboard/*" element={<Dashboard setIsAuth={setIsAuth} user={user}/>} />
            </Routes>
        ) : (
            <Layouts>
                <LoginForm setLoading={setLoading} setIsAuth={setIsAuth} setUser={setUser}/>
            </Layouts>
        )}
    </BrowserRouter>
    )
}

export default App