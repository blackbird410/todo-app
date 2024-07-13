import { DAYS, getCurrentWeek, getDayTasks, getLocalStorageData, getOverdueTasks, getUserLists, getWeekTasks, sortTasks } from "../functions";
import { 
    ADD_TASK, 
    ADD_USER_LIST, 
    DISPLAY, 
    REMOVE_TASK, 
    SET_CURRENT_LIST, 
    SET_IS_ALL, 
    SET_IS_DAY, 
    SET_IS_FORM_VISIBLE, 
    SET_IS_LIST_FORM_VISIBLE, 
    SET_IS_NAVBAR_OPEN, 
    SET_IS_OVERDUE, 
    SET_IS_WEEK, 
    SET_SELECTED_DAY, 
    TOGGLE_FORM, 
    TOGGLE_LIST_FORM, 
    TOGGLE_NAVBAR, 
} from "./taskActionTypes";

const userTasks = [];

const initialState = {
    allTasks: userTasks,
    dayTasks: getDayTasks(userTasks),
    weekTasks: getWeekTasks(userTasks),
    overdueTasks: getOverdueTasks(userTasks),
    userList: getUserLists(userTasks),
    currentWeek: getCurrentWeek(),
    currentList: "",
    selectedDay: DAYS[0],
    isNavbarOpen: false,
    isFormVisible: false,
    isListFormVisible: false,
    isDay: true,
    isWeek: false,
    isAll: false,
    isOverdue: false,
};

const getTask = (e) => {
    const target = e.target.parentNode;

    return(
        {
            title: target.childNodes[1].textContent, 
            dueDate: new Date(target.childNodes[2].textContent), 
            notes: target.childNodes[3].textContent,
            description: target.childNodes[4].textContent,
        });
}

const taskReducer = (state = initialState, action) => {
    console.log("Current state: ", state.isFormVisible);
    console.log("Action: ", action);

    switch(action.type) {
        case ADD_TASK:{ 
            const tasks = [...state.allTasks, action.payload];
            return {
                ...state,
                allTasks: sortTasks(tasks),
                dayTasks: getDayTasks(tasks),
                weekTasks: getWeekTasks(tasks),
                overdueTasks: getOverdueTasks(tasks),
                userList: getUserLists(tasks),
            }
        }
        case REMOVE_TASK: {
            const info = getTask(action.payload);

            return {
                ...state,
                allTasks: state.allTasks.filter(item => 
                    (item.title !== info.title 
                        && new Date(item.dueDate) !== info.dueDate 
                        && item.notes !== info.notes 
                        && item.description !== info.description)
                )
            }
        }
        case ADD_USER_LIST: return {
            ...state,
            userList: [...state.userList, action.payload],
        }
        case SET_IS_NAVBAR_OPEN: return {
            ...state,
            isNavbarOpen: action.payload,
        }
        case SET_IS_FORM_VISIBLE: return {
            ...state,
            isFormVisible: action.payload,
        }
        case SET_IS_LIST_FORM_VISIBLE: return {
            ...state,
            isListFormVisible: action.payload,
        }
        case SET_IS_DAY: return {
            ...state, 
            isDay: action.payload,
        }
        case SET_IS_WEEK: return {
            ...state, 
            isWeek: action.payload,
        }
        case SET_IS_ALL: return {
            ...state, 
            isAll: action.payload,
        }
        case SET_IS_OVERDUE: return {
            ...state, 
            isOverdue: action.payload,
        }
        case SET_CURRENT_LIST: return {
            ...state, 
            currentList: action.payload,
        }
        case SET_SELECTED_DAY: return {
            ...state, 
            selectedDay: action.payload.target.value,
        }
        case TOGGLE_NAVBAR: return {
            ...state,
            isNavbarOpen: !state.isNavbarOpen,
        }
        case TOGGLE_FORM: return {
            ...state,
            isFormVisible: !state.isFormVisible,
        }
        case TOGGLE_LIST_FORM: return {
            ...state,
            isListFormVisible: !state.isListFormVisible,
        }
        case DISPLAY: {
            console.log(action.payload);
            // let section = action.payload;
            // if (section.childNodes[1]) section = action.payload.target.parentNode.childNodes[1].textContent; 
            // else section = action.payload.target.textContent;

            switch(action.payload) {
                case "My day": return {
                    ...state,
                    isWeek: false,
                    isAll: false,
                    isOverdue: false,
                    isDay: true,
                    currentList: "",
                } 
                case "My week": return {
                    ...state,
                    isWeek: true,
                    isAll: false,
                    isOverdue: false,
                    isDay: false,
                    currentList: "",
                } 
                case "All Tasks": return {
                    ...state,
                    isWeek: false,
                    isAll: true,
                    isOverdue: false,
                    isDay: false,
                    currentList: "",
                } 
                case "Overdue Tasks": return {
                    ...state,
                    isWeek: false,
                    isAll: false,
                    isOverdue: true,
                    isDay: false,
                    currentList: "",
                } 
                default: {
                    if (Object.keys(state.userList).includes(section)) {
                        return {
                            ...state,
                            isWeek: false,
                            isAll: false,
                            isOverdue: false,
                            isDay: true,
                            currentList: "",
                        };
                    } else {
                        return state;
                    } 
                } 
            } 
        }
        default: return state;
    }
}

export default taskReducer;
