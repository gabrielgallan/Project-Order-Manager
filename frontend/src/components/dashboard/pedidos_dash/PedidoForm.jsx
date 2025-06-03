import './pedidos.css'
import React, { useState, useEffect } from 'react'
import { formatOrder, postOrder } from './functions.js';


function PedidoForm({ onClose }) {

    const motoboys = ['Gabriel', 'Guilherme', 'Vitor']

    // Estados para cada campo
    const [produto, setProduto] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [cliente, setCliente] = useState('');
    const [entregador, setEntregador] = useState('');
    const [pagamento, setPagamento] = useState('');
    const [preco, setPreco] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        const novoPedido = {
            produto,
            quantidade,
            cliente,
            entregador,
            pagamento,
            preco
        };

        const pedidoFormatado = await formatOrder(novoPedido)
        const res = await postOrder(pedidoFormatado)

        console.log(res.message)
        if (onClose) onClose()
    }

    return (
        <div className="pedido_form_box">
            <h3>Novo Pedido</h3>
            <div className="linha"></div>
            <form className="pedido_form" onSubmit={handleSubmit}>
                <div className="input_pedidos">
                    <select required value={produto} onChange={e => setProduto(e.target.value)}>
                        <option value=""></option>
                        <option value="Combo 1">Combo 1</option>
                        <option value="Combo 2">Combo 2</option>
                        <option value="Combo 3">Combo 3</option>
                    </select>
                    <label>Produto</label>
                </div>
                <div className="input_pedidos">
                    <input 
                        type="number"
                        required
                        autoComplete='off'
                        value={quantidade}
                        onChange={e => setQuantidade(e.target.value)}
                    />
                    <label>Quantidade</label>
                </div>
                <div className="input_pedidos">
                    <input 
                        type="text"
                        required
                        autoComplete='off'
                        value={cliente}
                        onChange={e => setCliente(e.target.value)}
                    />
                    <label>Cliente</label>
                </div>
                <div className="input_pedidos">
                    <select required value={entregador} onChange={e => setEntregador(e.target.value)}>
                        <option value=""></option>
                        {motoboys.map((motoboy, idx) => (
                            <option key={idx} value={motoboy}>{motoboy}</option>
                        ))}
                    </select>
                    <label>Entregador</label>
                </div>
                <div className="input_pedidos">
                    <select required value={pagamento} onChange={e => setPagamento(e.target.value)}>
                        <option value=""></option>
                        <option value="Dinheiro">Dinheiro</option>
                        <option value="Cartao">Cartão</option>
                        <option value="Pix">Pix</option>
                    </select>
                    <label>Forma de Pagamento</label>
                </div>
                <div className="input_pedidos">
                    <input 
                        type="number"
                        step="0.01"
                        min="0"
                        required
                        autoComplete='off'
                        value={preco}
                        onChange={e => setPreco(e.target.value)}
                    />
                    <label>Preço</label>
                </div>
                <div className="enviar_pedido">
                    <button type='submit'><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#330C90"><path d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z"/></svg></button>
                </div>
                
            </form>

        </div>
    )
}

export default PedidoForm