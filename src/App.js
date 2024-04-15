import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from "react";

function App() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState('');
  const [todos, setTodos] = useState(() => {
    try {
      const savedTodos = localStorage.getItem("todos");
      return savedTodos ? JSON.parse(savedTodos) : [];
    } catch (error) {
      console.error("Error loading todos from local storage:", error);
      return [];
    }
  });
  const [task, setTask] = useState('');

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = () => {
    if (task !== "") {
      const newTodo = { text: task, completed: false };
      setTodos([...todos, newTodo]);
      setTask('');
    }
  };

  const handleInputChange = (event) => {
    setTask(event.target.value);
  };

  const handleToggleComplete = (index) => {
    const updatedTodos = todos.map((todo, i) => {
      if (i === index) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const handleEditTodo = (index) => {
    setEditIndex(index);
    setEditText(todos[index].text);
    setModalOpen(true);
  };

  const handleSaveEdit = () => {
    const updatedTodos = todos.map((todo, i) => {
      if (i === editIndex) {
        return { ...todo, text: editText };
      }
      return todo;
    });
    setTodos(updatedTodos);
    closeEditModal();
  };

  const closeEditModal = () => {
    setModalOpen(false);
    setEditIndex(null);
    setEditText('');
  };

  const handleDeleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <input
          type="text"
          value={task}
          onChange={handleInputChange}
          placeholder="Add a new task"
        />
        <button onClick={handleAddTodo}>Add Todo</button>
        <ul>
          {todos.map((todo, index) => (
            <li key={index} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggleComplete(index)}
              />
              {todo.text}
              <button onClick={() => handleDeleteTodo(index)}>Delete</button>
              <button onClick={() => handleEditTodo(index)}>Edit</button>
            </li>
          ))}
        </ul>
        {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <h2>Edit Todo</h2>
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />
              <button onClick={handleSaveEdit}>Save</button>
              <button onClick={closeEditModal}>Cancel</button>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
