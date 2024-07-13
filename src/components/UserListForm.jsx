import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUserList, toggleListForm } from "../tasks/taskActions";

export default function UserListForm() {
    const dispatch = useDispatch();
    const userList = useSelector(state => state.task.userList);

    const [title, setTitle] = useState("");

    const handleChange = (e) => {
        const { value } = e.target;
        setTitle(value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let temp = {...userList };
        temp[title] = 0;
        dispatch(addUserList(temp));
        dispatch(toggleListForm());
    }

    return ( 
        <form
            className="form"
            id="list-form"
            onSubmit={handleSubmit}
        >
            <div className="input-wrapper">
                <label htmlFor="checklist">List title</label>
                <input 
                    className="form-input"
                    id="checklist" 
                    name="checklist"
                    onChange={handleChange}
                />
            </div>
            <div className="btn-wrapper">
                <button 
                    className="form-btn bg-primary"
                    id="save-btn"
                    type="submit" 
                >
                    Add list
                </button>
                <button 
                    className="form-btn bg-red-600"
                    id="cancel-btn" 
                    onClick={() => dispatch(toggleListForm())}
                    type="button"
                >
                    Cancel
                </button>
            </div>
        </form>
    );
};
