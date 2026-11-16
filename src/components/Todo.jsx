import './Todo.css';
import { useDispatch } from 'react-redux';
import { eraseTodo, toggleDone } from '../store/todosSlice.js';

function Todo({ todo }) {
  const dispatch = useDispatch();

  return (
    <>
      <div className={`todo ${todo.isDone ? 'done' : ''}`}>
        <button
          onClick={() => dispatch(eraseTodo(todo.id))}
          className="erase">
          x erase
        </button>

        <h3>
          {todo.title}
        </h3>
        <p>
          {todo.description}
        </p>
        <div className="task-check">
          <input
            id={`check-${todo.id}`}
            onChange={() => dispatch(toggleDone({ id: todo.id, isDone: todo.isDone }))}
            type="checkbox"
            checked={!!todo.isDone}
          />

          <label htmlFor={`check-${todo.id}`}>
            {!todo.isDone ? 'To-Do' : 'Done'}
          </label>
        </div>
      </div>
    </>
  );
}

export default Todo;
