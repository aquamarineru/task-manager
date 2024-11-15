import { useDispatch } from 'react-redux';
import { setFilter } from '../redux/slices/tasksSlice';
import PropTypes from 'prop-types';

const TaskFilter = ({ currentFilter }) => {
  const dispatch = useDispatch();

  return (
    <div className="flex justify-center space-x-4 my-6">
      <button
        className={`px-4 py-2 rounded ${currentFilter === 'all' ? 'bg-greenTeal text-white' : 'bg-gainboro'}`}
        onClick={() => dispatch(setFilter('all'))}
      >
        All
      </button>
      <button
        className={`px-4 py-2 rounded ${currentFilter === 'completed' ? 'bg-greenTeal text-white' : 'bg-gainboro'}`}
        onClick={() => dispatch(setFilter('completed'))}
      >
        Completed
      </button>
      <button
        className={`px-4 py-2 rounded ${currentFilter === 'pending' ? 'bg-greenTeal text-white' : 'bg-gainboro'}`}
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
