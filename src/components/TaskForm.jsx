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
    <form 
    onSubmit={handleSubmit}
    className="flex items-center space-x-4  p-4 w-full  mx-auto sm:w-2/3 md:w-1/2"
    >
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter task"
        required
        className="flex-grow px-4 py-2 text-graphit border border-gainboro rounded-md focus:outline-none focus:ring-2 focus:ring-greenTeal"
      />
      <button 
      type="submit"
      className={`px-3 py-2 text-white rounded-md transition-colors duration-300 ${
        taskToEdit ? 'bg-sunsetOrange hover:bg-sunsetOrange/90' : 'bg-greenTeal hover:bg-greenTeal/90'
      }`}
      >
        {taskToEdit 
        ? 'Update' 
        : 'Add'}
        </button>
    </form>
  );
};

export default TaskForm;
