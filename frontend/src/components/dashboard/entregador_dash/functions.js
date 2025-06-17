import axios from 'axios'
import { z } from 'zod'

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

function autenticateForm(form) {
    const schema = z.object({
        firstname: z.string().min(2, "Nome muito curto"),
        lastname: z.string().min(2, "Sobrenome muito curto"),
        cpf: z.string().regex(/^\d{11}$/, "CPF deve ter 11 dígitos e somente números"),
        telefone: z.string().regex(/^\d{11}$/, "Telefone deve ter 11 dígitos e somente números"),
        cnh: z.string().regex(/^\d{10}$/, "CNH deve ter 10 dígitos e somente números"),
        placa: z.string().regex(/^[A-Z0-9]{7}$/i, "Placa inválida"),
    });

    function f(tel, cpf, placa) {
        const newTel = `(${tel.slice(0,2)})${tel.slice(2,7)}-${tel.slice(7)}`
        const newCpf = `${cpf.slice(0,3)}.${cpf.slice(3,6)}.${cpf.slice(6,9)}-${cpf.slice(9,11)}`
        const newPlaca = `${placa.slice(0,3)}-${placa.slice(3,7)}`

        return { newTel, newCpf, newPlaca }
    }

    const result = schema.safeParse(form);

    if (!result.success) {
        // Retorne a primeira mensagem de erro encontrada
        const message = result.error.errors[0]?.message || "Dados inválidos";
        return { status: false, message };
    } else {
        const formated = f(form.telefone, form.cpf, form.placa)
        const body = {
            nome: `${form.firstname} ${form.lastname}`,
            cpf: formated.newCpf,
            telefone: formated.newTel,
            placaMoto: formated.newPlaca,
            CNH: form.cnh
             
        }
        return { status: true, body }
    }

}

export async function postDeliveryMan(form) {
    const req = autenticateForm(form)
    
    if (req.status) {
        const response = await axios.post('http://localhost:5000/motoboys', req.body)
        if (response.status === 200 || response.status === 201) {
            return { status: true, message: 'Entregador registrado' }
        } else {
            return { status: false, message: 'Erro ao registrar entregador' }
        }
    } else {
        return req
    }
}

function autenticateEditForm(form) {
    const data = form.data
    const body = {
        nome: `${data.firstname} ${data.lastname}`,
        cpf: data.cpf,
        telefone: data.telefone,
        placaMoto: data.placa,
        CNH: data.cnh,
    }

    return { body, param:form.user }
}

export async function putDeliveryMan(form) {
    const req = autenticateEditForm(form)
    if (req) {
        const response = await axios.put(`http://localhost:5000/motoboys/${req.param}`, req.body)
        if (response.status === 200) {
            return { status: true, message: 'Alterações salvas com sucesso' }
        } else {
            return { status: false, message: 'Erro ao salvar informações' }
        }
    }
}

    