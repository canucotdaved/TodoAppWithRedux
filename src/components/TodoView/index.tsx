import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { connect } from "react-redux";
import {
  addTodos,
  removeTodos,
  updateTodos,
  completeTodo,
} from "../../redux/todosSlice";
import TodoItem from "../todoItem";

const mapStateProps = (state: any) => {
  return {
    Todos: state,
  };
};

const mapDispatchProps = (dispatch: Function) => {
  return {
    addTodo: (obj: any) => dispatch(addTodos(obj)),
    removeTodo: (id: any) => dispatch(removeTodos(id)),
    updateTodo: (obj: any) => dispatch(updateTodos(obj)),
    completeTodos: (id: any) => dispatch(completeTodo(id)),
  };
};

const TodoView = (props: any) => {
  const [sort, setSort] = useState("Active");
  return (
    <>
      <div className="flex justify-around mb-4">
        <button
          className="p-3 bg-white rounded font-Poppins"
          onClick={() => setSort("All")}
        >
          All
        </button>
        <button
          className="p-3 bg-blue-300 rounded font-Poppins"
          onClick={() => setSort("Active")}
        >
          Active
        </button>
        <button
          className="p-3 bg-green-300 rounded font-Poppins"
          onClick={() => setSort("Completed")}
        >
          Done
        </button>
      </div>
      <AnimatePresence>
        {props.Todos.length > 0 && sort === "Active"
          ? props.Todos.map(
              (item: any) =>
                !item.completed && (
                  <TodoItem
                    key={item.id}
                    completed={item.completed}
                    id={item.id}
                    item={item.title}
                    completeTodo={props.completeTodos}
                    updateTodos={props.updateTodo}
                    removeTodo={props.removeTodo}
                  />
                )
            )
          : null}
        {props.Todos.length > 0 && sort === "Completed"
          ? props.Todos.map(
              (item: any) =>
                item.completed && (
                  <TodoItem
                    key={item.id}
                    completed={item.completed}
                    id={item.id}
                    item={item.title}
                    completeTodo={props.completeTodos}
                    updateTodos={props.updateTodo}
                    removeTodo={props.removeTodo}
                  />
                )
            )
          : null}
        {props.Todos.length > 0 && sort === "All"
          ? props.Todos.map((item: any) => (
              <TodoItem
                key={item.id}
                completed={item.completed}
                id={item.id}
                item={item.title}
                completeTodo={props.completeTodos}
                updateTodos={props.updateTodo}
                removeTodo={props.removeTodo}
              />
            ))
          : null}
      </AnimatePresence>
    </>
  );
};

export default connect(mapStateProps, mapDispatchProps)(TodoView);
