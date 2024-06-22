import { useState, useEffect } from 'react'
import Navbar from './Componantes/Navbar'

import { FaEdit } from "react-icons/fa"
import { AiFillDelete } from "react-icons/ai"
import { v4 as uuidv4 } from 'uuid';
function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)
  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])


  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo);
    let newtodos = todos.filter(item => {
      return item.id !== id;
    })
    setTodos(newtodos)
    saveToLS()

  }
  const handleDelete = (e, id) => {
    let newtodos = todos.filter(item => {
      return item.id !== id;
    });
    setTodos(newtodos)
    saveToLS()
    const confirmBox = window.confirm(
      "Are you sure to delete this todo?"
    )
    if (confirmBox === true) {
    }
  }
  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    saveToLS()
  }
  const togglefinished = (params) => {
    setshowFinished(!showFinished)
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }
  const handleChekbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newtodos = [...todos];
    newtodos[index].isCompleted = !newtodos[index].isCompleted;
    setTodos(newtodos)
    saveToLS()
  }


  return (
    <>
      <Navbar />
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-gray-100 min-h-[80vh] md:w-1/2">
        <h1 className='text-center font-bold text-2xl'>i Task-Manage Your todos at one place</h1>
        <div className="addtodo my-5">
          <h2 className="text-2lg font-bold my-2">Add a Todo</h2>
          <div className="flex">
            <input onChange={handleChange} value={todo} type="text" className="w-full rounded-full px-4 py-1" />
            <button onClick={handleAdd} disabled={todo.length <= 3} className="bg-violet-900 disabled:bg-indigo-900 hover:bg-violet-950 text-white p-4 py-2 text-sm font-bold rounded-full mx-2">Save</button>
          </div>
        </div>
        <input id='show' className='my-4' type="checkbox" onChange={togglefinished} checked={showFinished} />
        <label className='mx-2' htmlFor="show"> Show finished</label>
        <div className="h-1 bg-black opacity-15 mx-auto w-3/4 my"></div>
        <h2 className="text-lg font-bold">Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && <div>No todos to display</div>}

          {todos.map(item => {
            return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex w-1/4 justify-between my-3">
              <div className="flex gap-5">
                <input onClick={handleChekbox} type="checkbox" name={item.id} id="" checked={item.isCompleted} />
                <div className={item.isCompleted ? "line-through" : ""}> {item.todo}</div>
              </div>
              <div className="buttons flex h-full">
                <button onClick={(e) => { handleEdit(e, item.id) }} className="bg-violet-900 hover:bg-violet-950 text-white p-2 py-1 text-sm font-bold rounded-md mx-1"><FaEdit /></button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className="bg-violet-900 hover:bg-violet-950 text-white p-2 py-1 text-sm font-bold rounded-md mx-1"><AiFillDelete /></button>
              </div>

            </div>
          })}
        </div>

      </div>
    </>
  )
}

export default App
