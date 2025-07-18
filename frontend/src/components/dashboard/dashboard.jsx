import './dashboard.css';
import { Link, Routes, Route, NavLink } from "react-router-dom";
import { setUserStatus } from "../login-form/autenticar.js"
import Pedidos from "./pedidos_dash/pedidos.jsx";
import Usuarios from "./usuarios_dash/usuarios.jsx";
import Entregadores from './entregador_dash/entregadores.jsx';



function Dashboard({setIsAuth, user}) {
    return (
        <div className="dash_container">
            <div className="dash_box">
                    <nav className="navbar">
                        <div className="dados_user">
                            <img src="/icons/account.png" alt=""/>
                            <div className="dados">
                                <p className="nome">{user.name.trim().split(" ")[0]}</p>
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
                            <NavLink to="/dashboard/entregadores" className={({ isActive }) => isActive ? "nav-active" : ""}>
                            <img src="/icons/delivery.png" alt="" />Entregadores
                            </NavLink>
                        </div>

                        <div className="logout">
                            <img src="/icons/sair.png" alt="" />
                            <a className='sair' onClick={() => {
                                    const confirm = window.confirm('Tem certeza que deseja sair da conta?')
                                    if (confirm) {
                                        setUserStatus(user.id, false);
                                        setIsAuth(false) 
                                    } else {
                                        alert('Solicitação cancelada')
                                    }
                                    
                                }}
                            >
                                Sair
                            </a>
                        </div>
                    </nav>
                <div className="dash_content">
                    <Routes>
                        <Route path="pedidos" element={<Pedidos />} />
                        <Route path="usuarios" element={<Usuarios />} />
                        <Route path="entregadores" element={<Entregadores />} />
                        
                        <Route path="*" element={<Pedidos />} />
                    </Routes>
                </div>

            </div>
            
        </div>
        
    )
}

export default Dashboard