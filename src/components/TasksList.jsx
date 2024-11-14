import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTasks, deleteTaskLocally, toggleCompleted, togglePending, setTaskForEdit } from '../redux/slices/tasksSlice';
import TaskFilter from './TaskFilter/TaskFilter';

const TasksList = () => {
  const dispatch = useDispatch();
  const { tasks, isFetched, filter } = useSelector(state => state.tasks);

  useEffect(() => {
    if (!isFetched) {
      dispatch(fetchTasks());
    }
  }, [dispatch, isFetched]);


  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') {
      return task.completed === true;
    }
    if (filter === 'pending') {
      return task.pending === true;
    }
    return true; 
  });

  return (
    <div>

      <TaskFilter currentFilter={filter} />
      <ul className="space-y-4 mt-4">
        {filteredTasks.map(task => (
          <li key={task.id} className="flex justify-between items-center p-4 bg-white shadow rounded-lg hover:bg-gray-100">
            <span
              className={`flex-1 text-lg ${task.completed ? 'line-through text-gray-500' : 'text-black'}`}
              onClick={() => dispatch(toggleCompleted({ id: task.id }))}
            >
              {task.title}
            </span>

            <div className="space-x-2">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={() => dispatch(setTaskForEdit(task))}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                onClick={() => dispatch(deleteTaskLocally(task.id))}
              >
                Delete
              </button>
              {!task.completed && !task.pending && (
                <button
                  className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                  onClick={() => dispatch(togglePending({ id: task.id }))}
                >
                  Start
                </button>
              )}

              {task.pending && (
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  onClick={() => dispatch(togglePending({ id: task.id }))}
                >
                  Stop
                </button>
              )}

              {task.pending && (
                <span className="text-yellow-500 font-semibold">In Progress</span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TasksList;
