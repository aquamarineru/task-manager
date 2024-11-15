import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const LOCAL_STORAGE_KEY = 'localTasks';

const saveTasksToLocalStorage = (tasks) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
};

const loadTasksFromLocalStorage = () => {
  const tasks = localStorage.getItem(LOCAL_STORAGE_KEY);
  return tasks ? JSON.parse(tasks) : [];
};

const initialState = {
  tasks: loadTasksFromLocalStorage(),
  taskToEdit: null,
  filter: 'all',
  searchQuery: '',
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTaskLocally(state, action) {
      const newTask = {
        ...action.payload,
        id: uuidv4(),
        completed: false,
        pending: false,
      };
      state.tasks.unshift(newTask);
      saveTasksToLocalStorage(state.tasks);
    },
    updateTaskLocally(state, action) {
      const { id, title } = action.payload;
      const index = state.tasks.findIndex(task => task.id === id);
      if (index !== -1) {
        state.tasks[index].title = title;
        saveTasksToLocalStorage(state.tasks);
      }
    },
    deleteTaskLocally(state, action) {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
      saveTasksToLocalStorage(state.tasks);
    },
    toggleCompleted(state, action) {
      const taskId = action.payload;
      const index = state.tasks.findIndex(task => task.id === taskId);
      if (index !== -1) {
        state.tasks[index].completed = !state.tasks[index].completed;
        saveTasksToLocalStorage(state.tasks);
      }
    },
    setTaskForEdit(state, action) {
      state.taskToEdit = action.payload;
    },
    clearTaskForEdit(state) {
      state.taskToEdit = null;
    },
    togglePending(state, action) {
      const taskId = action.payload;
      const index = state.tasks.findIndex(task => task.id === taskId);
      if (index !== -1) {
        state.tasks[index].pending = !state.tasks[index].pending;
        saveTasksToLocalStorage(state.tasks);
      }
    },
    setFilter(state, action) {
      state.filter = action.payload;
    },
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
    reorderTasks(state, action) {
      state.tasks = action.payload;
      saveTasksToLocalStorage(state.tasks);
    },
  },
});

export const {
  addTaskLocally,
  updateTaskLocally,
  deleteTaskLocally,
  toggleCompleted,
  togglePending,
  setTaskForEdit,
  clearTaskForEdit,
  setFilter,
  setSearchQuery,
  reorderTasks,
} = tasksSlice.actions;

export default tasksSlice.reducer;
