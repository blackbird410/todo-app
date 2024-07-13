import styles from "../styles/Task.module.css";
import { removeTask } from "../tasks/taskActions";
import { useDispatch } from "react-redux";

function Task({ title, dueDate, notes, description, priority }) {
    const dispatch = useDispatch();
    const onRemove = (e) => dispatch(removeTask({
            title: e.target.parentNode.childNodes[1].textContent, 
            dueDate: e.target.parentNode.childNodes[2].textContent, 
            notes: e.target.parentNode.childNodes[3].textContent,
            description: e.target.parentNode.childNodes[4].textContent,
    }));

    return (
        <div className="card border-2 border-primary rounded-2xl p-2 grid grid-rows-4 grid-cols-8 gap-1 items-center text-left">
            <input 
                type="checkbox" 
                className="row-span-4 col-span-1 w-6" 
                onClick={onRemove}
            />
            <h2 className="col-span-7 flex justify-between items-center gap-2 text-xl font-bold">
                <span className="text-primary">{title}</span>
                <div className={styles[`priority-${priority}`]}>
                    <ion-icon name="flag"></ion-icon>
                </div>
            </h2>
            <div className="col-span-7 before:content-['Date:'] before:mr-4 before:text-primary before:font-semibold">{dueDate}</div>
            <p className="col-span-7">{notes}</p>
            <p className="col-span-7">{description}</p>
        </div>
    );
}

export function TaskList({ tasks }) {
    return (
        <div className="flex flex-col gap-4 overflow-y-scroll max-h-100 p-4">
            {tasks.map(task => 
                <Task 
                    key={`${task.title} ${task.dueDate}`}
                    title={task.title} 
                    dueDate={task.dueDate} 
                    notes={task.notes}
                    description={task.description}
                    priority={task.priority}
                />)
            }
        </div>
    );
}

export default Task;
