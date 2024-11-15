import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addTaskLocally } from '../redux/slices/tasksSlice';
import useFetch from '../hooks/useFetch';
import LoadingSpinner from './LoadingSpinner';

const TaskSuggestions = React.memo(() => {
  const dispatch = useDispatch();
  const { data, loading, error, refetch } = useFetch('https://jsonplaceholder.typicode.com/todos');
  const [displayedTasks, setDisplayedTasks] = useState([]);
  const [taskCount, setTaskCount] = useState(5);


  const handleAddTask = useCallback((task) => {
    dispatch(addTaskLocally({ title: task.title }));
  }, [dispatch]);

 
  useEffect(() => {
    if (data) {
      setDisplayedTasks(data.slice(0, taskCount));
    }
  }, [data, taskCount]);

 
  const loadMoreTasks = useCallback(() => {
    if (data) {
      const newCount = taskCount + 5;
      setTaskCount(newCount);
      setDisplayedTasks(data.slice(0, newCount));
    }
  }, [data, taskCount]);

  const shuffleTasks = useCallback(() => {
    if (data) {
      const shuffled = [...data].sort(() => Math.random() - 0.5);
      setDisplayedTasks(shuffled.slice(0, taskCount));
    }
  }, [data, taskCount]);

  if (loading) return <LoadingSpinner />;
  if (error) return (
    <div className="text-sunsetOrange">
      {error}
      <button
        onClick={refetch}
        className="ml-4 px-4 py-2 bg-graphit text-white rounded hover:bg-blue-600"
      >
        Retry
      </button>
    </div>
  );

  return (
    <div className="container p-4 my-6 md:px-32 mx-auto">
      <h2 className="text-2xl font-bold text-graphit mb-4 text-center">Task Suggestions</h2>
      
      {displayedTasks.length === 0 && <p className="text-gray-600">No tasks available</p>}
      
      <ul>
        {displayedTasks.map(task => (
          <li 
            key={task.id} 
            className="flex justify-between items-center bg-gainboro p-3 rounded my-2"
          >
            <span>{task.title}</span>
            <button 
              onClick={() => handleAddTask(task)}
              className="bg-greenTeal text-white px-4 py-2 rounded hover:bg-greenTeal/80"
            >
              Add
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-4 flex space-x-4 justify-center">
        {/* Кнопка для загрузки дополнительных задач */}
        <button 
          onClick={loadMoreTasks}
          disabled={taskCount >= data.length}
          className={`px-4 py-2 ${taskCount >= data.length ? 'bg-gray-300' : 'bg-graphit hover:bg-grathit/20'} text-white rounded `}
        >
          Load More
        </button>
        
        <button 
          onClick={shuffleTasks}
          className="px-4 py-2 bg-gray text-white rounded hover:bg-gray-700"
        >
          Shuffle Tasks
        </button>
      </div>
    </div>
  );
});

export default TaskSuggestions;
