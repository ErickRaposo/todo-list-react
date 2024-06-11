import styles from './Input.module.css'

import addIcon from '../assets/addIcon.svg'

import { useState } from 'react';

export function Input(props) {
    const [newTaskText, setNewTaskText] = useState('')

    const isNewTaskEmpty = newTaskText.length === 0

    function handleCreateTask() {
        props.onHandleCreateTask(newTaskText)
        setNewTaskText('')
    }

    function handleNewTaskChange() {
        event.target.setCustomValidity('')
        setNewTaskText(event.target.value)
    }

    return(
        <>
            <form onSubmit={handleCreateTask} className={styles.input}>
                <input 
                    type="text"
                    placeholder='Adicione uma nova tarefa'
                    value={newTaskText}
                    onChange={handleNewTaskChange}
                />
                <button type='submit' disabled={isNewTaskEmpty}>Criar <img src={addIcon} /></button>
            </form>
        </>
    )
}