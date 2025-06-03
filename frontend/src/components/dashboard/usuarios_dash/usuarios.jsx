import './usuarios.css'
import { useState, useEffect } from 'react';

function Usuarios() {
    const users = [1,2,3,4,5,6,7,8,9,0]

    return (
        <div className="usuarios_container">
            <h2 className="titulo">Gerenciamento de Usuários
                <button>+</button>
            </h2>
            <div className="list_box">
                <header>

                </header>
                <div className="user-list">
                    {users.map(user => (
                        <div className="user_card"></div>))}
                </div>

            </div>
            
        </div>
    )
}

export default Usuarios