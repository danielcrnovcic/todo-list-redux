import TodoList from '../components/TodoList.jsx';
import Header from '../components/Header.jsx';
import Filter from '../components/Filter.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { selectTodos, fetchTodos } from '../store/todosSlice.js';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

function TodosPage() {
  const dispatch = useDispatch();
  const { todos, status, filterBy } = useSelector(selectTodos);
  const pageTitle = "📝 Todo List with Redux and Firebase";

  useEffect(() => {
    if (status == 'idle') {
      dispatch(fetchTodos());
    }
  }, []);

  const filteredTodos = todos.filter(todo => {
    if (filterBy === 'done') return todo.isDone;
    if (filterBy === 'todo') return !todo.isDone;
    return true;
  });

  return (
    <>
      <div className="container">
        <Header pageTitle={pageTitle} />
        <div className="todos-container">
          {todos.length ? (
            <>
              <Filter />
              <TodoList todos={filteredTodos} />
            </>
          ) : status == 'loading' ? (
            <div>Loading...</div>
          ) : (
            <div>Your todo list is empty. <Link to="/add-todo">Click here</Link> to add a new todo.</div>
          )}
        </div>
      </div>
    </>
  );
}

export default TodosPage;