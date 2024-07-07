import { useContext } from "react";
import styles from "../styles/Task.module.css";
import { AppContext } from "../App";

function Task({ title, dueDate, notes, description }) {
    const { removeTask } = useContext(AppContext);

    return (
        <div className={styles["task-wrapper"]}>
            <input 
                type="checkbox" 
                className={styles["task-checkbox"]} 
                onClick={removeTask}
            />
            <h2 className={styles["title"]}>{title}</h2>
            <div className={styles["due-date"]}>{dueDate}</div>
            <p className={styles["notes"]}>{notes}</p>
            <p className={styles["description"]}>{description}</p>
        </div>
    );
}

export function TaskList({ tasks }) {
    return (
        <div className={styles["task-list"]}>
            {tasks.map(task => 
                <Task 
                    key={`${task.title} ${task.dueDate}`}
                    title={task.title} 
                    dueDate={task.dueDate} 
                    notes={task.notes}
                    description={task.description}
                />)
            }
        </div>
    );
}

export default Task;
