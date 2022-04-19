import {useState} from 'react';

const AddTask = ({onAdd}) => {

    const [title,setTitle] = useState('');
    const [day,setDay] = useState('');
    const [completed,setCompleted] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault(); // prevent default behaviour of form 

        if (!title) {
            alert('Please enter a task');
            return;
        }

        onAdd({title,day,completed});

        setTitle('');
        setDay('');
        setCompleted(false);

    }

  return (
    <form className ='add-from' onSubmit={onSubmit}>
        <div className = 'form-control'>
            <label>Task</label>
            <input type='text' placeholder= 'Add Task' value={title} onChange={(e)=>setTitle(e.target.value)}/>
        </div>

        <div className = 'form-control'>
            <label>Date</label>
            <input type='text' placeholder= 'Add Date' value={day} onChange={(e)=>setDay(e.target.value)}/>
        </div>

        <div className = 'form-control form-control-check' >
            <label>Completed</label>
            <input type='checkbox' value={completed} checked = {completed} onChange={(e)=>setCompleted(e.currentTarget.checked)} />
        </div>

        <input type='submit' value = 'Save Task' className = 'btn btn-block' />

    </form>
  )
}

export default AddTask