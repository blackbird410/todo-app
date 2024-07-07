import { useContext } from "react";
import styles from "../styles/Navbar.module.css"
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

function TaskOption({ title, count }) {

    return (
        <div className={styles["option-wrapper"]}>
            <ion-icon name={getIcon(title)}></ion-icon>
            <div>{title}</div>
            <div className={styles.count}>{count}</div>
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
        toggleListForm } = useContext(AppContext);

    return (
        <>{isNavbarOpen && 
            <div className={styles.navbar}>
                <div className={styles.top}>
                    <TaskOption 
                        title="My day" 
                        count={dayTasks.length} 
                    />
                    <TaskOption 
                        title="My week" 
                        count={weekTasks.length} 
                    />
                    <TaskOption 
                        title="All Tasks" 
                        count={allTasks.length} 
                    />
                    <TaskOption 
                        title="Overdue Tasks"
                        count={overdueTasks.length}
                    />
                </div>
                <div className={styles.bottom}>
                    <header>
                        <div>My lists</div>
                        <ion-icon name="add-circle" onClick={toggleListForm}></ion-icon>
                    </header>
                    {userList.map((checklist) => <TaskOption key={checklist} title={checklist} count={4} />)}
                </div>
            </div>
        }
        </>
    );
}
