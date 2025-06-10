import './pedidos.css'
import { useState, useEffect } from 'react';
import PedidoCard from "./PedidoCard.jsx"
import PedidoForm from './PedidoForm.jsx'
import EditPedidoForm from './EditPedidoForm.jsx';
import { getOrders, deleteOrder } from './functions.js'

export default function Pedidos() {
    const [showForm, setShowForm] = useState(false)
    const [pedidos, setPedidos] = useState([])
    const [editForm, setEditForm] = useState(null)

    
    // Função para buscar pedidos
    async function fetchPedidos() {
        const data = await getOrders();
        setPedidos(data);
    }

    useEffect(() => {
        fetchPedidos();

        const intervalOrders = setInterval(() => {
            fetchPedidos()
        }, 5000)

        return () => clearInterval(intervalOrders)
    }, []);

    // Função chamada ao fechar o form
    function handleCloseForm() {
        setShowForm(false);
        fetchPedidos(); // Atualiza a lista ao fechar o form
    }

    async function handleDeletePedido(id) {
        const res = await deleteOrder(id)
        alert(res.message)

        fetchPedidos()
    }

    // FUnção para abrir o form de edição e passar o pedido
    async function handleEditPedido(pedido) {
        setEditForm(pedido)
        setShowForm(false)
    }

    // Função para fechar o form de edição
    function handleCloseEditForm() {
        setEditForm(null);
        fetchPedidos();
    }

    return (
        <div className="pedidos_container">
            <div className="titulo_row">
                <h2 className="titulo">Gerenciamento de Pedidos</h2>
                <button onClick={() => {setShowForm(true); setEditForm(null)}}  className="registrar">
                    <svg className="svgIcon" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ffffff"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
                </button>
            </div>
            
            
            {showForm ? (
            <PedidoForm onClose={handleCloseForm}/>
        ) : editForm ? (
            <EditPedidoForm pedido={editForm} onClose={handleCloseEditForm}/>
        ) : (
            <div className="pedidos_list">
                {pedidos.length === 0 ? (
                    <p className="sem_pedidos">Nenhum pedido encontrado</p>
                ) : (
                    pedidos.map(pedido => (
                        <PedidoCard 
                            key={pedido._id}
                            pedido={pedido} 
                            onDelete={handleDeletePedido} 
                            onEdit={handleEditPedido}
                        />
                    ))
                )}
            </div>
        )}

        </div>
    )
}