import styles from './entregador_form.module.css'
import { useState, useEffect, useRef } from "react"
import { putDeliveryMan } from './functions'


function EntregadorEditForm({ entregador, onClose }) {
    const [firstnameMt, setFirstnameMt] = useState('')
    const [lastnameMt, setLastnameMt] = useState('')
    const [cpfMt, setCpfMt] = useState('')
    const [telefoneMt, setTelefoneMt] = useState('')
    const [cnhMt, setCnhMt] = useState('')
    const [placMt, setPlacaMt] = useState('')
    const reply = useRef()

        const first = (name) => {
            return name.trim().split(' ')[0]
        }
        const last = (name) => {
            return name.trim().split(' ')[1]
        }


    useEffect(() => {
            if (entregador) {
                setFirstnameMt(first(entregador.nome) || '');
                setLastnameMt(last(entregador.nome) || '');
                setCpfMt(entregador.cpf || '');
                setTelefoneMt(entregador.telefone || '');
                setCnhMt(entregador.cnh || '');
                setPlacaMt(entregador.placa || '');
                
            }
        }, [entregador]);

    async function handleSubmit(e) {
        e.preventDefault();
        const form = { 
            data: {
                firstname: firstnameMt,
                lastname: lastnameMt,
                cpf: cpfMt,
                telefone: telefoneMt,
                cnh: cnhMt,
                placa: placMt
            },
            user: entregador._id
        }

        const res = await putDeliveryMan(form)
        alert(res.message)
        if (onClose) onClose()
    }


    return (
        <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.header}>
                    <p className={styles.title}>Alterar Dados Do Entregador</p>
                     <svg xmlns="http://www.w3.org/2000/svg" height="35px" viewBox="0 -960 960 960" width="35px" fill="#000000"><path d="M180-120q-24 0-42-18t-18-42v-600q0-24 18-42t42-18h207q-2-37 26-66.5t67-29.5q39 0 67 29.5t26 66.5h207q24 0 42 18t18 42v600q0 24-18 42t-42 18H180Zm300-702q13 0 21.5-8.5T510-852q0-13-8.5-21.5T480-882q-13 0-21.5 8.5T450-852q0 13 8.5 21.5T480-822ZM180-217q60-56 135.9-90.5 75.89-34.5 164-34.5 88.1 0 164.1 34.5T780-217v-563H180v563Zm302-204q58 0 98-40t40-98q0-58-40-98t-98-40q-58 0-98 40t-40 98q0 58 40 98t98 40ZM235-180h490v-9q-54-46-116-69.5T480-282q-67 0-129 23.5T235-189v9Zm247-301q-32.5 0-55.25-22.75T404-559q0-32.5 22.75-55.25T482-637q32.5 0 55.25 22.75T560-559q0 32.5-22.75 55.25T482-481Zm-2-18Z"/></svg>
                    </div>
        
                        <div className={styles.infos}>
                            <div className={styles.flex}>
                                <div className={styles.inputs_box}>
                                    <input 
                                    type="text" 
                                    className={styles.input} 
                                    required
                                    autoComplete='off'
                                    value={firstnameMt}
                                    onChange={e => setFirstnameMt(e.target.value)}
                                    />
                                    <label>Primeiro Nome</label>
                                    
                                </div>
        
                                <div className={styles.inputs_box}>
                                    <input 
                                    type="text" 
                                    className={styles.input} 
                                    required
                                    autoComplete='off'
                                    value={lastnameMt}
                                    onChange={e => setLastnameMt(e.target.value)}
                                    />
                                    <label>Sobrenome</label>
                                    
                                </div>
                            </div>
        
                            <div className={styles.flex}>
                                <div className={styles.inputs_box}>
                                    <input 
                                    type="text" 
                                    className={styles.input} 
                                    required
                                    autoComplete='off'
                                    value={cpfMt}
                                    onChange={e => setCpfMt(e.target.value)}
                                    />
                                    <label>CPF</label>
                                    
                                </div>
        
                                <div className={styles.inputs_box}>
                                        <input 
                                        type="text" 
                                        className={styles.input} 
                                        required
                                        autoComplete='off'
                                        value={telefoneMt}
                                        onChange={e => setTelefoneMt(e.target.value)}
                                        />
                                        <label>Telefone</label>
                                        
                                </div>
                            </div>
        
                            <div className={styles.flex}>
                                <div className={styles.inputs_box}>
                                    <input 
                                    type="text" 
                                    className={styles.input} 
                                    required
                                    autoComplete='off'
                                    value={cnhMt}
                                    onChange={e => setCnhMt(e.target.value)}
                                    />
                                    <label>CNH</label>
                                    
                                </div>
        
                                <div className={styles.inputs_box}>
                                        <input 
                                        type="text" 
                                        className={styles.input} 
                                        required
                                        autoComplete='off'
                                        value={placMt}
                                        onChange={e => setPlacaMt(e.target.value)}
                                        />
                                        <label>Placa da Moto</label>
                                        
                                </div>
                            </div>
                        </div>
                    <div className={styles.buttons}>
                        <button type="button" className={styles.cancel} onClick={onClose}>Cancelar</button>
                        <button type="submit" className={styles.submit}>Salvar</button>
                    </div>
                    
                    <p className={styles.response} ref={reply}></p>
                </form>
    )
}

export default EntregadorEditForm