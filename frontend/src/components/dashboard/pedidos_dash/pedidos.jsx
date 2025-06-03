import './pedidos.css'
import { useState, useEffect } from 'react';
import PedidoCard from "./PedidoCard.jsx"
import PedidoForm from './PedidoForm.jsx'
import { getOrders, deleteOrder } from './functions.js'

export default function Pedidos() {
    const [showForm, setShowForm] = useState(false)
    const [pedidos, setPedidos] = useState([])

    
    // Função para buscar pedidos
    async function fetchPedidos() {
        const data = await getOrders();
        setPedidos(data);
    }

    useEffect(() => {
        fetchPedidos();
    }, []);

    // Função chamada ao fechar o form
    function handleCloseForm() {
        setShowForm(false);
        fetchPedidos(); // Atualiza a lista ao fechar o form
    }

    async function handleDeletePedido(id) {
        const res = await deleteOrder(id)
        console.log(res.message)

        fetchPedidos()
    }

    return (
        <div className="pedidos_container">
            <div className="titulo_row">
                <h2 className="titulo">Gerenciamento de Pedidos</h2>
                <button onClick={() => setShowForm(true)} className="registrar">
                    <svg className="svgIcon" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ffffff"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
                </button>
            </div>
            
            
            {showForm ? (
                <PedidoForm onClose={handleCloseForm}/>
            ) : (
                <div className="pedidos_list">
                    {pedidos.map(pedido => (
                        <PedidoCard key={pedido._id} pedido={pedido} onDelete={handleDeletePedido}/>
                    ))}
                </div>
            )}
        </div>
    )
}