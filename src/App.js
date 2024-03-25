
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addTask, deleteTask, editTask, updateTask } from '../src/actions/actions';
import './App.css'; 

const TodoList = ({ tasks, error, addTask, deleteTask, editTask, updateTask }) => {
  const [newTaskText, setNewTaskText] = useState('');
  const [editedText, setEditedText] = useState('');

  const handleAddTask = () => {
    if (newTaskText.trim() !== '') {
      addTask(newTaskText);
      setNewTaskText('');
    }
  };

  const handleEdit = (id, text) => {
    editTask(id);
    setEditedText(text);
  };

  const handleUpdate = (id) => {
    updateTask(id, editedText);
  };

  return (
    <div className="todo-app-container">
      <h1>Todo App</h1>
      <div className="todo-list-container">
        {error && <p>Error: {error.message}</p>}
        <div className="todo-input-container">
          <input
            type="text"
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            placeholder="Add new task"
          />
          <button onClick={handleAddTask}>Add</button>
        </div>
        <div className="todo-items-container">
          <ul className="todo-list">
            {tasks.map((task) => (
              <li key={task.id} className="todo-item">
                {task.isEditing ? (
                  <>
                    <input
                      type="text"
                      value={editedText}
                      onChange={(e) => setEditedText(e.target.value)}
                    />
                    <button onClick={() => handleUpdate(task.id)}>Save</button>
                  </>
                ) : (
                  <>
                    <div>{task.text}</div>
                    <div>
                      <button onClick={() => handleEdit(task.id, task.text)}>Edit</button>
                      <button onClick={() => deleteTask(task.id)}>Delete</button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  tasks: state.tasks,
  error: state.error,
});

const mapDispatchToProps = {
  addTask,
  deleteTask,
  editTask,
  updateTask,
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
