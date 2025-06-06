
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