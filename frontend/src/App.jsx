import React, { useState } from 'react'
import LoginForm from './components/login-form/login_form.jsx'
import Background from './components/background/background.jsx'
import Layouts from './components/layouts/layouts.jsx'
import Loader from './components/loader/loader.jsx'
import Dashboard from './components/dashboard/dashboard.jsx'
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
    const [loading, setLoading] = useState(false)
    const [isAuth, setIsAuth] = useState(false)
    const [userName, setUserName] = useState('')

    return (
        <BrowserRouter>
            <Layouts>
                {loading ? (
                    <Loader userName={userName}/>
                ) : isAuth ? (
                    <Routes>
                        <Route path="/dashboard/*" element={<Dashboard setIsAuth={setIsAuth} userName={userName} />} />
                    </Routes>
                ) : (
                    <LoginForm setLoading={setLoading} setIsAuth={setIsAuth} setUserName={setUserName}/>
                )}
            </Layouts>
        </BrowserRouter>
    )
}

export default App