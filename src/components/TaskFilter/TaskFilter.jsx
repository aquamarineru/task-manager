import { useDispatch } from 'react-redux';
import { setFilter } from '../../redux/slices/tasksSlice';
import PropTypes from 'prop-types';

const TaskFilter = ({ currentFilter = 'all' }) => {
  const dispatch = useDispatch();

  return (
    <div className="flex justify-center space-x-4 my-6">
      <button
        className={`px-6 py-2 rounded-md transition-colors duration-300 ${
          currentFilter === 'all' 
            ? 'bg-greenTeal text-white' 
            : 'bg-gainboro hover:bg-greenTeal/10'
        }`}
        onClick={() => dispatch(setFilter('all'))}
      >
        All
      </button>
      <button
        className={`px-6 py-2 rounded-md transition-colors duration-300 ${
          currentFilter === 'completed' 
            ? 'bg-greenTeal text-white' 
            : 'bg-gainboro hover:bg-greenTeal/10'
        }`}
        onClick={() => dispatch(setFilter('completed'))}
      >
        Completed
      </button>
      <button
        className={`px-6 py-2 rounded-md transition-colors duration-300 ${
          currentFilter === 'pending' 
            ? 'bg-greenTeal text-white' 
            : 'bg-gainboro hover:bg-greenTeal/10'
        }`}
        onClick={() => dispatch(setFilter('pending'))}
      >
        Pending
      </button>
    </div>
  );
};

TaskFilter.propTypes = {
  currentFilter: PropTypes.string.isRequired,
};

export default TaskFilter;
