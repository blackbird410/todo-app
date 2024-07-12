import { useContext } from "react";
import { AppContext } from "../App";

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
        <div className="task-option shadow-gray-200" onClick={onClick}>
            <ion-icon name={getIcon(title)}></ion-icon>
            <div className="font-sans">{title}</div>
            <div className="text-inherit">{count}</div>
        </div>
    );
}

export default function Navbar() {
    const { 
        dayTasks, 
        weekTasks, 
        overdueTasks,
        isNavbarOpen, 
        allTasks, 
        userList, 
        toggleListForm,
        display,
    } = useContext(AppContext);

    return (
        <>{isNavbarOpen && 
            <div className="navbar">
                <div className="flex flex-col gap-4">
                    <TaskOption 
                        title="My day" 
                        count={dayTasks.length} 
                        onClick={display}
                    />
                    <TaskOption 
                        title="My week" 
                        count={weekTasks.length} 
                        onClick={display}
                    />
                    <TaskOption 
                        title="All Tasks" 
                        count={allTasks.length} 
                        onClick={display}
                    />
                    <TaskOption 
                        title="Overdue Tasks"
                        count={overdueTasks.length}
                        onClick={display}
                    />
                </div>
                <div className="flex flex-col gap-4 overflow-y-scroll max-h-200">
                    <header className="flex gap-2 justify-between text-2xl p-4 border-b-2 border-primary items-center">
                        <div>My lists</div>
                        <ion-icon name="add-circle" onClick={toggleListForm}></ion-icon>
                    </header>
                    {Object.keys(userList)
                        .map((checklist) => 
                            <TaskOption 
                                key={checklist} 
                                title={checklist} 
                                count={userList[checklist]} 
                                onClick={display}
                            />)}
                </div>
            </div>
        }
        </>
    );
}
