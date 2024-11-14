import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchQuery } from '../redux/slices/tasksSlice';
import { debounce } from 'lodash';

const TaskSearch = () => {
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState('');

  const handleSearch = debounce((query) => {
    dispatch(setSearchQuery(query));
  }, 300);

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
      className="max-w-full w-full sm:w-1/2 mx-auto px-4 py-2 text-graphit border border-gainboro rounded-md focus:outline-none focus:ring-2 focus:ring-greenTeal"
    />
  );
};

export default TaskSearch;
