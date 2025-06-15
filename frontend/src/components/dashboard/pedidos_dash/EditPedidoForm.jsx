import { useState, useEffect } from 'react'
import { produtos } from './catalogo-produtos';
import { formateEditedOrder, getMotoboysNames, putOrder } from './functions';

function EditPedidoForm( { pedido, onClose } ) {
    // Estados locais para os campos do formulário
    const [produto, setProduto] = useState({});
    const [quantidade, setQuantidade] = useState('');
    const [cliente, setCliente] = useState('');
    const [entregador, setEntregador] = useState('');
    const [pagamento, setPagamento] = useState('');
    const [motoboys, setMotoboys] = useState([]);

    async function handleSetMotoboys() {
        const res = await getMotoboysNames()
        setMotoboys(res)
    }

    useEffect(() => {
        if (pedido) {
            setProduto(pedido.produto || {});
            setQuantidade(pedido.quantidade || '');
            setCliente(pedido.cliente || '');
            setEntregador(pedido.deliveryMan || '');
            setPagamento(pedido.paymentForm || '');
            
        }
        handleSetMotoboys();
    }, [pedido]);

    async function handleSubmit(e) {
        e.preventDefault();
        const newOrderEdited = {
            _id: pedido._id,
            produto,
            quantidade,
            cliente,
            entregador,
            pagamento,
        }

        const res = await putOrder(newOrderEdited)
        alert(res.message)

        if (onClose) onClose();
    }



    return (
            <div className="pedido_edit_box">
                        <h3>Editar Pedido</h3>
                        <div className="linha"></div>
                        <form className="pedido_form" onSubmit={handleSubmit}>
                            <div className="input_pedidos">
                                <select
                                    required
                                    value={produto.nome || ""}
                                    onChange={e => {
                                        const selected = produtos.find(prod => prod.nome === e.target.value);
                                        setProduto(selected || {});
                                    }}
                                >
                                    <option value=""></option>
                                    {produtos.map((prod, idx) => (
                                        <option key={idx} value={prod.nome}>{prod.nome}</option>
                                    ))}
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
                    <select 
                    required 
                    value={entregador} 
                    onChange={e => setEntregador(e.target.value)}>
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
                            
                            
                            
                            
                    
                            <div className="enviar_pedido">
                                <button type='submit'><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#330C90"><path d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z"/></svg></button>
                            </div>
                            
                        </form>
            
                    </div>
        )
    
}

export default EditPedidoForm