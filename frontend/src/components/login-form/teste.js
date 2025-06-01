import {z} from 'zod'

async function autenticateUser(email, password) {

            const credentials_schema = z.object({
                email: z.string().email(),
                password: z.string().min(8)
            })

            const form = { email, password }
            const result = credentials_schema.safeParse(form)

            if (result.success) {
                const response = await fetch('http://localhost:3002/usuarios')
    
                if(response.ok) {
                    const data = await response.json()

                    const searchEmail = data.usuarios.find(user => user.email===form.email)

                    if (searchEmail) {
                        if ( searchEmail.password === form.password ) {
                            return { status: true, message: 'Autenticado' }
                        } else {
                            return { status: false, message: 'Senha inválida' }
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

    const email = 'gabriel31@gmail.com'
    const pass = 'gg929302'

    const res = await autenticateUser(email, pass)

    console.log(res.message)