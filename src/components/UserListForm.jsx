import { useContext, useState } from "react";
import { AppContext } from "../App";
import styles from "../styles/Form.module.css";

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
                    id={styles["task-form"]}
                    onSubmit={handleSubmit}
            >
                    <div className={styles["input-wrapper"]}>
                        <label htmlFor="checklist">List title</label>
                        <input 
                            id="checklist" 
                            name="checklist"
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles['btn-wrapper']}>
                        <button 
                            id={styles["save-btn"]} 
                            type="submit" 
                        >
                            Add list
                        </button>
                        <button 
                            id={styles["cancel-btn"]} 
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
