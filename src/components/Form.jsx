import { useContext, useState } from "react";
import styles from "../styles/Form.module.css";
import { AppContext } from "../App";

export default function Form({ isVisible }) {
    const { addTask, toggleForm } = useContext(AppContext);

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
    const [date, setDate]  = useState(d.toLocaleDateString('en-CA'));
    const [time, setTime]  = useState(d.toLocaleTimeString("en-US", { hour12: false }));

    const handleChange = (e) => {
        const { name, value } = e.target;

        if ( name.match("due-date")) {
            if (name === "due-date-time") setTime(value);
            else setDate(value);

            const d = new Date(`${date} ${time}`).toLocaleString();
            console.log(`**Current due date: ${d}\n`);
            setFormData({...formData, dueDate: d});

        } else setFormData({...formData, [name]: value});
        console.log(formData);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("**Submitting form**\n", formData);
        addTask(formData);
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
                            type="date"
                            value={date} 
                            min={d.toLocaleDateString('en-CA')}
                            onChange={handleChange}
                        />
                        <input 
                            id="due-date-time" 
                            name="due-date-time" 
                            type="time"
                            value={time}
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
