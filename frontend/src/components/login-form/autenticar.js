import { z } from 'zod'


//Valida o formato do formulário e autentica o usuário
export async function autenticateUser(email, password) {

            const credentials_schema = z.object({
                email: z.string().email(),
                password: z.string().min(8)
            })

            const form = { email, password }
            const result = credentials_schema.safeParse(form)

            if (result.success) {
                const response = await fetch(`http://localhost:3002/usuarios`)
    
                if(response.ok) {
                    const data = await response.json()

                    const user = data.usuarios.find(user => user.email===form.email)

                    if (user) {
                        if (!user.status) {
                            if ( user.password === form.password ) {
                                await setUserStatus(user.id, true)
                                return { status: true, message: 'Autenticado', user}
                            } else {
                                return { status: false, message: 'Senha inválida' }
                            }
                        } else {
                            return { status: false, message: 'Este usuário já está logado' }
                        }
                         

                    } else {
                        return { status: false, message: 'Usuário não encontrado' }
                    }


                } else {
                    return { status: false, message: 'Falha ao conectar ao servidor' }
                }

            } else {
                return { status: false, message:'Formato do email ou senha inválidos' }
            }
    }


//Defini o status do user
export async function setUserStatus(id, status) {
    await fetch(`http://localhost:3002/usuarios/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
    });
}