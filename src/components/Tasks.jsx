import { TaskList } from "./Task";
import styles from "../styles/Tasks.module.css"
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";

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

export default function Tasks({ type }) {
    const { 
        dayTasks, 
        weekTasks, 
        allTasks, 
        overdueTasks, 
        toggleForm 
    } = useContext(AppContext);

    const getTasks = () => {
        const match = {
            "day": dayTasks,
            "week": weekTasks,
            "all": allTasks,
            "overdue": overdueTasks,
        };

        return (match[type] ? match[type] : []); 
    }
    
    return (
        <div className={styles["wrapper"]}>
            <Header />
            <Status type={type} />
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
