import { Header, Status } from "./DayTasks";
import { TaskList } from "./Task";
import styles from "../styles/DayTasks.module.css"
import { useContext } from "react";
import { AppContext } from "../App";

export default function WeekTasks() {
    const { weekTasks, toggleForm } = useContext(AppContext);
    
    return (
        <div className={styles["wrapper"]}>
            <Header />
            <Status type={"week"} />
            <TaskList tasks={weekTasks} />
            <button 
                className={styles["add-task-btn"]}
                onClick={toggleForm}
            >
                New Task
            </button>
        </div>
    );
}
