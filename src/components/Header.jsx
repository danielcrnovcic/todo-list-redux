import { NavLink } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from '../firebase/config.js';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/usersSlice.js';
import { clearTodos } from '../store/todosSlice.js';

function Header({ pageTitle }) {
  const dispatch = useDispatch();

  function handleSignOut() {
    if (confirm('Are you sure you want to log out?')) {
      signOut(auth).then(() => {
        dispatch(clearTodos());
        dispatch(setUser(null));
      }).catch((error) => {
        console.log(error);
      });
    }
  }

  return (
    <>
      <h1>{pageTitle}</h1>
      <div className="header-btns">
        <NavLink to="/">
          <button className="btn">Todo List</button>
        </NavLink>
        <NavLink to="/add-todo">
          <button className="btn">Add Todo +</button>
        </NavLink>
        <button onClick={handleSignOut} className="btn transparent">
          Logout
        </button>
      </div>
    </>
  );
}

export default Header;
