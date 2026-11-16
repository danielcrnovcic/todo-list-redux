import Todo from './Todo.jsx';

function TodoList({ todos }) {
  return (
    <>
      <div className="todos">
        {todos.length ? todos.map(todo =>
          <Todo
            todo={todo}
            key={todo.id}
          />
        ) : 'No to-dos to be shown. Try clearing the filter or add a new to-do.'
        }
      </div>
    </>
  );
}

export default TodoList;
