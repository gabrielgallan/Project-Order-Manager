import styles from './usuario_form.module.css'
import React, { useRef, useState } from 'react'
import { postUser } from './functions';

function UserForm({ onClose }) {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [passwordC, setPasswordC] = useState('')
    const reply = useRef()

    async function handleSubmit(e) {
        e.preventDefault();
        const newUser = {
            firstname,
            lastname,
            email,
            password,
            passwordC
        }

        const res = await postUser(newUser)
        if (res.status) {
            alert(res.message)
            if (onClose) onClose()
        } else {
            reply.current.innerText = res.message
        }
        
    }


    return ( 
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.header}>
            <p className={styles.title}>Registrar Usuário</p> 
            </div>
        
            <div className={styles.flex}>
                <div className={styles.inputs_box}>
                    <input 
                    type="text" 
                    className={styles.input} 
                    required
                    autoComplete='off'
                    value={firstname}
                    onChange={e => setFirstname(e.target.value)}/>
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
                    required
                    autoComplete='off'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    />
                    <label>Senha</label>
            </div>
            <div className={styles.inputs_box}>
                    <input 
                    type="password" 
                    className={styles.input} 
                    required
                    autoComplete='off'
                    value={passwordC}
                    onChange={e => setPasswordC(e.target.value)}
                    />
                    <label>Confirmar senha</label>
            </div>
            

            <button className={styles.submit}>CADASTRAR</button>
            <p className={styles.response} ref={reply}></p>
        </form>
     )
}

export default UserForm