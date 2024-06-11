import styles from './App.module.css'

import { useEffect, useState } from 'react'

import { Header } from './components/Header'
import { Input } from './components/Input'
import { Task } from './components/Task'

import clipboard from './assets/clipboard.svg'

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks')
    return savedTasks ? JSON.parse(savedTasks) : []
  })

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])


  function handleCreateTask(text) {
    event.preventDefault()

    setTasks([{text: text, checked: false}, ...tasks])
  }

  function deleteTask(taskToDelete) {
    const tasksWithoutDeleteOne = tasks.filter(task => {
      return task.text !== taskToDelete
    })

    setTasks(tasksWithoutDeleteOne)
  }

  function checkTask(taskToCheck) {
    let checked
    const tasksWithoutDeleteOne = tasks.filter(task => {
      if (task.text == taskToCheck){
        task.checked == false ? checked = true : checked = false
      }
      return task.text !== taskToCheck
    })
    checked ? setTasks([...tasksWithoutDeleteOne, {text: taskToCheck, checked: checked}]) : setTasks([{text: taskToCheck, checked: checked}, ...tasksWithoutDeleteOne])
  }

  const checkedTasks = tasks.filter(task => {
    return task.checked == true
  })

  useEffect(() => {
    const empty = document.getElementsByClassName(styles.empty)
    empty[0].style.display="flex"
    if (tasks.length > 0) {
      empty[0].style.display="none"
    } 
  });

  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <Input onHandleCreateTask={handleCreateTask} />

        <div className={styles.tasks}>
          <div className={styles.info}>

            <div className={styles.created}>
              <span>Tarefas Criadas</span>
              <span className={styles.counter}>{tasks.length}</span>
            </div>

            <div className={styles.done}>
              <span>Concluídos</span>
              <span className={styles.counter}>{checkedTasks.length} de {tasks.length}</span>
            </div>

          </div>

          <div className={styles.list}>
            <div className={styles.empty}>
              <img src={clipboard} />
              <span><strong>Você ainda não tem tarefas cadastradas</strong><br />
              Crie tarefas e organize seus itens a fazer</span>
            </div>
            { 
              tasks.map( task => {
                return(
                  <Task
                    key={task.text}
                    task={task.text}
                    onDeleteTask={deleteTask}
                    onCheckTask={checkTask}
                    checked={task.checked}
                  />
                )
              })
            }
          </div>
        </div>
      </div>
      
    </>
  )
}

export default App
