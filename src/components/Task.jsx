import React, { useState } from "react";
import styles from "./Task.module.css";

function Task({ task, dispatch }) {
  const [completed, setCompleted] = useState(false);

  function handleComplete() {
    dispatch({ type: "taskCompleted", payload: completed ? -1 : 1 });
    setCompleted(!completed);
  }

  async function handleDelete(taskId) {
    try {
      await fetch(`https://tasks-api-0xkn.onrender.com/api/v1/tasks/${taskId}`, {
        method: "DELETE",
      });
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className={`${styles.task} ${styles[task.priority]}`}>
      <span style={{ display: "flex", alignItems: "center" }}>
        <input
          type="checkbox"
          onChange={handleComplete}
          className={styles.checkbox}
        />
        <p className={`${styles.title} ${completed && styles.completed}`}>
          {task.title}
        </p>
        <p
          className={styles.delete}
          onClick={() => {
            handleDelete(task._id);
            dispatch({ type: "taskDeleted", payload: task._id });
          }}
        >
          &times;
        </p>
      </span>
    </div>
  );
}

export default Task;
