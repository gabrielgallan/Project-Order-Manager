import React, { useState, useRef } from "react";
import { Link, Routes, Route } from "react-router-dom";
import './dashboard.css'

function Dashboard({setIsAuth}) {
    return (
        <div className="dash_container">
            <div className="dash">
                <nav className="navbar">
                    <Link to="">Pedidos</Link>
                    <Link to="">Usuários</Link>
                    <Link to="">Entregadores</Link>
                    <button className='sair'onClick={() => setIsAuth(false)}>Sair</button>
                </nav>
                <div className="dash_content">
                    
                </div>

            </div>
            
        </div>
        
    )
}

export default Dashboard