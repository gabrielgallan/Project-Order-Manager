import React, { useState, useEffect, useRef } from "react"
import styles from './usuario_form.module.css'
import { autenticateEditForm, putUser } from "./functions"

function EditUserForm ({ usuario, onClose }) {
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const reply = useRef()

        const first = (name) => {
            return name.trim().split(' ')[0]
        }
        const last = (name) => {
            return name.trim().split(' ')[1]
        }
    

    useEffect(() => {
        if (usuario) {
            setFirstname(first(usuario.name) || '');
            setLastname(last(usuario.name) || '');
            setEmail(usuario.email || '');
            setNewPassword(usuario.password || '');
            
        }
    }, [usuario]);

    async function handleSubmit(e) {
            e.preventDefault();
            const userEdited = {
                firstname,
                lastname,
                email,
                newPassword,
                usuario
            }
            
            const res = await putUser(userEdited)
            if (res.status) {
                alert(res.message)
                if (onClose) onClose()
            } else {
                reply.current.innerText = res.message
            }
        }
    
    return (
        <div className="edit_user_box">
            <form className={styles.form} onSubmit={handleSubmit}>
                        <div className={styles.header}>
                        <p className={styles.title}>Editar Usuário</p> 
                        </div>
                    
                        <div className={styles.flex}>
                            <div className={styles.inputs_box}>
                                <input 
                                type="text" 
                                className={styles.input} 
                                required
                                autoComplete='off'
                                value={firstname}
                                onChange={e => setFirstname(e.target.value)}
                                />
                                <label>Primeiro Nome</label>
                                
                            </div>
                            
                            <div className={styles.inputs_box}>
                                <input 
                                type="text" 
                                className={styles.input} 
                                required
                                autoComplete='off'
                                value={lastname}
                                onChange={e => setLastname(e.target.value)}
                                />
                                <label>Sobrenome</label>
                            </div>
                        </div>

                        <div className={styles.inputs_box}>
                            <input 
                                type="email" 
                                className={styles.input} 
                                required
                                autoComplete='off'
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                            <label>E-mail</label>
                        </div>

                        <div className={styles.inputs_box}>
                            <input 
                                type="password" 
                                className={styles.input} 
                                autoComplete='off'
                                required
                                value={newPassword}
                                onChange={e => setNewPassword(e.target.value)}
                            />
                            <label>Nova Senha</label>
                        </div>

                        
            
                        <button className={styles.submit}>Salvar Alterações</button>
                        <p className={styles.response} ref={reply}></p>
                    </form>
        </div>
    )
}

export default EditUserForm