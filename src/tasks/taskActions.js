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

export const addTask = (task) => {
    return {
        type: ADD_TASK,
        payload: task,
    };
};

export const removeTask = (task) => {
    return {
        type: REMOVE_TASK,
        payload: task,
    };
};

export const addUserList = (list) => {
    return {
        type: ADD_USER_LIST,
        payload: list,
    };
};

export const setIsNavbarOpen = (value) => {
    return {
        type: SET_IS_NAVBAR_OPEN,
        payload: value,
    };
};

export const setIsFormVisible = (value) => {
    return {
        type: SET_IS_FORM_VISIBLE,
        payload: value,
    };
};

export const setIsListFormVisible = (value) => {
    return {
        type: SET_IS_LIST_FORM_VISIBLE,
        payload: value,
    };
};

export const setIsDay = (value) => {
    return {
        type: SET_IS_DAY,
        payload: value,
    };
};

export const setIsWeek = (value) => {
    return {
        type: SET_IS_WEEK,
        payload: value,
    };
};

export const setIsOverdue = (value) => {
    return {
        type: SET_IS_OVERDUE,
        payload: value,
    };
};

export const setIsAll = (value) => {
    return {
        type: SET_IS_ALL,
        payload: value,
    };
};

export const setCurrentList = (list) => {
    return {
        type: SET_CURRENT_LIST,
        payload: list,
    };
};

export const setSelectedDay = (e) => {
    return {
        type: SET_SELECTED_DAY,
        payload: e,
    };
};

export const toggleNavbar = () => {
    return {
        type: TOGGLE_NAVBAR,
    };
};


export const toggleForm = () => {
    return {
        type: TOGGLE_FORM,
    };
};
export const toggleListForm = () => {
    return {
        type: TOGGLE_LIST_FORM,
    };
};

export const display = (e) => {
    return {
        type: DISPLAY,
        payload: e,
    };
}




