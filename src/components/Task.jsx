import React, { useState } from 'react'
import styles from './Task.module.css'

function Task({task, dispatch}) {
    const [completed, setCompleted] = useState(false);

    function handleComplete() {
        dispatch({type: 'taskCompleted', payload: completed ? -1 : 1})
        setCompleted(!completed)
    }

  return (
    <div className={`${styles.task} ${styles[task.priority]}`}>
        <span style={{display: 'flex', alignItems: 'center'}}>
        <input type="checkbox" onChange={handleComplete} className={styles.checkbox}/>
        <p className={`${styles.title} ${completed && styles.completed}`}>{task.title}</p>
        <p className={styles.delete} onClick={() => dispatch({type: 'taskDeleted', payload: task.id})}>&times;</p>
        </span>
        
    </div>
  )
}

export default Task