import { useContext, useState } from "react";
import { AppContext } from "../App";

export default function UserListForm() {
    const { userList, isListFormVisible, setUserList, toggleListForm } = useContext(AppContext);
    const [title, setTitle] = useState("");

    const handleChange = (e) => {
        const { value } = e.target;
        setTitle(value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let temp = {...userList };
        temp[title] = 0;
        setUserList(temp);
        toggleListForm();
    }

    return (
        <>{isListFormVisible && 
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
                        onClick={toggleListForm}
                        type="button"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        }
        </>
    );
};
