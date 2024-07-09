import { TaskList } from "./Task";
import styles from "../styles/Tasks.module.css"
import { useContext, useEffect, useState } from "react";
import { AppContext, DAYS } from "../App";
import { getCurrentWeek } from "../App";

const fetchQuote = () => {
    const [quote, setQuote] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://api.quotable.io/quotes/random?maxLength=40')
            .then(res=> {
                if (res.status >= 400) throw new Error("server error");
                return res.json()
            })
            .then(json => setQuote(json))
        .catch((error) => setError(error))
        .finally(() => setLoading(false));
    }, []);

    return { quote, error, loading };
};

export function Header() {
    const currentTime = new Date().getHours();
    const partOfDay = (currentTime < 4 || currentTime > 22) 
        ? "Night" 
        : currentTime < 12 
            ? "Morning" 
            : currentTime < 17 
                ? "Afternoon" 
                : "Evening" ;
    const { quote, error, loading } = fetchQuote();

    return (
        <header>
            <h1>{`Good ${partOfDay}`}</h1>
            <h2>{`${ (loading || error) ? "Remove doubts with action." : quote[0].content }`}</h2>
        </header>
    );
}

export function Status({ type }) {
    const [weekDay, month, day] = new Date().toString().split(" ");
    const { dayTasks, weekTasks, allTasks, overdueTasks } = useContext(AppContext);
    const nTasks = (
        type === "day" 
            ? dayTasks.length 
            : type === "week"
                ? weekTasks.length 
                : type === "all" 
                    ? allTasks.length 
                    : overdueTasks.length
    );

    const status = (!nTasks) 
        ? "no event" 
        : (nTasks === 1) 
            ? "one event" 
            : `${nTasks} events`;

    const eventType = {
        "day": "scheduled for today",
        "week": "scheduled for the week",
        "all": "in total",
        "overdue": "that is overdue",
    };

    return (
        <div className={`${styles['day-status']}`}>
            <div className={styles['date-wrapper']}>
                <div className={styles["day-of-week"]}>{weekDay}</div>
                <div className={styles["day"]}>{day}</div>
                <div className={styles["month"]}>{month}</div>
            </div>
            <div className={`${styles['status']}`}>
                {`You have ${status} ${eventType[type]}.`}
            </div>
        </div>
    );
}

export function DaySelector() {
    const { handleSelectDay, currentWeek } = useContext(AppContext);

    return (
        <div className={styles["day-select-wrapper"]}>
            <label htmlFor={styles["day-select"]}>Day of the week:</label>
            <select id={styles["day-select"]}>
                {currentWeek.map((day) => 
                    <option 
                        key={day}
                        value={day}
                        className={styles["day-select-btn"]}
                        onClick={handleSelectDay}
                    >{day}</option>)}
            </select>
        </div>
    );
}

export default function Tasks({ type }) {
    const { 
        dayTasks, 
        weekTasks, 
        allTasks, 
        overdueTasks, 
        toggleForm,
        isWeek,
        currentWeek,
        selectedDay,
    } = useContext(AppContext);

    const getTasks = () => {
        const match = {
            "day": dayTasks,
            "all": allTasks,
            "overdue": overdueTasks,
        };

        if (type === "week") {
            // Get the tasks for the selected day
            const targetDate = new Date();
            targetDate.setDate(targetDate.getDate() + currentWeek.findIndex((day) => day === selectedDay));

            return allTasks.filter((task) => new Date(task.dueDate).toLocaleDateString() === targetDate.toLocaleDateString()) 
        }

        return (match[type] ? match[type] : []); 
    }
    
    return (
        <div className={styles["wrapper"]}>
            <Header />
            <Status type={type} />
            {isWeek && <DaySelector /> }
            <TaskList tasks={getTasks()} />
            <button 
                className={styles["add-task-btn"]}
                onClick={toggleForm}
            >
                New Task
            </button>
        </div>
    );
}
