import { useState, createContext, useEffect } from 'react'
import DayTasks from "./components/DayTasks"
import './App.css'
import Form from './components/Form';

export const AppContext = createContext({
    dayTasks: [],
    weekTasks: [],
    allTasks: [],
    toggleForm: () => {},
});

function UtilityBtn({ use }) {
    return (
        <ion-icon 
            name="options" 
            id="utility-btn" 
            onClick={use}
        ></ion-icon>
    );
}


const getDayTasks = (taskList) => {
    return taskList;
}

const getWeekTasks = (taskList) => {
    return taskList;
}

const sortTasks = (taskList) => {
    return taskList;
}

function App() {
    const [allTasks, setAllTasks] = useState([]);
    const [dayTasks, setDayTasks] = useState(getDayTasks(allTasks));
    const [weekTasks, setWeekTasks] = useState(getWeekTasks(allTasks));
    const [isNavbarOpen, setIsNavbarOpen] = useState(false);
    const [isFormVisible, setIsFormVisible] = useState(false);


    useEffect(() => {
        setDayTasks(getDayTasks(allTasks));
        setWeekTasks(() => getWeekTasks(allTasks));

    }, [allTasks])

    const addTask = (newTask) => {

        let temp = [...allTasks, newTask];
        setAllTasks(() => temp);

        console.log("Temp: ", temp);
        console.log("All tasks: ", allTasks);
    }

    const toggleNavbar = () => setIsNavbarOpen(!isNavbarOpen);
    const toggleForm = () => setIsFormVisible(!isFormVisible);

    const contextValue = { dayTasks, weekTasks, allTasks, setAllTasks, toggleForm };
    
    return (
        <AppContext.Provider value={contextValue}>
            <UtilityBtn use={toggleNavbar} />
            <div className='main'>
                <DayTasks />
                <Form isVisible={isFormVisible} />
            </div>
        </AppContext.Provider>
    );
}

export default App
