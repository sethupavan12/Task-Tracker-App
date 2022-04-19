import Header from "./components/Header";
import Tasks from "./components/Tasks";
import {useState,useEffect} from 'react'
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import About from "./components/About";
import { BrowserRouter as Router,Route,Routes } from "react-router-dom";


function App() {



const [tasks,setTasks]= useState([])

useEffect(()=>{
  const getTasks = async  () => {
    const tasksFromServer = await fetchTasks()
    setTasks(tasksFromServer)
  }
  getTasks()
},[])

// fetchTask
const fetchTasks = async () => {
  const res = await fetch('http://localhost:5000/tasks');

  const data = await res.json();
  return data;
}
const fetchTask = async (id) => {
  const res = await fetch(`http://localhost:5000/tasks/${id}`);

  const data = await res.json();
  return data;
}

// A state for the button to show and close form
const [showForm,setShowForm] = useState(false);

// Add task
const addTask = async(task) => {
  const res = await fetch('http://localhost:5000/tasks',{
    method: 'POST',
    body: JSON.stringify(task),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const data = await res.json();
  setTasks([...tasks,data]);
}

  // const id = Math.floor(Math.random() * 100000000) + 1;
  // const newTask = {...task,id};
  // setTasks([...tasks,newTask]);



// delete task
const deleteTask = async (id) => {

  await fetch(`http://localhost:5000/tasks/${id}`,{
    method: 'DELETE'
  })
  setTasks(tasks.filter(task => task.id !== id))
}

const toggleTask= async (id) => {
  const taskToToggle = await fetchTask(id);

  const updateTask = { ...taskToToggle, completed: !taskToToggle.completed };

  const res = await fetch(`http://localhost:5000/tasks/${id}`,{
    method: 'PUT',
    body: JSON.stringify(updateTask),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const data = await res.json();

  

  setTasks
    (
     tasks.map
      (
      (task) => task.id ===id ? {...task, completed:data.completed} : task
      )
    )
  }

  return (
    <Router>
      <div className="container">
        <Header onAdd={()=>setShowForm(!showForm)} showForm = {showForm} />
        <Routes>  
          <Route path = '/' element=
          {<>
            {showForm && <AddTask onAdd={addTask}/>}
            {/* if tasks are greater than 1 perform Tasks tag or show that there are no tasks */}
            {tasks.length > 0 ? (<Tasks tasks={tasks} onDelete={deleteTask} onToggle = {toggleTask}/>) : ('No tasks to  show' )}
            
          </>} />
          <Route path='/about' element={<About />} />

        </Routes>
        
        <Footer />
        
      </div>
    </Router>
  );
}

export default App;
