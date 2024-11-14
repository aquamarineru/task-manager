import { useSelector, useDispatch } from 'react-redux';
import { deleteTaskLocally, toggleCompleted, togglePending, setTaskForEdit } from '../../redux/slices/tasksSlice';
import TaskFilter from '../TaskFilter/TaskFilter';
import TaskSearch from '../TaskSearch';

const TasksList = () => {
  const dispatch = useDispatch();
  const { tasks, filter, searchQuery } = useSelector(state => state.tasks); 

 
  const filteredTasks = tasks.filter(task => {
    
    if (searchQuery && !task.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    if (filter === 'completed' && !task.completed) return false;
    if (filter === 'pending' && !task.pending) return false;
    return true;
  });

  return (
    <div>
      <TaskSearch />
      <TaskFilter currentFilter={filter} />
      {filteredTasks.length === 0 ? (
        <div className="text-center text-gray mt-4 px-4 py-6 rounded bg-sunsetOrange/20">
          <p>Nothing found</p>
        </div>
      ) : (
        <ul className="space-y-4 mt-4">
          {filteredTasks.map(task => (
            <li 
              key={task.id} 
              className={`flex justify-between items-center p-4 bg-white shadow rounded-lg hover:bg-gray-100 ${
                task.pending ? 'animate-pulse' : ''
              }`}
            >
              <span
                className={`flex-1 text-lg cursor-pointer ${
                  task.completed ? 'line-through text-gray-500' : 'text-black'
                }`}
                onClick={() => dispatch(toggleCompleted(task.id))}
              >
                {task.title}
                {task.pending && (
                  <span className="ml-2 animate-spin">🔄</span>
                )}
              </span>
              
              <div className="space-x-2">
                <button
                  className="px-4 py-2 rounded-md hover:bg-gray/20 border-[1px] border-gray text-2xl"
                  onClick={() => dispatch(setTaskForEdit(task))}
                >
                  ✏️
                </button>
                <button
                  className="px-4 py-2 rounded border-[1px] border-sunsetOrange hover:bg-sunsetOrange/20 text-2xl"
                  onClick={() => dispatch(deleteTaskLocally(task.id))}
                >
                  🗑️
                </button>
                {!task.completed && !task.pending && (
                  <button
                    className="px-4 py-2 rounded border-[1px] border-greenTeal hover:bg-greenTeal/20 text-2xl"
                    onClick={() => dispatch(togglePending(task.id))}
                  >
                    🟢
                  </button>
                )}

                {task.pending && (
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    onClick={() => dispatch(togglePending(task.id))}
                  >
                    Stop
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TasksList;
