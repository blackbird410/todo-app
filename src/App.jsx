import { useEffect } from 'react'
import './App.css'
import Form from './components/Form';
import Navbar from './components/Navbar';
import UserListForm from './components/UserListForm';
import Tasks from './components/Tasks';
import { useDispatch, useSelector } from 'react-redux';
import { 
    setIsNavbarOpen, 
    toggleNavbar,
} from './tasks/taskActions';

function UtilityBtn() {
    const dispatch = useDispatch();

    return (
        <div 
            className='flex justify-center btn fixed left-10 top-6 z-50 hover:bg-primary p-2 rounded-full text-4xl'>
            <ion-icon 
                name="options" 
                id="utility-btn" 
                onClick={() => dispatch(toggleNavbar())}
            ></ion-icon>
        </div>
    );
}

function App() {
    const dispatch = useDispatch();
    const allTasks = useSelector(state => state.task.allTasks); 
    const isDay = useSelector(state => state.task.isDay);
    const isWeek = useSelector(state => state.task.isWeek);
    const isAll = useSelector(state => state.task.isAll);
    const isOverdue = useSelector(state => state.task.isOverdue);
    const currentList = useSelector(state => state.task.currentList);
    const isFormVisible = useSelector(state => state.task.isFormVisible);
    const isListFormVisible = useSelector(state => state.task.isListFormVisible);

    //console.log(allTasks);

    useEffect(() => {
        localStorage.setItem("allTasks", JSON.stringify(allTasks))
    }, [allTasks])
    
    return (
        <div className='h-screen text-white'>
            <UtilityBtn />
            <div className='main'>
                <Navbar />
                {isDay && <Tasks type="day"/>}
                {isWeek &&  <Tasks type="week"/>}
                {isAll &&  <Tasks type="all"/>}
                {isOverdue &&  <Tasks type="overdue"/>}
                {!!currentList && <Tasks type={currentList}/>}
                {isFormVisible && <Form />}
                {isListFormVisible && <UserListForm />}
            </div>
        </div>
    );
}

export default App
