import { z } from 'zod'

export async function getUsers() {
    const response = await fetch('http://localhost:3002/usuarios')
    if (response.ok) {
        const data = await response.json()

        const users = data.usuarios.map((user) => {
            return {
                _id: user._id,
                id: user.id,
                name: user.name,
                email: user.email,
                password: user.password,
                status: user.status
            }
        })

        return users
    } else {
        return []
    }
}

export async function deleteUser(id) {
    const users = await getUsers()
    const searchUser = users.find((user) => user._id===id)
    if (searchUser) {
        const pass = window.prompt(`Informe a senha de ${searchUser.name} para excluir:`)
        if (searchUser.password===pass) {
            const response = await fetch(`http://localhost:3002/usuarios/${searchUser.id}`, { method: 'DELETE' })
            if (response.ok) {
                return { message: 'Usuário deletado', status: true }
            } else {
                return { message: 'Erro ao deletar o usuário', status: false }
            }
        } else {
            return { message: 'Senha inválida', status: false }
        }
    } else {
        return { message: 'Usuário não encontrado', status: false }
    }
}

async function autenticateForm(form) {
    const emailSchema = z.string().email()
    const passSchema = z.string().min(6)

    try {
        const email = emailSchema.safeParse(form.email)

        if (email.success) {
            const users = await getUsers()
            const existEmail = users.find((user) => user.email===email.data)

            if ( existEmail ) {
                throw new Error('Email já cadastrado')
            } else {
               const pass = passSchema.safeParse(form.password)
                    
                if (pass.success) {
                    const confirmPass = pass.data === form.passwordC ? true : false

                    if (confirmPass) {
                        const newForm = {
                            id: await generateID(),
                            name: `${form.firstname} ${form.lastname}`,
                            email: email.data,
                            password: pass.data
                        }


                        return { status:true, body: newForm }
                    } else {
                        throw new Error('Senhas incompátiveis')
                    }



                } else {
                    throw new Error('A senha deve conter no mínimo 6 dígitos')
                } 
            }


            
        } else {
            throw new Error('Formato de email incorreto')
        }


    } catch (err) {
        return { message: err.message || 'Erro desconhecido', status: false }
    }
    
}

export async function postUser(form) {
    const req = await autenticateForm(form)
    if (req.status) {
        const response = await fetch('http://localhost:3002/usuarios', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req.body)
        })

        return response.ok ? 
            { message:'Usuário cadastrado', status:true } :
            { message:'Erro ao cadastrar usuário', status:false }
    } else {
        return req
    }

}

async function generateID() {
    const users = await getUsers()
    const newID = users.length < 1 ? 1 : users.map((user) => {
        return Number(user.id)
    }).reduce((acc, atual) => acc > atual ? acc : atual) + 1
    
    return String(newID).padStart(2, '0');
}

export async function autenticateEditForm(form) {
    const userPass = window.prompt(`Informe a senha de ${form.usuario.name} para editar:`)
    let newEmail = null
    let newPass = null
    if ( userPass===form.usuario.password ) {
        const emailSchema = z.string().email()
        const passSchema = z.string().min(6)

        try {
            const email = emailSchema.safeParse(form.email)

            if (email.success) {
                if (email.data===form.usuario.email) {
                    newEmail = email.data
                } else {
                    const users = await getUsers()
                    const existEmail = users.find((user) => user.email===email.data)

                    if (existEmail) {
                        throw new Error('Email já cadastrado')
                    } else {
                        newEmail = email.data
                    }
 
                }
                
                const pass = passSchema.safeParse(form.newPassword)
                if (pass.success) {
                    const newPass = pass.data
                    const editedForm = {
                        name: `${form.firstname} ${form.lastname}`,
                        email: newEmail,
                        password: newPass
                    }

                    return { status: true, body: editedForm, userId:form.usuario.id}

                } else {
                    throw new Error('Formato de senha inválida')
                }


            } else {
                throw new Error('Formato de email inválido')
            }


        } catch(err) {
            return { message: err.message, status:false }
        }


    } else {
        alert('Senha incorreta')
        return { status: false, message: 'Senha incorreta' }
    }
}

export async function putUser(form) {
    const req = await autenticateEditForm(form)
    if (req.status) {
        const response = await fetch(`http://localhost:3002/usuarios/${req.userId}`, {
         method: 'PUT',
         headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(req.body)
    })
        return response.ok ?
            { message:'Usuário alterado', status:true } :
            { message:'Erro ao alterar usuário', status:false }
    } else {
        return req
    }
}
