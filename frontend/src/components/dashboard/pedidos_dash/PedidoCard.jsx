import './PedidoCard.css'
import React, { useState, useEffect } from 'react'

export default function PedidoCard({ pedido, onDelete }) {
    return (
        <div className="pedido-card">
        <div className="pedido-info">
            <div className="pedido-esquerda">
                <div className="id"><strong>Pedido <span className="pedido-id">#{pedido.id}</span></strong></div>
                <div className="produto"><strong>{pedido.produto}</strong> &times; {pedido.quantidade}</div>
                <ul className="pedido-detalhes">
                    <li>- Hamburguer</li>
                    <li>- Batata</li>
                    <li>- Bebida</li>
                </ul>
                <div className="pagamento"><strong>Pagamento:</strong> {pedido.paymentForm}</div>
            </div>

            <div className="pedido-meio">
                <div><strong>Cliente</strong><br/>{pedido.cliente}</div>
                <div><strong>Entregador</strong><br/>{pedido.deliveryMan}</div>
            </div>

            <div className="pedido-direita">
                <div className="pedido-acoes">
                    <button className="btn-editar"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#3912e4"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg></button>
                    <button onClick={() => onDelete(pedido.id)} className="btn-excluir"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e54343"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg></button>
                </div>
                <div className="pedido-preco">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#348f4f"><path d="M444-200h70v-50q50-9 86-39t36-89q0-42-24-77t-96-61q-60-20-83-35t-23-41q0-26 18.5-41t53.5-15q32 0 50 15.5t26 38.5l64-26q-11-35-40.5-61T516-710v-50h-70v50q-50 11-78 44t-28 74q0 47 27.5 76t86.5 50q63 23 87.5 41t24.5 47q0 33-23.5 48.5T486-314q-33 0-58.5-20.5T390-396l-66 26q14 48 43.5 77.5T444-252v52Zm36 120q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
                    R${pedido.price}
                </div>
            </div>
        </div>
    </div>
    )
}