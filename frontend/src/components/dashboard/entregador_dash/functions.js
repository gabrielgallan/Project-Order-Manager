import axios from 'axios'

export async function getDeliveryMans() {
    const response = await fetch('http://localhost:5000/motoboys')
    if ( response.ok ) {
        const data = await response.json()

        const entregadores = data.motoboys.map((entregador) => {
            return {
                _id: entregador._id,
                nome: entregador.nome,
                telefone: entregador.telefone,
                cpf: entregador.cpf,
                cnh: entregador.CNH,
                placa: entregador.placaMoto
            }
        })

        return entregadores
    } else {
        return []
    }
}

export async function deleteDeliveryMan(id, nome) {
    const confirmed = confirm(`Tem certeza que deseja remover o entregador ${nome}?`)

    if (confirmed) {
            try {
                const response = await axios.delete(`http://localhost:5000/motoboys/${id}`)
                return { message: 'Entregador removido', status:true }
            } catch(err) {
                return { message: 'Erro ao deletar enregador', status:false }
            }
    } else {
        return { message: 'Operação cancelada', status: false }
    }
}

    