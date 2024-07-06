import { useState, createContext, useEffect } from 'react'
import DayTasks from "./components/DayTasks"
import './App.css'
import Form from './components/Form';
import Navbar from './components/Navbar';
import UserListForm from './components/UserListForm';

export const AppContext = createContext(null);

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

function App() {
    const [allTasks, setAllTasks] = useState([]);
    const [dayTasks, setDayTasks] = useState([]);
    const [weekTasks, setWeekTasks] = useState([]);
    const [userList, setUserList] = useState([]);
    const [isNavbarOpen, setIsNavbarOpen] = useState(false);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [isListFormVisible, setIsListFormVisible] = useState(false);

    useEffect(() => {
        let temp = allTasks;

        temp.sort((a, b) => (new Date(a.dueDate) - new Date(b.dueDate)));
        setAllTasks(temp);
        setDayTasks(getDayTasks(allTasks));
        setWeekTasks(() => getWeekTasks(allTasks));
    }, [allTasks])

    const toggleNavbar = () => setIsNavbarOpen(!isNavbarOpen);
    const toggleForm = () => setIsFormVisible(!isFormVisible);
    const toggleListForm = () => setIsListFormVisible(!isListFormVisible);

    const contextValue = { 
        dayTasks, 
        weekTasks, 
        allTasks, 
        userList,
        isNavbarOpen,
        isFormVisible,
        isListFormVisible,
        setAllTasks, 
        setUserList,
        toggleForm, 
        toggleListForm,
    };
    
    return (
        <AppContext.Provider value={contextValue}>
            <UtilityBtn use={toggleNavbar} />
            <div className='main'>
                <Navbar />
                <DayTasks />
                <Form />
                <UserListForm />
            </div>
        </AppContext.Provider>
    );
}

export default App
