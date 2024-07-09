import { useState, createContext, useEffect } from 'react'
import './App.css'
import Form from './components/Form';
import Navbar from './components/Navbar';
import UserListForm from './components/UserListForm';
import Tasks from './components/Tasks';

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

const getLocalStorageData = () => {
    const tasks = JSON.parse(localStorage.getItem("allTasks"));
    return (tasks) ? tasks : [];
}

export const DAYS = [ "Monday", "Tuesday", "Wednesday", 
    "Thursday", "Friday", "Saturday", "Sunday"];

export const getCurrentWeek = () => {
    let currentWeek = [];
    let i = new Date().getDay() - 1;
    while(currentWeek.length < 7) {
        currentWeek.push(DAYS[i % 7]);
        i += 1;
    }

    return currentWeek;
}

function App() {
    const [allTasks, setAllTasks] = useState(getLocalStorageData());
    const [dayTasks, setDayTasks] = useState([]);
    const [weekTasks, setWeekTasks] = useState([]);
    const [overdueTasks, setOverdueTasks] = useState([]);
    const [userList, setUserList] = useState({});
    const [isNavbarOpen, setIsNavbarOpen] = useState(false);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [isListFormVisible, setIsListFormVisible] = useState(false);
    const [isDay, setIsDay] = useState(true);
    const [isWeek, setIsWeek] = useState(false);
    const [isAll, setIsAll] = useState(false);
    const [isOverdue, setIsOverdue] = useState(false);
    const [currentList, setCurrentList] = useState("");
    const [selectedDay, setSelectedDay] = useState(DAYS[0]);

    useEffect(() => {
        let temp = allTasks;

        temp.sort((a, b) => (new Date(a.dueDate) - new Date(b.dueDate)));
        setAllTasks(temp);
        setDayTasks(getDayTasks(allTasks));
        setOverdueTasks(getOverdueTasks(allTasks));
        setWeekTasks(() => getWeekTasks(allTasks));
        setUserList(getUserLists(allTasks));

        localStorage.setItem("allTasks", JSON.stringify(allTasks));
    }, [allTasks])

    const toggleNavbar = () => setIsNavbarOpen(!isNavbarOpen);
    const toggleForm = () => setIsFormVisible(!isFormVisible);
    const toggleListForm = () => setIsListFormVisible(!isListFormVisible);
    const removeTask = (e) => {
        const target = e.target.parentNode;

        const title = target.childNodes[1].textContent;
        const dueDate = new Date(target.childNodes[2].textContent);
        const notes = target.childNodes[3].textContent;
        const description = target.childNodes[4].textContent;

        setAllTasks(allTasks
            .filter(item => 
                (item.title !== title 
                    && new Date(item.dueDate) !== dueDate 
                    && item.notes !== notes 
                    && item.description !== description)
            )
        );
    }

    const display = (e) => {
        let section = e.target;
        if (section.childNodes[1]) section = e.target.parentNode.childNodes[1].textContent; 
        else section = e.target.textContent;

        if (section === "My week") {
            setIsAll(false);
            setIsOverdue(false);
            setIsDay(false);
            setIsWeek(true);
            setCurrentList("");
        } else if (section === "All Tasks") {
            setIsWeek(false);
            setIsOverdue(false);
            setIsDay(false);
            setIsAll(true);
            setCurrentList("");
        } else if (section === "Overdue Tasks") {
            setIsWeek(false);
            setIsDay(false);
            setIsAll(false);
            setIsOverdue(true);
            setCurrentList("");
        } else if (section === "My day") {
            setIsWeek(false);
            setIsAll(false);
            setIsOverdue(false);
            setIsDay(true);
            setCurrentList("");
        } else {
            // Display the tasks corresponding to a specific user lists
            setIsWeek(false);
            setIsAll(false);
            setIsOverdue(false);
            setIsDay(false);
            setCurrentList(section);
        }
    }

    const handleSelectDay = (e) => {
        const day = e.target.value;
        if (day !== selectedDay) {
            setSelectedDay(day);
        }
    }

    const currentWeek = getCurrentWeek();

    const contextValue = { 
        dayTasks, 
        weekTasks, 
        allTasks, 
        overdueTasks,
        userList,
        isNavbarOpen,
        isFormVisible,
        isWeek,
        isListFormVisible,
        setAllTasks, 
        setUserList,
        setIsNavbarOpen,
        toggleForm, 
        toggleListForm,
        removeTask,
        display,
        selectedDay,
        handleSelectDay,
        currentWeek,
        currentList,
    };
    
    return (
        <AppContext.Provider value={contextValue}>
            <UtilityBtn use={toggleNavbar} />
            <div className='main' onClick={() => setIsNavbarOpen(false)}>
                <Navbar />
                {isDay && <Tasks type="day"/>}
                {isWeek &&  <Tasks type="week"/>}
                {isAll &&  <Tasks type="all"/>}
                {isOverdue &&  <Tasks type="overdue"/>}
                {!!currentList && <Tasks type={currentList}/>}
                <Form />
                <UserListForm />
            </div>
        </AppContext.Provider>
    );
}

export default App
