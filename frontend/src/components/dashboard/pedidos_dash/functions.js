

export async function getOrders() {
    const response = await fetch('http://localhost:4000/pedidos')
    if (response.ok) {
        const data = await response.json()

        const orders = data.map((order) => {
            return {
                _id:order._id,
                id:order.orderID, 
                produto: order.produto,
                itens: order.itens, 
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
    const id = await generateID()
    
    const pedidoFormatado = {
        orderID: id,
        produto: order.produto.nome,
        itens: order.produto.itens,
        quantidade: Number(order.quantidade),
        clientName: order.cliente,
        deliveryMan: order.entregador,
        paymentoForm: order.pagamento,
        price: order.produto.preco
    }
    console.log(pedidoFormatado)
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
    const searchOrder = orders.find(order => order._id===id)
    
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

export async function generateID() {
    const response = await fetch('http://localhost:4000/pedidos')

    if (response.ok) {
        const data = await response.json()
        const newID = data.length < 1 ? 1 : data.map((order) => {
            return Number(order.orderID)
        }).reduce((acc, atual) => acc > atual ? acc : atual) + 1


        return String(newID).padStart(3, '0'); 
    } else {
        return 'Bad Request'
    }
}