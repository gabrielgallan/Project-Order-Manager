

export async function getOrders() {
    const response = await fetch('http://localhost:4000/pedidos')
    if (response.ok) {
        const data = await response.json()

        const orders = data.map((order) => {
            return {
                _id:order._id,
                id:order.orderID, 
                produto: order.produto, 
                quantidade: order.quantidade, 
                cliente: order.clientName, 
                deliveryMan: order.deliveryMan, 
                paymentForm:order.paymentoForm, 
                price:order.price
            }
        })

        return orders
    } else {
        return []
    }
}

export async function formatOrder(order) {
    const orders = await getOrders()
    const newID = `0${String(orders.length+1)}`


    const pedidoFormatado = {
        orderID: newID,
        produto: order.produto,
        quantidade: Number(order.quantidade),
        clientName: order.cliente,
        deliveryMan: order.entregador,
        paymentoForm: order.pagamento,
        price: order.preco
    }

    return pedidoFormatado
}

export async function postOrder(order) {
    const response = await fetch('http://localhost:4000/pedidos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(order)
    });

    if (response.ok) {
        return { message: 'Pedido enviado', status: true }
    } else {
        return { message: 'Erro ao enviar o pedido', status: false }
    }
}

export async function deleteOrder(id) {
    const orders = await getOrders()
    const searchOrder = orders.find(order => order.id===id)
    
    const key = searchOrder._id
    
    
    if (key) {
        const response = await fetch(`http://localhost:4000/pedidos/${key}`, {method: 'DELETE'})
            if (response.ok) {
                return { message: 'Pedido deletado', status: true }
           } else {
               return { message: 'Erro ao deletar o pedido', status: false }
           }
    }
     
}