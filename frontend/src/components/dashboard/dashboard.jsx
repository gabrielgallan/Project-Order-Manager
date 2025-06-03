import React, { useState, useRef } from "react";
import { Link, Routes, Route, NavLink } from "react-router-dom";
import './dashboard.css'
import Pedidos from "./pedidos_dash/pedidos.jsx";

function Dashboard({setIsAuth, userName}) {
    return (
        <div className="dash_container">
            <div className="dash_box">
                    <nav className="navbar">
                        <div className="dados_user">
                            <img src="/icons/account.png" alt=""/>
                            <div className="dados">
                                <p className="nome">{userName}</p>
                                <p className="cargo">Adminitrador</p>
                            </div>
                        </div>

                        <div className="navoptions">
                            <NavLink to="/dashboard/pedidos" className={({ isActive }) => isActive ? "nav-active" : ""}>
                            <img src="/icons/pedidos.png" alt="" />Pedidos
                            </NavLink>
                        </div>
                        
                        <div className="navoptions">
                            <NavLink to="/dashboard/usuarios" className={({ isActive }) => isActive ? "nav-active" : ""}>
                            <img src="/icons/usuarios.png" alt="" />Usuários
                            </NavLink>
                        </div>

                        <div className="navoptions">
                            <NavLink to="/dashboard/delivery" className={({ isActive }) => isActive ? "nav-active" : ""}>
                            <img src="/icons/delivery.png" alt="" />Delivery
                            </NavLink>
                        </div>

                        <div className="logout">
                            <img src="/icons/sair.png" alt="" /><a className='sair' onClick={() => setIsAuth(false)}>Sair</a>
                        </div>
                    </nav>
                <div className="dash_content">
                    <Routes>
                        <Route path="pedidos" element={<Pedidos />} />
                        
                        {/* Rota padrão (opcional) */}
                        <Route path="*" element={<div>DashBoard</div>} />
                    </Routes>
                </div>

            </div>
            
        </div>
        
    )
}

export default Dashboard