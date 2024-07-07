import { useState, createContext, useEffect } from 'react'
import DayTasks from "./components/DayTasks"
import './App.css'
import Form from './components/Form';
import Navbar from './components/Navbar';
import UserListForm from './components/UserListForm';
import { tasks } from './tasks';
import { TaskList } from './components/Task';

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
    return taskList.filter(
        (item) => new Date(item.dueDate).toLocaleDateString() === new Date().toLocaleDateString());

}

const getWeekTasks = (taskList) => {
    const nextWeekDeadline = new Date();
    nextWeekDeadline.setDate(nextWeekDeadline.getDate() + 7);
    return taskList.filter((item) => new Date(item.dueDate) < nextWeekDeadline);
}

const getOverdueTasks = (taskList) => {
    return taskList.filter((item) => new Date(item.dueDate) < new Date());
}

const getUserLists = (taskList) => {
    let lists = {}; 
    
    taskList.forEach(element => {
        if (!lists.hasOwnProperty(element.checklist)) {
            lists[element.checklist] = 
                taskList.filter(
                    item => item.checklist === element.checklist).length; 
        }
    });

    return lists;
} 

function App() {
    const [allTasks, setAllTasks] = useState(tasks);
    const [dayTasks, setDayTasks] = useState([]);
    const [weekTasks, setWeekTasks] = useState([]);
    const [overdueTasks, setOverdueTasks] = useState([]);
    const [userList, setUserList] = useState({});
    const [isNavbarOpen, setIsNavbarOpen] = useState(false);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [isListFormVisible, setIsListFormVisible] = useState(false);

    useEffect(() => {
        let temp = allTasks;

        temp.sort((a, b) => (new Date(a.dueDate) - new Date(b.dueDate)));
        setAllTasks(temp);
        setDayTasks(getDayTasks(allTasks));
        setOverdueTasks(getOverdueTasks(allTasks));
        setWeekTasks(() => getWeekTasks(allTasks));
        setUserList(getUserLists(allTasks));
    }, [allTasks])

    const toggleNavbar = () => setIsNavbarOpen(!isNavbarOpen);
    const toggleForm = () => setIsFormVisible(!isFormVisible);
    const toggleListForm = () => setIsListFormVisible(!isListFormVisible);

    const contextValue = { 
        dayTasks, 
        weekTasks, 
        allTasks, 
        overdueTasks,
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
