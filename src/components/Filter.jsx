import './Filter.css';
import { useSelector, useDispatch } from 'react-redux';
import { selectTodos, setFilterBy } from '../store/todosSlice.js';

function Filter() {
  const dispatch = useDispatch();
  const { filterBy } = useSelector(selectTodos);

  return (
    <>
      <div className="filters">
        <div>
          <p>Filter by state</p>
          <div className="badges">
            <div
              className={`badge ${filterBy === 'todo' ? 'selected' : ''}`}
              onClick={() => dispatch(setFilterBy('todo'))}>
              To-Do
            </div>
            <div
              className={`badge ${filterBy === 'done' ? 'selected' : ''}`}
              onClick={() => dispatch(setFilterBy('done'))}>
              Done
            </div>
            {
              filterBy &&
              <span onClick={() => dispatch(setFilterBy(''))} className="clear">
                x clear
              </span>
            }
          </div>
        </div>
      </div>
    </>
  );
}

export default Filter;
