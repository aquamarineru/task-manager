# 📝 Task Manager

A powerful and flexible task management application that supports adding, updating, deleting, and organizing tasks. The app also features a task suggestion system, drag-and-drop reordering, search and filter capabilities, and more.


## 🌟 Features

- ✅ Add, Edit, and Delete Tasks: Create, update, or delete tasks easily.
🔍 Search & Filter: Filter tasks by status (completed, pending) and search by title.
- 🖱️ Drag-and-Drop Reordering: Drag-and-drop to reorder tasks.
- 📋 Task Suggestions: Fetch tasks from an external API with shuffle and load more options.
- 💾 Persistent Storage: Save tasks in localStorage for data persistence.
- 📱 Responsive Design: Fully responsive for desktop and mobile.

## 🚀 Technologies Used

- **React** with react-beautiful-dnd for drag-and-drop functionality.
Redux Toolkit for state management.
- **Axios** for API requests.
- **Tailwind CSS** for styling.
- **Performance optimizations** using React.memo, useMemo, and useCallback.

## 🛠️ Getting Started

### Prerequisites
[Node.js](https://nodejs.org/en) (v14 or higher)

[npm](https://www.npmjs.com/)

### Installation

````
# Clone the repository
git clone https://github.com/aquamarineru/task-manager.git
cd task-manager

# Install dependencies
npm install

# Run the development server
npm run dev

````
Visit the app at http://localhost:5173/

## 📋 Usage
### Adding a Task
1. Type a task in the input field.
2. Click the "Add Task" button.
### Editing a Task
1. Click the ✏️ button next to the task.
2. Modify the title and click "Update Task".
### Deleting a Task
1. Click the 🗑️ button to delete a task.
### Task Status Management
1. Click the task title to toggle between completed and pending.
2. Click 🟢 to mark as pending or Stop to end pending status.
## Drag-and-Drop Reordering
1. Drag and drop tasks to reorder them.
2. The new order is saved automatically.

## 🌐 Task Suggestions
- Fetches tasks from an API: https://jsonplaceholder.typicode.com/todos.
- Click **"Load More"** for additional tasks.
- Use the **"Shuffle Tasks"** button to randomize tasks.

## ✅ Testing

Run tests:
````
npx jest 
````
