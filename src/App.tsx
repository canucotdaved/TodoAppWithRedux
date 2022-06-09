import React, { useState } from "react";
import "./App.css";
import { motion } from "framer-motion";
import { connect } from "react-redux";
import { addTodos } from "./redux/todosSlice";
import TodoView from "./components/TodoView";

const mapStateProps = (state: any) => {
  return {
    todos: state,
  };
};

const mapDispatchProps = (dispatch: any) => {
  return {
    addTodos: (obj: any) => dispatch(addTodos(obj)),
  };
};

const variant = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { delayChildren: 0.3, staggerChildren: 0.4 },
  },
};

function App(props: any) {
  const [todo, setTodo] = useState("");

  const add = () => {
    if (todo === "") {
      alert("Input is required");
    } else {
      props.addTodos({
        id: Math.floor(Math.random() * 1000),
        title: todo,
        completed: false,
      });
      setTodo("");
    }
  };

  const handleChange = (e: any) => {
    setTodo(e.target.value);
  };

  return (
    <>
      <section className="w-ful bg-sky-700 h-screen">
        <div className="max-w-[1600px] mx-auto p-5 ">
          <h1 className="font-Poppins text-3xl text-center text-white font-bold">
            Wassup
          </h1>
          <div className="flex justify-center w-full my-10">
            <input
              type="text"
              className="rounded p-2"
              placeholder="Add task"
              value={todo}
              onChange={(e: any) => handleChange(e)}
            />
            <button
              onClick={() => add()}
              className="ml-1 border p-2 rounded text-white hover:text-black hover:bg-white hover:border-black"
            >
              Submit
            </button>
          </div>
          <motion.ul
            className=" w-1/2 mx-auto"
            initial="hidden"
            variants={variant}
            animate="show"
          >
            <TodoView />
          </motion.ul>
        </div>
      </section>
    </>
  );
}

export default connect(mapStateProps, mapDispatchProps)(App);
