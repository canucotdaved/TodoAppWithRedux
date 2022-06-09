import { createSlice } from "@reduxjs/toolkit";

interface PropType {
  id: number;
  title: String;
  complete: boolean;
}

const initialState: PropType[] = [];

const addTodoReducer = createSlice({
  name: "Todos",
  initialState,

  reducers: {
    addTodos: (state, action) => {
      state.push(action.payload);
      return state;
    },
    removeTodos: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    },
    updateTodos: (state, action) => {
      return state.map((todo) => {
        if (todo.id === action.payload.id) {
          return {
            ...todo,
            title: action.payload.item,
          };
        }
        return todo;
      });
    },
    completeTodo: (state, action) => {
      return state.map((todo) => {
        if (todo.id === action.payload) {
          return {
            ...todo,
            completed: true,
          };
        }
        return todo;
      });
    },
  },
});

export const { addTodos, removeTodos, updateTodos, completeTodo } =
  addTodoReducer.actions;
export const reducer = addTodoReducer.reducer;
