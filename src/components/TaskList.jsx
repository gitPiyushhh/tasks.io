import React, { useEffect, useReducer } from "react";
import styles from "./TaskList.module.css";
import Task from "./Task";

const initialState = {
  status: "sleep",
  query: "",
  progress: 0,
  tasks: [],
};

const reducer = function (state, action) {
  switch (action.type) {
    case "fetching":
      return { ...state, status: "loading" };
    case "dataLoaded":
      return { ...state, status: "loaded", tasks: action.payload };
    case "addingTask":
      return { ...state, status: "addingTask", query: action.payload };
    case "taskAdded":
        const newTask = {id: state.tasks.length + 1, title: action.payload, priority: 'low'};
        if (!state.query.length) return 
        return {...state, status: "taskAdded", tasks: [...state.tasks, newTask], query: ''}
    case "taskCompleted":
        return {...state, status: 'taskCompleted', progress: state.progress + action.payload}
    case "taskDeleted":
        return {...state, status: 'taskDeleted', tasks: state.tasks.filter(task => task.id !== action.payload)}
    default:
      return "Action not defined";
  }
};

function TaskList() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(function () {
    fetch("http://localhost:8000/tasks")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataLoaded", payload: data }));
  }, []);

  return (
    <div style={{display: "flex", flexDirection: 'column', alignItems: 'center'}}>
      <div className={styles.taskList}>
        {state.tasks.map((task) => (
          <Task task={task} key={task.id} dispatch={dispatch}/>
        ))}
      </div>

      <p className={styles.progress}>{state.tasks.length > 0 ? state.tasks.length !== state.progress ? `Done- ${state.progress} / ${state.tasks.length}` : `All tasks completed, add new 🥳` : 'No tasks to show, add new 💼'}</p>

      <span className={styles.query__box}>
        <input
          type="text"
          value={state.query}
          className={styles.query}
          onChange={(e) =>
            dispatch({ type: "addingTask", payload: e.target.value })
          }
        />

        <button className={styles.button} onClick={() => dispatch({type: 'taskAdded', payload: state.query})}>Add task</button>
      </span>
    </div>
  );
}

export default TaskList;
