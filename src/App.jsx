import React, { Suspense, lazy } from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
import LoadingSpinner from './components/LoadingSpinner';



const TasksList = lazy(() => import('./components/TaskList'));
const TaskForm = lazy(() => import('./components/TaskForm'));
const TaskSuggestions = lazy(() => import('./components/TaskSuggestions'))

const App = () => (
  <Provider store={store}>
    <Suspense fallback={<LoadingSpinner />}>
      <div className="container mx-auto my-16">
        <h1 className="text-center text-4xl font-bold">
            Your Task Manager
        </h1>
        <TaskForm />
        <TasksList />
        <TaskSuggestions />
      </div>
    </Suspense>
  </Provider>
);

export default App;
