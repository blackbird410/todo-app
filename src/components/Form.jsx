import styles from "../styles/Form.module.css";

export default function Form({ isVisible }) {
    return (
        <>
            {isVisible &&
                <form 
                noValidate={true} 
                id={styles["task-form"]}>
                <div className={styles["input-wrapper"]}>
                    <label htmlFor="title">Title</label>
                    <input id="title" name="title"/>
                </div>
                <div className={styles["input-wrapper"]}>
                    <label htmlFor="description">Description</label>
                    <input id="description" name="description"/>
                </div>
                <div className={styles["input-wrapper"]}>
                    <label htmlFor="due-date">Due date</label>
                    <input id="due-date" name="due-date" type="date"/>
                    <input id="due-date-time" name="due-date-time" type="time"/>
                </div>
                <div className={styles["input-wrapper"]}>
                    <label htmlFor="priority">Priority</label>
                    <input id="priority" name="priority" type="number" max={10} min={1}/>
                </div>
                <div className={styles["input-wrapper"]}>
                    <label htmlFor="notes">Notes</label>
                    <input id="notes" name="notes"/>
                </div>
                <div className={styles["input-wrapper"]}>
                    <label htmlFor="checklist">Checklist</label>
                    <input id="checklist" name="checklist"/>
                </div>
                <div className={styles['btn-wrapper']}>
                    <button id={styles["save-btn"]}>Save</button>
                    <button id={styles["cancel-btn"]}>Cancel</button>
                </div>

            </form>}
        </>
    );
}
