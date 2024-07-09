import { AppContext } from "../App";
import styles from "../styles/Tasks.module.css"
import { TaskList } from "./Task";
import { useContext, useState, useEffect } from "react";




function DayTasks() {
    const { dayTasks, setIsNavbarOpen, toggleForm } = useContext(AppContext);
    
    return (
        <div className={styles["wrapper"]} onClick={() => setIsNavbarOpen(false)}>
            <Header />
            <Status type="day"/>
            <TaskList tasks={dayTasks} />
            <button 
                className={styles["add-task-btn"]}
                onClick={toggleForm}
            >
                New Task
            </button>
        </div>
    );
}

export default DayTasks;
