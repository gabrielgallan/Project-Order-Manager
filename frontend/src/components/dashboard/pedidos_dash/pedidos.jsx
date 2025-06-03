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
            <h2 className="titulo">Pedidos</h2>
            <button onClick={() => setShowForm(true)} className="registrar">Registrar</button>
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