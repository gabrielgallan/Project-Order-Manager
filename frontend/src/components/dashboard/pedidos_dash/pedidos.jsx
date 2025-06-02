import './pedidos.css'
import PedidoCard from "./PedidoCard.jsx"

export default function Pedidos() {

    const pedidos = [
        { _id: 1, cliente: "João", itens: ["Pizza", "Suco"], status: "Em preparo" },
        { _id: 2, cliente: "Maria", itens: ["Hambúrguer"], status: "Entregue" },
        { _id: 3, cliente: "João", itens: ["Pizza", "Suco"], status: "Em preparo" },
        { _id: 4, cliente: "Maria", itens: ["Hambúrguer"], status: "Entregue" },
    ];

    return (
        <div className="pedidos_container">
            <h2 className="titulo">Pedidos</h2>
            <div className="pedidos_list">
                {pedidos.map(pedido => (
                <PedidoCard key={pedido._id} pedido={pedido} />
            ))}
            </div>
        </div>
    )
}