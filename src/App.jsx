import { useState, createContext } from 'react'
import DayTasks from "./components/DayTasks"
import './App.css'
import Form from './components/Form';

export const AppContext = createContext({
    dayTasks: [],
    weekTasks: [],
    allTasks: [],
    addTask: () => {},
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

    const addTask = (newTask) => {
        // We add the new task to all tasks list
        // The we update the other lists depending on whether or not the new task fits in their timespan

        setAllTasks(() => sortTasks(() => [...allTasks, newTask]));
        setDayTasks(() => getDayTasks(allTasks));
        setWeekTasks(() => getWeekTasks(allTasks));
    }

    const toggleNavbar = () => setIsNavbarOpen(!isNavbarOpen);
    const toggleForm = () => setIsFormVisible(!isFormVisible);
    
    return (
        <AppContext.Provider value={{ dayTasks, weekTasks, allTasks, addTask, toggleForm }}>
            <UtilityBtn use={toggleNavbar} />
            <div className='main'>
                <DayTasks />
                <Form isVisible={isFormVisible} />
            </div>
        </AppContext.Provider>
    );
}

export default App
