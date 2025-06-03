
async function generateID() {
    const response = await fetch('http://localhost:4000/pedidos')

    if (response.ok) {
        const data = await response.json()
        const newID = data.map((order) => {
            return Number(order.orderID)
        }).reduce((acc, atual) => acc > atual ? acc : atual) + 1

        const digitos = String(newID).length

        return digitos <= 9 ? `00${newID}` : `0${newID}` 
    } else {
        return 'Bad Request'
    }
}

