import React, { useState } from 'react'
import LoginForm from './components/login-form/login_form.jsx'
import Background from './components/background/background.jsx'
import Layouts from './components/layouts/layouts.jsx'
import Loader from './components/loader/loader.jsx'
import Dashboard from './components/dashboard/dashboard.jsx'
import { BrowserRouter } from "react-router-dom";

function App() {
    const [loading, setLoading] = useState(false)
    const [isAuth, setIsAuth] = useState(false)

    return (
        <BrowserRouter>
            <Layouts>
                {loading ? (
                    <Loader />
                ) : isAuth ? (
                    <Dashboard setIsAuth={setIsAuth} />
                ) : (
                    <LoginForm setLoading={setLoading} setIsAuth={setIsAuth} />
                )}
            </Layouts>
        </BrowserRouter>
    )
}

export default App