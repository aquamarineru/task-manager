import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchQuery } from '../redux/slices/tasksSlice';
import { debounce } from 'lodash';

const TaskSearch = React.memo(() => {
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState('');

  const handleSearch = useCallback(
    debounce((query) => {
      dispatch(setSearchQuery(query));
    }, 300),
    [dispatch]
  );

  const onChangeHandler = (e) => {
    setSearchInput(e.target.value);
    handleSearch(e.target.value);
  };

  return (
    <input
      type="text"
      value={searchInput}
      onChange={onChangeHandler}
      placeholder="Search for tasks..."
      className="w-full sm:w-2/3 mx-auto mb-6 px-4 py-2 flex justify-center text-graphit border border-gainboro rounded-md focus:outline-none focus:ring-2 focus:ring-greenTeal"
    />
  );
});

export default TaskSearch;
