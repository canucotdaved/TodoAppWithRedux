import React, { useRef, useState } from "react";
import { todoItem } from "./types";
import { motion, AnimatePresence } from "framer-motion";
import { BsCheckCircle } from "react-icons/bs/";
import { BiEdit } from "react-icons/bi";
import { AiOutlineCloseCircle } from "react-icons/ai";

const TodoItem: React.FC<todoItem> = ({
  id,
  item,
  completed,
  completeTodo,
  removeTodo,
  updateTodos,
}) => {
  console.log("🚀 ~ file: index.tsx ~ line 15 ~ item", item);
  const inputRef = useRef<any>(null);
  const [isDisabled, setDisable] = useState<boolean>(true);

  const changeFocus = () => {
    setDisable(!isDisabled);
    inputRef.current.focus();
    console.log(isDisabled);
  };

  const update = (id: any, value: any, e: any) => {
    if (e.which === 13) {
      updateTodos({ id, title: value });
      setDisable(isDisabled);
    }
  };
  const listitem = {
    hidden: { opacity: 0, x: 300 },
    show: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", ease: "easeOut" },
    },
  };

  return (
    <motion.li
      className="mb-2 last:mb-0 bg-white rounded p-5 flex md:flex-row md:justify-between group"
      variants={listitem}
      whileHover={{ scale: 1.05, cursor: "grabbing" }}
      key={id}
      exit={{ x: "-60vw", opacity: 0, transition: { ease: "easeOut" } }}
    >
      <input
        type="text"
        ref={inputRef}
        disabled={isDisabled}
        defaultValue={item}
        onKeyPress={(e) => update(id, inputRef.current.value, e)}
      />
      <span className="hidden group-hover:flex md:flex-row hover:cursor-pointer">
        <button onClick={() => changeFocus()}>
          <BiEdit className="hover:text-blue-700 hover:scale-1.2" />
        </button>
        {!completed && (
          <button onClick={() => completeTodo(id)}>
            <BsCheckCircle className="mx-3 hover:text-emerald-700 hover:scale-2" />
          </button>
        )}
        <button onClick={() => removeTodo(id)}>
          <AiOutlineCloseCircle className="hover:text-red-700 hover:scale-2" />
        </button>
      </span>
      {completed && <span className="text-green-700 font-Poppins">DONE </span>}
    </motion.li>
  );
};

export default TodoItem;
