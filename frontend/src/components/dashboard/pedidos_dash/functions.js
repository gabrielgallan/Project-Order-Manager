

export async function getOrders() {
    const response = await fetch('http://localhost:4000/pedidos')
    if (response.ok) {
        const data = await response.json()

        const orders = data.map((order) => {
            return {
                _id:order._id,
                id:order.orderID, 
                produto: { nome:order.produto.nome, itens:order.produto.itens, preco: order.produto.preco }, 
                quantidade: order.quantidade, 
                cliente: order.clientName, 
                deliveryMan: order.deliveryMan, 
                paymentForm:order.paymentForm, 
                price:order.price
            }
        })

        return orders
    } else {
        return []
    }
}

export async function formatedOrder(order) {
    const id = await generateID()
    const price = (parseFloat(order.produto.preco) * parseFloat(order.quantidade)).toFixed(2)
    
    const pedidoFormatado = {
        orderID: id,
        produto: { nome: order.produto.nome, itens: order.produto.itens, preco: order.produto.preco },
        quantidade: Number(order.quantidade),
        clientName: order.cliente,
        deliveryMan: order.entregador,
        paymentForm: order.pagamento,
        price
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
        const confirm = window.confirm('Tem certeza que deseja deletar este pedido?')
        if (confirm) {
            const response = await fetch(`http://localhost:4000/pedidos/${key}`, {method: 'DELETE'})
            if (response.ok) {
                return { message: 'Pedido deletado', status: true }
           } else {
               return { message: 'Erro ao deletar o pedido', status: false }
           }
        } else {
            return { message: 'Solicitação cancelada', status: false }
        }
        
    } else {
        return { message: 'Erro ao encontrar o pedido', status: false }
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

export async function formateEditedOrder(order) {
    const newPrice = (Number(order.produto.preco) * Number(order.quantidade)).toFixed(2)

    const body = {
        produto: order.produto,
        quantidade: Number(order.quantidade),
        clientName: order.cliente,
        deliveryMan: order.entregador,
        paymentForm: order.pagamento,
        price: newPrice
    }

    return {body, _id:order._id}
}

export async function putOrder(order) {
    const req = await formateEditedOrder(order)
    const response = await fetch(`http://localhost:4000/pedidos/${req._id}`, {
         method: 'PUT',
         headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(req.body)
    })

    if (response.ok) {
        return { message: 'Pedido Atualizado', status: true }
    } else {
        return { message: 'Erro ao atualizar o pedido', status: true }
    }
    
}

export async function getMotoboysNames() {
    const response = await fetch('http://localhost:5000/motoboys')
    if (response.ok) {
        const data = await response.json()

        const motoboyNames = data.map((motoboy) => motoboy.nome.trim().split(' ')[0])

        return motoboyNames
    } else {
        return []
    }
}