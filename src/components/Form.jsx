import { useContext, useEffect, useState } from "react";
import styles from "../styles/Form.module.css";
import { AppContext } from "../App";

export default function Form({ isVisible }) {
    const { allTasks, setAllTasks, toggleForm } = useContext(AppContext);
    const [formData, setFormData] = useState(
        {
            title: "",
            description: "",
            dueDate: "",
            priority: "",
            notes: "",
            checklist: "",
        },
    );

    const d = new Date();
    const [dateTime, setDateTime]  = useState(d.toLocaleString());

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "due-date") {
            setDateTime((dateTime) => dateTime)
        const currentDate = new Date(dateTime).toLocaleString();
        setFormData((formData) => ({...formData, dueDate: currentDate}));
        } else setFormData({...formData, [name]: value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const currentDate = new Date(dateTime).toLocaleString();
        setFormData((formData) => ({...formData, dueDate: currentDate}));
        
        setAllTasks([...allTasks, formData]);
        toggleForm();
    }

    return (
        <>
            {isVisible &&
                <form 
                    id={styles["task-form"]}
                    onSubmit={handleSubmit}
                >
                    <div className={styles["input-wrapper"]}>
                        <label htmlFor="title">Title</label>
                        <input 
                            id="title" 
                            name="title"
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles["input-wrapper"]}>
                        <label htmlFor="description">Description</label>
                        <input 
                            id="description" 
                            name="description"
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles["input-wrapper"]}>
                        <label htmlFor="due-date">Due date</label>
                        <input 
                            id="due-date" 
                            name="due-date" 
                            type="datetime-local"
                            min={d.toLocaleString('en-CA')}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles["input-wrapper"]}>
                        <label htmlFor="priority">Priority</label>
                        <input 
                            id="priority" 
                            name="priority" 
                            type="number" 
                            max={10} 
                            min={1}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles["input-wrapper"]}>
                        <label htmlFor="notes">Notes</label>
                        <input 
                            id="notes" 
                            name="notes"
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles["input-wrapper"]}>
                        <label htmlFor="checklist">Checklist</label>
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
                            Save
                        </button>
                        <button 
                            id={styles["cancel-btn"]} 
                            onClick={toggleForm}
                            type="button"
                        >
                            Cancel
                        </button>
                    </div>

            </form>}
        </>
    );
}
