
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

getUsers().then(console.table)