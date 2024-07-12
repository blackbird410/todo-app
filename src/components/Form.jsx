import { useContext, useState } from "react";
import { AppContext } from "../App";

export default function Form() {
    const { allTasks, isFormVisible, setAllTasks, toggleForm } = useContext(AppContext);
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
            setDateTime(value);
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
            {isFormVisible &&
                <form 
                    className="form"
                    id="task-form"
                    onSubmit={handleSubmit}
                >
                    <div className="input-wrapper">
                        <label htmlFor="title">Title</label>
                        <input 
                            className="form-input"
                            id="title" 
                            name="title"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="description">Description</label>
                        <input 
                            className="form-input"
                            id="description" 
                            name="description"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="due-date">Due date</label>
                        <input 
                            className="form-input"
                            id="due-date" 
                            name="due-date" 
                            type="datetime-local"
                            min={d.toLocaleString('en-CA')}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="priority">Priority</label>
                        <input 
                            className="form-input"
                            id="priority" 
                            name="priority" 
                            type="number" 
                            max={10} 
                            min={1}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="notes">Notes</label>
                        <input 
                            className="form-input"
                            id="notes" 
                            name="notes"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="checklist">Checklist</label>
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
                            Save
                        </button>
                        <button 
                            className="form-btn bg-red-600"
                            id="cancel-btn" 
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
