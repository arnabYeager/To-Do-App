import { useState } from "react";

export function ToDoList() {

    const [tasks, setTasks] = useState([]);                  // Represents the state of tasks in the To-Do List app.
    const [newTask, setNewTask] = useState("");

    const handleChangeInput = (event) => {              // Handles the change event 
        setNewTask(event.target.value);                 // of the input element.
    }

    const addTask = () => {
        if (newTask.trim() !== "") {
            const newTaskObj = { text: newTask, completed: false }; // Add a completed property to each task
            setTasks(t => [...t, newTaskObj]);
            setNewTask("");
        }
    }

    const deleteTask = (index) => {                                // Deletes a task from the task list.
        const updatedTask = tasks.filter((_, i) => i !== index);   // index - The index of the task to be deleted.
        setTasks(updatedTask);
    }

    const moveUpTask = (index) => {                              // Moves a task up in the task list.
        if(index > 0){
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index - 1]] =     // index - The index of the task to move up.
            [updatedTasks[index - 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    const moveDownTask = (index) => {                            // Moves a task up in the task list.
        if(index < tasks.length - 1){
            const updatedTasks = [...tasks]; 
            [updatedTasks[index], updatedTasks[index + 1]] =     // index - The index of the task to move up.
            [updatedTasks[index + 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    const toggleCompleteTask = (index) => {                      // Toggles the completed status of a task.
        const updatedTasks = tasks.map((task, i) =>
            i === index ? { ...task, completed: !task.completed } : task
        );
        setTasks(updatedTasks);
    }
    
    return (
        <div className="to-do-list">
            <h1>To-Do-List</h1>
            <div>
                <input 
                    type="text" 
                    placeholder="Enter your tast here"
                    value={newTask} 
                    onChange={handleChangeInput}/>
                <button 
                    className="add-button" 
                    onClick={addTask}>
                    Add
                </button>
            </div>
            <ol>
                {tasks.map((task, index) =>
                    <li key={index} style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                        <span>{task.text}</span>
                        <button
                            className="delete-btn"
                            onClick={() => deleteTask(index)}>
                            Delete
                        </button>
                        <button
                            className="move-btn"
                            onClick={() => moveUpTask(index)}>
                            ☝️
                        </button>
                        <button
                            className="move-btn"
                            onClick={() => moveDownTask(index)}>
                            👇
                        </button>
                        <button
                            className={task.completed ? 'undo-btn' : 'mark-completed-btn'}
                            onClick={() => toggleCompleteTask(index)}>
                            {task.completed ? 'Undo' : 'Mark as Completed'}
                        </button>
                    </li>
                )}
            </ol>
        </div>
    );
}