import { TaskList } from "./Task";
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
        <header className="mt-2 flex flex-col border-b-2 p-4 gap-3 text-justify">
            <h1 className="text-5xl font-semibold after:content-['.'] after:text-primary">{`Good ${partOfDay}`}</h1>
            <h2 className="text-xl">{`${ (loading || error) ? "Remove doubts with action." : quote[0].content }`}</h2>
        </header>
    );
}

export function Status({ type }) {
    const [weekDay, month, day] = new Date().toString().split(" ");
    const { dayTasks, weekTasks, allTasks, overdueTasks, userList } = useContext(AppContext);

    const eventCount = {
        "day": dayTasks.length,
        "week": weekTasks.length,
        "all": allTasks.length,
        "overdue": overdueTasks.length,
    };

    const nTasks = (
        Object.keys(eventCount).includes(type) 
            ? eventCount[type] 
            : userList[type]
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
        "overdue": `that ${nTasks > 1 ? "are" : "is"} overdue`,
    };

    return (
        <div className="grid grid-cols-4 p-4 justify-between items-center">
            <div className="flex flex-col gap-1">
                <div className="text-xl">{weekDay}</div>
                <div className="text-primary text-5xl">{day}</div>
                <div className="text-xl">{month}</div>
            </div>
            <div className="col-span-3 text-lg">
                {`You have ${status} ${eventType[type] ? eventType[type] : `in the ${type} list`}.`}
            </div>
        </div>
    );
}

export function DaySelector() {
    const { handleSelectDay, currentWeek } = useContext(AppContext);
    let modifiedWeek = ["", ...currentWeek];

    return (
        <div className="flex gap-4 justify-center text-lg">
            <label htmlFor="day-select" className="text-primary font-thin">Day of the week:</label>
            <select id="day-select" className="p-2 rounded-md text-black">
                {modifiedWeek.map((day) => 
                    day 
                        ? <option 
                        key={day}
                        value={day}
                        onClick={handleSelectDay}>{day}</option> 
                        : <option 
                            key="default" 
                            value={day}
                            selected={true}
                            disabled={true}
                            hidden={true}
                        >Choose here</option>
                )}
            </select>
        </div>
    );
}

export default function Tasks({ type }) {
    const { 
        dayTasks, 
        allTasks, 
        overdueTasks, 
        toggleForm,
        isWeek,
        currentWeek,
        selectedDay,
        currentList
    } = useContext(AppContext);

    const getTasks = () => {
        const match = {
            "day": dayTasks,
            "all": allTasks,
            "overdue": overdueTasks,
        };

        if (Object.keys(match).includes(type)) return (match[type] ? match[type] : []); 

        if (type === "week") {
            // Get the tasks for the selected day
            const targetDate = new Date();
            targetDate
                .setDate(targetDate.getDate() + currentWeek.findIndex(
                    (day) => day === selectedDay));

            return allTasks.filter(
                (task) => new Date(task.dueDate)
                    .toLocaleDateString() === targetDate.toLocaleDateString()) 
        }

        return allTasks.filter((task) => task.checklist === currentList);
    }
    
    return (
        <div className="flex flex-col gap-4 p-4 mt-8">
            <Header />
            <Status type={type} />
            {isWeek && <DaySelector /> }
            <TaskList tasks={getTasks()} />
            <button 
                className="btn bg-primary rounded p-2 font-bold text-xl hover:bg-gray-400 hover:text-white" 
                onClick={toggleForm}
            >
                New Task
            </button>
        </div>
    );
}
