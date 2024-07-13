
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

export const getLocalStorageData = () => {
    const tasks = JSON.parse(localStorage.getItem("allTasks"));
    return (tasks) ? tasks : [];
}

export const getDayTasks = (taskList) => {
    return taskList.filter(
        (item) => new Date(item.dueDate).toLocaleDateString() === new Date().toLocaleDateString());
}

export const getWeekTasks = (taskList) => {
    const nextWeekDeadline = new Date();
    nextWeekDeadline.setDate(nextWeekDeadline.getDate() + 7);
    return taskList.filter((item) => new Date(item.dueDate) < nextWeekDeadline);
}

export const getOverdueTasks = (taskList) => {
    return taskList.filter((item) => new Date(item.dueDate) < new Date());
}

export const getUserLists = (taskList) => {
    let lists = {}; 
    
    taskList.forEach(element => {
        if (!lists.hasOwnProperty(element.checklist) && element.checklist) {
            lists[element.checklist] = 
                taskList.filter(
                    item => item.checklist === element.checklist).length; 
        }
    });

    return lists;
};

export const sortTasks = (list) => {
    return list.sort((a, b) => (new Date(a.dueDate) - new Date(b.dueDate)));
}
