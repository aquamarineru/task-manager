import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addTaskLocally } from '../redux/slices/tasksSlice';
import useFetch from '../hooks/useFetch';
import LoadingSpinner from './LoadingSpinner';

const TaskSuggestions = () => {
  const dispatch = useDispatch();
  const { data, loading, error, refetch } = useFetch('https://jsonplaceholder.typicode.com/todos');

  const [shuffledTasks, setShuffledTasks] = useState([]);
  const [visibleCount, setVisibleCount] = useState(5);

  useEffect(() => {
    if (data) {
      setShuffledTasks(data.slice(0, visibleCount)); 
    }
  }, [data, visibleCount]);

  // Function for adding a task to the list
  const handleAddTask = (task) => {
    const newTask = { title: task.title };
    dispatch(addTaskLocally(newTask));
  };

  // Function for shuffling the task list
  const shuffleTasks = () => {
    if (data) {
      const shuffled = [...data].sort(() => Math.random() - 0.5);
      setShuffledTasks(shuffled.slice(0, visibleCount)); 
    }
  };

  // Function to load more tasks
  const loadMoreTasks = () => {
    setVisibleCount((prevCount) => prevCount + 5);
  };

  return (
    <div className="p-4 my-6 sm:px-10 md:max-w-3xl">
      <h2 className="text-2xl font-bold text-graphit mb-4">Task Suggestions</h2>

      {loading && <LoadingSpinner />}

      {error && (
        <div className="text-sunsetOrange">
          Data loading error: {error}
          <button
            className="ml-4 px-4 py-2 bg-sunsetOrange text-white rounded hover:bg-sunsetOrange"
            onClick={refetch}
          >
            Retry
          </button>
        </div>
      )}
       {/* Fallback UI if no data is available */}
       {!loading && !data && !error && (
        <div className="text-gray-600 text-center mt-4">
          No tasks available. Please try again later.
        </div>
      )}

      {shuffledTasks.length > 0 && (
        <>
          <ul>
            {shuffledTasks.map((task) => (
              <li key={task.id} className="flex justify-between items-center bg-gainboro p-3 rounded my-2">
                <span>{task.title}</span>
                <button
                  className="bg-greenTeal text-white px-4 py-2 rounded hover:bg-greenTeal/80"
                  onClick={() => handleAddTask(task)}
                >
                  Add
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-4"
              onClick={loadMoreTasks}
            >
              Load More Tasks
            </button>
            <button
              className="px-4 py-2 bg-gray hover:bg-gray-700 text-white rounded"
              onClick={shuffleTasks}
            >
              Shuffle Tasks
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskSuggestions;
