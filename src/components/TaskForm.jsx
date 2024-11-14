import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTaskLocally, updateTaskLocally, clearTaskForEdit } from '../redux/slices/tasksSlice';

const TaskForm = () => {
  const dispatch = useDispatch();
  const taskToEdit = useSelector(state => state.tasks.taskToEdit); 
  const [task, setTask] = useState('');

  useEffect(() => {
    if (taskToEdit) {
      setTask(taskToEdit.title); 
    } else {
      setTask('');
    }
  }, [taskToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskToEdit) {
      
      dispatch(updateTaskLocally({ id: taskToEdit.id, title: task }));
      dispatch(clearTaskForEdit()); 
    } else {
      const newTask = { title: task };
      dispatch(addTaskLocally(newTask));
    }
    setTask('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter task"
        required
      />
      <button type="submit">{taskToEdit ? 'Update Task' : 'Add Task'}</button>
    </form>
  );
};

export default TaskForm;
