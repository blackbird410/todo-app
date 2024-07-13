import { useDispatch, useSelector } from "react-redux";
import { display, toggleListForm } from "../tasks/taskActions";

const getIcon = (title) => {
    const icons = {
        "My day" : "today",
        "My week": "calendar",
        "All tasks": "list",
        "Overdue Tasks": "alert-circle",
    };

    return ( icons[title] ? icons[title] : "folder");
}

function TaskOption({ title, count, onClick }) {

    return (
        <div className="task-option shadow-gray-200">
            <ion-icon name={getIcon(title)}></ion-icon>
            <div className="font-sans" onClick={onClick}>{title}</div>
            <div className="text-inherit">{count}</div>
        </div>
    );
}

export default function Navbar() {
    const dispatch = useDispatch();
    const allTasks = useSelector(state => state.task.allTasks);
    const dayTasks = useSelector(state => state.task.dayTasks);
    const weekTasks = useSelector(state => state.task.weekTasks);
    const overdueTasks = useSelector(state => state.task.overdueTasks);
    const isNavbarOpen = useSelector(state => state.task.isNavbarOpen);
    const userList = useSelector(state => state.task.userList);

    const onDisplay = (e) => dispatch(display(e.target.textContent));

    return (
        <>{isNavbarOpen && 
            <div className="navbar">
                <div className="flex flex-col gap-4">
                    <TaskOption 
                        title="My day" 
                        count={dayTasks.length} 
                        onClick={onDisplay}
                    />
                    <TaskOption 
                        title="My week" 
                        count={weekTasks.length} 
                        onClick={onDisplay}
                    />
                    <TaskOption 
                        title="All Tasks" 
                        count={allTasks.length} 
                        onClick={onDisplay}
                    />
                    <TaskOption 
                        title="Overdue Tasks"
                        count={overdueTasks.length}
                        onClick={onDisplay}
                    />
                </div>
                <div className="flex flex-col gap-4 overflow-y-scroll max-h-200">
                    <header className="flex gap-2 justify-between text-2xl p-4 border-b-2 border-primary items-center">
                        <div>My lists</div>
                        <ion-icon name="add-circle" onClick={() => dispatch(toggleListForm())}></ion-icon>
                    </header>
                    {Object.keys(userList)
                        .map((checklist) => 
                            <TaskOption 
                                key={checklist} 
                                title={checklist} 
                                count={userList[checklist]} 
                                onClick={onDisplay}
                            />)}
                </div>
            </div>
        }
        </>
    );
}
