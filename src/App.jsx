import { useState } from 'react'
import DayTasks from "./components/DayTasks"
import './App.css'
import Form from './components/Form';

function App() {
    
    return (
        <div className='main'>
            <DayTasks />
            <Form />
        </div>
    );
}

export default App
