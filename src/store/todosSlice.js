import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  addDoc
} from "firebase/firestore";
import { db, auth } from '../firebase/config.js';

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const q = query(collection(db, "todos"), where("user_id", "==", auth.currentUser.uid));
  const querySnapshot = await getDocs(q);
  const todoList = [];
  querySnapshot.forEach((d) => {
    todoList.push({ id: d.id, ...d.data() });
  });
  return todoList;
});

export const toggleDone = createAsyncThunk('todos/toggleDone', async (payload) => {
  const todoRef = doc(db, "todos", payload.id);
  await updateDoc(todoRef, {
    isDone: !payload.isDone
  });
  return payload.id;
});

export const eraseTodo = createAsyncThunk('todos/eraseTodo', async (payload) => {
  await deleteDoc(doc(db, "todos", payload));
  return payload;
});

export const addTodo = createAsyncThunk('todos/addTodo', async (payload) => {
  const newTodo = { ...payload, user_id: auth.currentUser.uid };
  const docRef = await addDoc(collection(db, "todos"), newTodo);
  return { ...newTodo, id: docRef.id };
});

export const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: [],
    status: 'idle',
    filterBy: ''          // '' | 'todo' | 'done'
  },
  reducers: {
    clearTodos: (state) => {
      state.todos = [];
      state.status = 'idle';
      state.filterBy = '';  // reset filtera pri odjavi
    },
    setFilterBy: (state, action) => {
      state.filterBy = action.payload;
    }
  },

  extraReducers(builder) {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = 'failed';
        console.log(action.error.message);
      })
      .addCase(toggleDone.fulfilled, (state, action) => {
        state.todos.forEach(todo => {
          if (todo.id == action.payload) {
            todo.isDone = !todo.isDone;
          }
        });
      })
      .addCase(toggleDone.rejected, (state, action) => {
        state.status = 'failed';
        console.log(action.error.message);
      })
      .addCase(eraseTodo.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(eraseTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter(todo => todo.id != action.payload);
        state.status = 'succeeded';
      })
      .addCase(eraseTodo.rejected, (state, action) => {
        state.status = 'failed';
        console.log(action.error.message);
      })
      .addCase(addTodo.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.todos.push(action.payload);
        state.status = 'succeeded';
      })
      .addCase(addTodo.rejected, (state, action) => {
        state.status = 'failed';
        console.log(action.error.message);
      });
  }
});

export const { clearTodos, setFilterBy } = todosSlice.actions;
export const selectTodos = state => state.todos;
export default todosSlice.reducer;
