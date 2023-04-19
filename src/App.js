import TodoList from './components/TodoList'
import './App.css';
import {useState, useEffect} from 'react'

export default function App() {
  // localStorage.clear()
  const [todos, setTodos] = useState([])

  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos && savedTodos !== "undefined" && savedTodos !== "null") {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);


  const addTodo = (event) => {
    const newTodo = { text: event.target.value, id: Date.now(), completed: false }
    localStorage.setItem('todos', JSON.stringify([newTodo, ...todos]))
    setTodos([newTodo,...todos])
    event.target.value = ''
  }

  const completeTodo = (id, event) => {
    const todosCopy = [...todos]
    const indexOfTodo = todosCopy.findIndex((i) => i.id === id)
    todosCopy[indexOfTodo].completed = !todosCopy[indexOfTodo].completed
    localStorage.setItem('todos', JSON.stringify([...todosCopy]))
    setTodos([...todosCopy])
  }

  const editTodoText = (id, event) => {
    const todosCopy = [...todos]
    const indexOfTodo = todosCopy.findIndex((i) => i.id === id)
    todosCopy[indexOfTodo].text = event.target.value
    localStorage.setItem('todos', JSON.stringify([...todosCopy]))
    setTodos([...todosCopy])
    event.target.value = ""
  }

  const deleteTodo = (id) => {
    const todosCopy = [...todos]
    const indexOfTodo = todosCopy.findIndex((i) => i.id === id)
    todosCopy.splice(indexOfTodo, 1)
    localStorage.setItem('todos', JSON.stringify([...todosCopy]))
    setTodos([...todosCopy])
  };

  return (
    <div className="App">
      <TodoList
        todos={todos}
        addTodo={addTodo}
        completeTodo={completeTodo}
        editTodoText={editTodoText}
        deleteTodo={deleteTodo}
      />
    </div>
  );
}



