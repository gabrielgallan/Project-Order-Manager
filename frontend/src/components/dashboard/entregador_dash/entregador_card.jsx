import './entregador_card.css'
import { useState } from 'react'

export default function EntregadorCard({ entregador, onDelete, onEdit }) {
    const [showActions, setShowActions] = useState(false)

    //Mostrar ações
    function handleShowActions() {
        setShowActions(prev => !prev);
    }

    return (
        <div className="card">
        <div className="profile-pic">
            <svg xmlns="http://www.w3.org/2000/svg" height="90px" viewBox="0 -960 960 960" width="90px" fill="#000000"><path d="M180-120q-24 0-42-18t-18-42v-600q0-24 18-42t42-18h207q-2-37 26-66.5t67-29.5q39 0 67 29.5t26 66.5h207q24 0 42 18t18 42v600q0 24-18 42t-42 18H180Zm300-702q13 0 21.5-8.5T510-852q0-13-8.5-21.5T480-882q-13 0-21.5 8.5T450-852q0 13 8.5 21.5T480-822ZM180-217q60-56 135.9-90.5 75.89-34.5 164-34.5 88.1 0 164.1 34.5T780-217v-563H180v563Zm302-204q58 0 98-40t40-98q0-58-40-98t-98-40q-58 0-98 40t-40 98q0 58 40 98t98 40ZM235-180h490v-9q-54-46-116-69.5T480-282q-67 0-129 23.5T235-189v9Zm247-301q-32.5 0-55.25-22.75T404-559q0-32.5 22.75-55.25T482-637q32.5 0 55.25 22.75T560-559q0 32.5-22.75 55.25T482-481Zm-2-18Z"/></svg>
        </div>

        <div className="infos">
            <div className="container_1">
                <div><strong>Nome</strong><br /><div className="text">{entregador.nome}</div></div>
                <div><strong>Telefone</strong><br /><div className="text">{entregador.telefone}</div></div>
            </div>

            <div className="container_2">
                <div><strong>CPF</strong><br /><div className="text">{entregador.cpf}</div></div>
                
                <div><strong>CNH</strong><br /><div className="text">{entregador.cnh}</div></div>
            </div>

            <div className="container_3">
                <div><strong>Placa da moto</strong><br /><div className="text">{entregador.placa}</div></div>
            </div>
        </div>

        <div className="container_menu">
            <div className="icon" onClick={handleShowActions}>
                <svg xmlns="http://www.w3.org/2000/svg" height="35px" viewBox="0 -960 960 960" width="35px" fill="#000000"><path d="M240-400q-33 0-56.5-23.5T160-480q0-33 23.5-56.5T240-560q33 0 56.5 23.5T320-480q0 33-23.5 56.5T240-400Zm240 0q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm240 0q-33 0-56.5-23.5T640-480q0-33 23.5-56.5T720-560q33 0 56.5 23.5T800-480q0 33-23.5 56.5T720-400Z"/></svg>
            </div>

            <div className="mt_actions" style={{ display: showActions ? 'flex' : 'none' }}>
                <div className="mt_edit" onClick={() => {onEdit(entregador)}}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="25px" viewBox="0 -960 960 960" width="25px" fill="#000000"><path d="M160-400v-80h280v80H160Zm0-160v-80h440v80H160Zm0-160v-80h440v80H160Zm360 560v-123l221-220q9-9 20-13t22-4q12 0 23 4.5t20 13.5l37 37q8 9 12.5 20t4.5 22q0 11-4 22.5T863-380L643-160H520Zm300-263-37-37 37 37ZM580-220h38l121-122-18-19-19-18-122 121v38Zm141-141-19-18 37 37-18-19Z"/></svg>
                </div>

                <div className="mt_delete" onClick={() => {onDelete(entregador._id, entregador.nome)}}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="23px" viewBox="0 -960 960 960" width="23px" fill="#000000"><path d="M280-440h400v-80H280v80ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
                </div>
            </div>
        </div>
        
    </div>
    )
}