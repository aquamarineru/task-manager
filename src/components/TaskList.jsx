import React, { useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTaskLocally, toggleCompleted, togglePending, setTaskForEdit, reorderTasks } from '../redux/slices/tasksSlice';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import TaskFilter from './TaskFilter';
import TaskSearch from './TaskSearch';

const TasksList = React.memo(() => {
  const dispatch = useDispatch();
  const { tasks, filter, searchQuery } = useSelector(state => state.tasks);

  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      if (searchQuery && !task.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      if (filter === 'completed' && !task.completed) return false;
      if (filter === 'pending' && !task.pending) return false;
      return true;
    });
  }, [tasks, filter, searchQuery]);

  const handleToggleCompleted = useCallback((id) => {
    dispatch(toggleCompleted(id));
  }, [dispatch]);

  const handleDeleteTask = useCallback((id) => {
    dispatch(deleteTaskLocally(id));
  }, [dispatch]);

  const handleTogglePending = useCallback((id) => {
    dispatch(togglePending(id));
  }, [dispatch]);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const updatedTasks = Array.from(tasks);
    const [reorderedTask] = updatedTasks.splice(result.source.index, 1);
    updatedTasks.splice(result.destination.index, 0, reorderedTask);

    dispatch(reorderTasks(updatedTasks));
  };

  return (
    <div className="w-full md:max-w-3xl mx-auto px-4">
      <TaskSearch />
      <TaskFilter currentFilter={filter} />
      {filteredTasks.length === 0 ? (
        <div className="text-center text-gray mt-4 px-4 py-6 rounded bg-sunsetOrange/20">
          <p>Nothing found</p>
        </div>
      ) : (
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="tasks">
            {(provided) => (
              <ul ref={provided.innerRef} {...provided.droppableProps} className="space-y-4 mt-4">
                {filteredTasks.map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`flex justify-between items-center p-4 bg-white shadow rounded-lg hover:bg-gray-100 ${task.pending ? 'animate-pulse' : ''}`}
                      >
                        <span
                          className={`flex-1 text-lg cursor-pointer ${task.completed ? 'line-through text-gray-500' : 'text-black'}`}
                          onClick={() => handleToggleCompleted(task.id)}
                        >
                          {task.title}
                          {task.pending && <span className="ml-2 animate-spin">🔄</span>}
                        </span>
                        <div className="space-x-2">
                          <button onClick={() => dispatch(setTaskForEdit(task))} className="px-4 py-2">✏️</button>
                          <button onClick={() => handleDeleteTask(task.id)} className="px-4 py-2">🗑️</button>
                          {!task.completed && (
                            <button onClick={() => handleTogglePending(task.id)} className="px-4 py-2">🟢</button>
                          )}
                          {task.pending && (
                            <button onClick={() => handleTogglePending(task.id)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Stop</button>
                          )}
                        </div>
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </div>
  );
});

export default TasksList;
