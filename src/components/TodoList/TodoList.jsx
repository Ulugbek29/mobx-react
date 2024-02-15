import React,{ useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { observer } from "mobx-react";
import { todoStore } from "../../mobx/todo.store";
import EditTodo from "./EditTodo";

const TodoList = observer(() => {
  const [state, setState] = useState("");
  const [todoId, setTodoId] = useState(null);
  const [editState, setEditState] = useState("");

  const todoData = todoStore.todos?.find((el, index) => el.id == todoId);

  useEffect(() => {
    if (todoData) return setEditState(todoData?.todo);
  }, [todoId]);

  const onSubmit = (e) => {
    e.preventDefault();
        if(state==="") return
    
      const data = {
        id: todoStore.todos.length + 1,
        todo: state,
        isDone: false
      };
      todoStore.addTodo(data);
      setState("")
  };

  const editSubmit = () => {
    const data = {
      ...todoData,
      todo: editState,
    };
    todoStore.editTodoObj(data);
    setTodoId(null);
}


  return (
    <div className="p-4 border-2 flex flex-col items-center gap-4">
      <h2 className="text-blue-500 text-lg font-semibold">TodoList</h2>
      <form onSubmit={onSubmit} className="flex gap-4">
        <input
          name="inputField"
          className="border-2 py-2 px-4 rounded-lg"
          placeholder="Add todo..."
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
        <Button type="submit" variant="contained">
          Add
        </Button>
      </form>
      <div className="w-full mt-4 flex flex-col gap-4">
        {todoStore.todos?.map((t, index) => {
          return (
            <>
              {todoId === t.id ? (
                <EditTodo
                  editSubmit={editSubmit}
                  editState={editState}
                  setEditState={setEditState}
                  setTodoId={setTodoId}
                />
              ) : (
                <div className="w-full flex gap-2 justify-between">
                  <p
                    onDoubleClick={() => todoStore.isDoneTodo(t.id)}
                    className={`${
                      t.isDone && "line-through"
                    } flex-1 text-lg select-none  cursor-pointer py-2 px-4`}
                  >
                    {t?.todo}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="contained"
                      color="warning"
                      onClick={() => setTodoId(t?.id)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => todoStore.removeTodo(t?.id)}
                    >
                      delete
                    </Button>
                  </div>
                </div>
              )}
            </>
          );
        })}
      </div>
    </div>
  );
});

export default TodoList;
