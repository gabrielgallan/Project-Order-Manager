import './usuarios.css'
import { useState, useEffect } from 'react';
import { getUsers, deleteUser } from './functions';
import UsuarioCard from './usuario_card';
import UserForm from './usuario_form';
import EditUserForm from './edit_user_form';

function Usuarios() {
    const [users, setUsers] = useState([])
    const [showUserForm, setShowUserForm] = useState(false)
    const [showEditUserForm, setShowEditForm] = useState(null)

    //Função para fechar o formulário
    function handleCloseForm() {
        setShowUserForm(false)
        fetchUsers()
    }

    //Função que busca os usuários do banco e exibe
    async function fetchUsers() {
        const data = await getUsers()
        setUsers(data)
    }

    //Função para atualizar usuários a cada 5 segundos
    useEffect(() => {
        fetchUsers();

        const intervalUsers = setInterval(() => {
            fetchUsers()
        }, 5000)

        return () => clearInterval(intervalUsers)
    }, []);

    //Função que deleta o usuário e exibe mensagem
    async function handleDeleteUser(id) {
        const res = await deleteUser(id)
        
        fetchUsers()
        alert(res.message)
    }

    //Abrir o formulário de edição
    async function handleEditUser(usuario) {
        setShowEditForm(usuario)
        setShowUserForm(false)
    }

    //Fechar o formulário de edição
    function handleCloseEditForm() {
        setShowEditForm(null)
        fetchUsers();
    }

    return (
        <div className="usuarios_container">
            <h2 className="titulo">Gerenciamento de Usuários
                <button className="addUser" onClick={() => {setShowUserForm(true); setShowEditForm(null)}}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ffffff"><path d="M720-400v-120H600v-80h120v-120h80v120h120v80H800v120h-80Zm-360-80q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm80-80h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0-80Zm0 400Z"/></svg>
                </button>
            </h2>
            {showUserForm ? 
                ( <UserForm onClose={handleCloseForm}/> 

                ) : showEditUserForm ? (
                        <EditUserForm usuario={showEditUserForm} onClose={handleCloseEditForm}/>
                ) : (
                    <div className="list_box">
                        <header>
                            <p className="id">ID</p>
                            <p className="name">Nome</p>
                            <p className="email">Email</p>
                            <p className="status">Status</p>
                            <p className="actions">Ações</p>
                        </header>
                        <div className="user_list">
                            {users.map(user => (
                                <UsuarioCard
                                    key={user._id}
                                    usuario={user}
                                    onDelete={handleDeleteUser}
                                    onEdit={handleEditUser}
                            />))}
                        </div>

                    </div>
            )}
            
            
        </div>
    )
}

export default Usuarios