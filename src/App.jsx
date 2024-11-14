import Heading from "./components/Heading"
import TaskForm from "./components/TaskForm/TaskForm"
import TasksList from "./components/TaskList/TasksList"
import TaskSuggestions from "./components/TaskSuggestions"
import TaskSearch from "./components/TaskSearch"

function App() {


  return (
    <div className="container py-16 px-6  min-h-screen mx-auto flex justify-center flex-col">
    <Heading />
    <TaskForm />
    <TaskSearch />
    <TasksList />
    <TaskSuggestions />
    </div>
  )
}

export default App
