import { configureStore } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import tasksReducer, { addTaskLocally, updateTaskLocally, setTaskForEdit, clearTaskForEdit, togglePending, toggleCompleted,deleteTaskLocally, setFilter } from './tasksSlice';

describe('tasksSlice', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: { tasks: tasksReducer },
    });
  });

  // Add new task locally
  test('should add a task locally', () => {
    const newTask = { title: 'Test Task' };
    store.dispatch(addTaskLocally(newTask));

    const state = store.getState().tasks;
    expect(state.tasks).toHaveLength(1);
    expect(state.tasks[0].title).toBe('Test Task');
    expect(state.tasks[0].completed).toBe(false);

    expect(state.tasks[0].id).toBeDefined();
  });
  // Set task for editing
  test('should set task for edit', () => {
    const taskId = uuidv4();
    const initialTask = { title: 'Test Task', id: taskId, completed: false };

    store.dispatch(addTaskLocally(initialTask));

    let state = store.getState().tasks;
    expect(state.tasks[0].title).toBe('Test Task');

    // Set the task for editing
    store.dispatch(setTaskForEdit({ id: taskId }));

    state = store.getState().tasks;
    expect(state.taskToEdit).toEqual({ id: taskId });
  });
  // Clear task for edit
  test('should clear task for edit', () => {
    const newTask = { title: 'Test Task' };
    store.dispatch(addTaskLocally(newTask));

    let state = store.getState().tasks;
    const taskId = state.tasks[0].id; 

    store.dispatch(setTaskForEdit({ id: taskId, title: 'Test Task' }));

    state = store.getState().tasks;
    expect(state.taskToEdit).toEqual({ id: taskId, title: 'Test Task' });

    store.dispatch(clearTaskForEdit());

    state = store.getState().tasks;
    expect(state.taskToEdit).toBeNull(); 
  });
  // Update task locally
  test('should update a task locally', () => {
    const initialTask = { title: 'Test Task', completed: false }; 

    store.dispatch(addTaskLocally(initialTask));

    let state = store.getState().tasks;
    const taskId = state.tasks[0].id; 
    expect(state.tasks[0].title).toBe('Test Task');
    expect(state.tasks[0].id).toBeDefined(); 

    store.dispatch(updateTaskLocally({ id: taskId, title: 'Updated Task' }));

    state = store.getState().tasks;

    expect(state.tasks[0].title).toBe('Updated Task');
    expect(state.tasks[0].id).toBe(taskId); 
  });

  // Delete task locally
  test('should delete a task locally', () => {
    const initialTask = { title: 'Test Task', completed: false };
    store.dispatch(addTaskLocally(initialTask));

    let state = store.getState().tasks;
    const taskId = state.tasks[0].id;  
    expect(state.tasks).toHaveLength(1);
    expect(state.tasks[0].title).toBe('Test Task');
    expect(state.tasks[0].id).toBe(taskId);

    store.dispatch(deleteTaskLocally(taskId));

    state = store.getState().tasks;
    expect(state.tasks).toHaveLength(0); 
  });

  // Try deleting a non-existing task
  test('should not delete a task if it does not exist', () => {
    const taskId = uuidv4();  
    store.dispatch(addTaskLocally({ title: 'Test Task', id: taskId }));

    let state = store.getState().tasks;
    expect(state.tasks).toHaveLength(1);

    // Trying to delete a task with a different ID
    store.dispatch(deleteTaskLocally('non-existing-id'));

    state = store.getState().tasks;
    expect(state.tasks).toHaveLength(1); // There should be 1 task left since the ID does not exist
  });
  //
  test('should set filter to "completed"', () => {
    // The default initial filter should be ‘all’
    let state = store.getState().tasks;
    expect(state.filter).toBe('all');  

    // Set the filter to ‘complete’
    store.dispatch(setFilter('completed'));

    state = store.getState().tasks;
    expect(state.filter).toBe('completed'); 
  });
  test('should set filter to "pending"', () => {
    // Initial filter should be ‘all’ by default
    let state = store.getState().tasks;
    expect(state.filter).toBe('all');  

    // Set the filter to "pending"
    store.dispatch(setFilter('pending'));

    state = store.getState().tasks;
    expect(state.filter).toBe('pending');  
  });
  test('should set filter to "all"', () => {
    // Set filter to "completed"
    store.dispatch(setFilter('completed'));

    let state = store.getState().tasks;
    expect(state.filter).toBe('completed');  
    // Changing the filter to "all"
    store.dispatch(setFilter('all'));

    state = store.getState().tasks;
    expect(state.filter).toBe('all');  
  });
  //
  test('should toggle task completed state from false to true', () => {
    const newTask = { title: 'Test Task' };
    store.dispatch(addTaskLocally(newTask));
  
    let state = store.getState().tasks;
    const taskId = state.tasks[0].id;

    expect(state.tasks[0].completed).toBe(false);
  
    store.dispatch(toggleCompleted(taskId));
  
    state = store.getState().tasks;
    expect(state.tasks[0].completed).toBe(true); //  Task completed
  
    // Switching back
    store.dispatch(toggleCompleted(taskId));
  
    state = store.getState().tasks;
    expect(state.tasks[0].completed).toBe(false); // The task is not completed again
  });
  
  test('should toggle task pending state from false to true', () => {
    const newTask = { title: 'Test Task' };
    store.dispatch(addTaskLocally(newTask));
  
    let state = store.getState().tasks;
    const taskId = state.tasks[0].id;
  

    expect(state.tasks[0].pending).toBe(false);
  
    
    store.dispatch(togglePending(taskId));
  
    state = store.getState().tasks;
    expect(state.tasks[0].pending).toBe(true); // Task is pending
  
    // Switching back
    store.dispatch(togglePending(taskId));
  
    state = store.getState().tasks;
    expect(state.tasks[0].pending).toBe(false); // The task has not been pending again
  });
  


});
