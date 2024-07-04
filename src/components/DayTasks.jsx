import styles from "../styles/DayTasks.module.css"
import { TaskList } from "./Task";


const tasks = [
    {
        title: "Build react app",
        dueDate: "8:00:00 AM",
        notes: "Use secure coding practice",
        description: "Ensure all functionality are displayed correctly",
    },
    {
        title: "Build react app",
        dueDate: "9:00:00 AM",
        notes: "Use secure coding practice",
        description: "Ensure all functionality are displayed correctly",
    },
    {
        title: "Build react app",
        dueDate: "10:00:00 AM",
        notes: "Use secure coding practice",
        description: "Ensure all functionality are displayed correctly",
    },
    {
        title: "Build react app",
        dueDate: "11:00:00 AM",
        notes: "Use secure coding practice",
        description: "Ensure all functionality are displayed correctly",
    },
];

const getQuote = () => {
    // Should use the localStorage to query a random quote in the list
    return "Remove doubts with action";
}

function Header() {
    const currentTime = new Date().getHours();
    const partOfDay = (currentTime < 4 || currentTime > 22) 
        ? "Night" 
        : currentTime < 12 
            ? "Morning" 
            : currentTime < 17 
                ? "Afternoon" 
                : "Evening" ;

    return (
        <header>
            <h1>{`Good ${partOfDay}`}</h1>
            <h2>{`${getQuote()}`}</h2>
        </header>
    );
}

function DayStatus() {
    const [weekDay, month, day] = new Date().toString().split(" ");
    const nTasks = 4;
    const status = (!nTasks) 
        ? "no event" 
        : (nTasks === 1) 
            ? "one event" 
            : `${nTasks} events`;

    return (
        <div className={`${styles['day-status']}`}>
            <div className={styles['date-wrapper']}>
                <div className={styles["day-of-week"]}>{weekDay}</div>
                <div className={styles["day"]}>{day}</div>
                <div className={styles["month"]}>{month}</div>
            </div>
            <div className={`${styles['status']}`}>{`You have ${status} scheduled for today.`}</div>
        </div>
    );
}


function DayTasks() {
    
    return (
        <div className={styles["wrapper"]}>
            <Header />
            <DayStatus />
            <TaskList tasks={tasks} />
            <button className={styles["add-task-btn"]}>
                New Task
            </button>
        </div>
    );
}

export default DayTasks;
