import React, { useState } from 'react';
import './App.css';

/**
 * The main application component for the todo list.  Users can add new tasks,
 * mark tasks as completed and remove tasks.  State is managed locally using
 * React hooks.  This component demonstrates a clean separation of concerns
 * between UI, state management and event handlers.
 */
function App() {
  const [taskInput, setTaskInput] = useState('');
  const [tasks, setTasks] = useState([]);

  // Add a new task to the list when the form is submitted
  const handleAddTask = (e) => {
    e.preventDefault();
    const trimmed = taskInput.trim();
    if (trimmed === '') return;
    const newTask = {
      id: Date.now(),
      text: trimmed,
      completed: false,
    };
    setTasks((prev) => [newTask, ...prev]);
    setTaskInput('');
  };

  // Toggle the completed state of a task
  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Remove a task from the list
  const removeTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>My Todo List</h1>
      </header>
      <main>
        <form onSubmit={handleAddTask} className="task-form">
          <input
            type="text"
            className="task-input"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            placeholder="Add a new task..."
          />
          <button type="submit" className="add-button">
            Add
          </button>
        </form>
        <ul className="task-list">
          {tasks.map((task) => (
            <li
              key={task.id}
              className={`task-item ${task.completed ? 'completed' : ''}`}
            >
              <label className="task-label">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                />
                <span className="task-text">{task.text}</span>
              </label>
              <button
                className="delete-button"
                onClick={() => removeTask(task.id)}
                aria-label={`Delete ${task.text}`}
              >
                ×
              </button>
            </li>
          ))}
          {tasks.length === 0 && (
            <li className="no-tasks">No tasks yet – add one above!</li>
          )}
        </ul>
      </main>
    </div>
  );
}

export default App;
