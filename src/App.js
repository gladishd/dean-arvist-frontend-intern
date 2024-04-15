import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from "react";

function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [task, setTask] = useState('');
  const handleAddTodo = () => {
    if (task !== "") {
      setTodos([...todos, task]);
      setTask('');
    }
  };
  const handleInputChange = (event) => {
    console.log("The input value is ", event.target.value)
    setTask(event.target.value);
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
          {
            console.log("The current todos are ", todos)
          }
          {
            todos.map((todo, index) => (
              <li key={index}>
                {todo}
                <button onClick={() => handleDeleteTodo(index)}>Delete</button>
              </li>
            ))
          }
        </ul>
        <p>
          Todo List
          For <code>Arvist</code> Food Management Company.
        </p>
        <a
          className="App-link"
          href="https://www.arvist.ai/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Arvist Website
        </a>
      </header>
    </div>
  );
}

export default App;
