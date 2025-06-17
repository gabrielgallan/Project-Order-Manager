import './entregadores.css';
import { useState, useEffect } from 'react';
import { deleteDeliveryMan, getDeliveryMans } from './functions';
import EntregadorCard from './entregador_card';
import EntregadorForm from './entregador_form';
import EntregadorEditForm from './entregador_edit';


export default function Entregadores() {
    const [entregadores, setEntregadores] = useState([])
    const [showMtForm, setShowMtForm] = useState(false)
    const [showEditMtForm, setShowEditMtForm] = useState(null)

    //Buscar entregadores no banco
    async function fetchEntregadores() {
        const data = await getDeliveryMans()
        setEntregadores(data)
    }

    //Atualizar entregadores a cada 5 segundos
    useEffect(() => {
        fetchEntregadores();

        const intervalEntregadores = setInterval(() => {
            fetchEntregadores()
        }, 5000)

        return () => clearInterval(intervalEntregadores)
    }, []);

    //Fechar formulário
    function handleCloseMtForm() {
        setShowMtForm(false)
        fetchEntregadores()
    }

    //Deletar motoboy
    async function handleDeleteMotoboy(id, nome) {
        const res = await deleteDeliveryMan(id, nome)
        alert(res.message)

        fetchEntregadores()
    }

    //Abrir formulário de edição
    async function handleEditMotoboy(entregador) {
        setShowEditMtForm(entregador)
        fetchEntregadores()
    }

    //Fechar formulário de edição
    function handleCloseEditMtForm() {
        setShowEditMtForm(null)
        fetchEntregadores()
    }


    return (
        <div className="entregadores_container">
            <h2 className="titulo" id='entregador'>Gerenciamento de Entregadores
                <button className="addMotoboy" onClick={() => {setShowMtForm(true); setShowEditMtForm(null)}}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ffffff"><path d="M720-400v-120H600v-80h120v-120h80v120h120v80H800v120h-80Zm-360-80q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm80-80h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0-80Zm0 400Z"/></svg>
                </button>
            </h2>
            {showMtForm ? 
                ( <EntregadorForm onClose={handleCloseMtForm}/> 

                ) : showEditMtForm ? (
                    <EntregadorEditForm entregador={showEditMtForm} onClose={handleCloseEditMtForm} />
                    
                ) : ( entregadores.length < 1 ? 
                        <p className='sem_entregadores'>Nenhum entregador encontrado</p> :
                        <div className="entregadores_list">
                            {entregadores.map(entregador => (
                                <EntregadorCard 
                                    key={entregador._id}
                                    entregador={entregador}
                                    onDelete={handleDeleteMotoboy}
                                    onEdit={handleEditMotoboy}
                                />
                            ))}
                        </div>

                    )}
        </div>
    )
}