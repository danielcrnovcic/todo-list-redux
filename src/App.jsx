import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TodosPage from './views/TodosPage.jsx';
import LoginPage from './views/LoginPage.jsx';
import AddTodoPage from './views/AddTodoPage.jsx';
import { selectUsers } from './store/usersSlice.js';
import { useSelector } from 'react-redux';

function App() {
  const user = useSelector(selectUsers);

  return (
    <>
      {user.currentUser ? (
        <BrowserRouter>
          <Routes>
            <Route index element={<TodosPage />} />
            <Route path="add-todo" element={<AddTodoPage />} />
          </Routes>
        </BrowserRouter>
      ) : (
        <LoginPage />
      )}
    </>
  );
}

export default App;
