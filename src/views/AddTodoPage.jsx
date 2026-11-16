import Header from '../components/Header.jsx';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addTodo } from '../store/todosSlice.js';

function AddTodoPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleAddTodo(e) {
    e.preventDefault();
    const newTodo = {
      title: document.querySelector('input[name=title]').value,
      description: document.querySelector('textarea[name=description]').value,
      isDone: false
    };

    if (newTodo.title) {
      dispatch(addTodo(newTodo)).then((response) => {
        if (response.error) {
          alert('An error occurred!');
        } else {
          alert('Todo created successfully!');
          navigate("/");
        }
      });
    } else {
      alert('Please fill the mandatory fields.');
    }
  }

  const pageTitle = "Add Todo";

  return (
    <>
      <div className="container">
        <Header pageTitle={pageTitle} />
        <form className="add-form">
          <div className="form-control">
            <label>Title *</label>
            <input type="text" name="title" placeholder="Add Todo Title" />
          </div>
          <div className="form-control">
            <label>Description</label>
            <textarea name="description" placeholder="Add a description..." />
          </div>

          <button onClick={(e) => handleAddTodo(e)} className="btn btn-block">Save Todo</button>
        </form>
      </div>
    </>
  );
}

export default AddTodoPage;
