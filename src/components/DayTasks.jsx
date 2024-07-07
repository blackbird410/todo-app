import { AppContext } from "../App";
import styles from "../styles/DayTasks.module.css"
import { TaskList } from "./Task";
import { useContext, useState, useEffect } from "react";


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

function Header() {
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

function DayStatus() {
    const [weekDay, month, day] = new Date().toString().split(" ");
    const { dayTasks } = useContext(AppContext);
    const nTasks = dayTasks.length;

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
    const { dayTasks, toggleForm } = useContext(AppContext);
    
    return (
        <div className={styles["wrapper"]}>
            <Header />
            <DayStatus />
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
