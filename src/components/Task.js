// cdn link for font awesome:
import {FaTimes} from 'react-icons/fa'

const Task = ({propTask,onDelete,onToggle}) => {
  return (
    <div className={`task ${propTask.completed ? 'reminder' : '' }`} onDoubleClick={() => onToggle(propTask.id)}>
        <h3> {propTask.title} <FaTimes style = {{color:'red', cursor:'pointer'}} onClick={()=>onDelete(propTask.id)} /> </h3>
        <p> {propTask.day} </p>
    </div>
  )
}

export default Task