import Heading from "./components/Heading"
import TaskForm from "./components/TaskForm/TaskForm"
import TasksList from "./components/TaskList/TasksList"
import TaskSuggestions from "./components/TaskSuggestions"

function App() {


  return (
    <div className="container py-16 px-6 min-h-screen mx-auto">
    <Heading />
    <TaskForm />
    <TasksList />
    <TaskSuggestions />
    </div>
  )
}

export default App
