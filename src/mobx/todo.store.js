import { makeAutoObservable } from "mobx";

class TodoList {
  todos = [];
  constructor() {
    makeAutoObservable(this);
  }

  addTodo(todo) {
    this.todos.push(todo);
  }

  editTodoObj(todoObj) {
    this.todos = this.todos.map((todo) => {
      console.log(todoObj.id);
      return todo.id === todoObj.id
        ? { ...todo, ...todoObj }
        : todo;
    });
  }

  removeTodo(todoId){
    this.todos = this.todos.filter((todo)=> todo.id !== todoId)
  }

  isDoneTodo(todoId){
    this.todos = this.todos.map((todo)=> todo.id === todoId ? {...todo, isDone: !todo.isDone} : todo)
  }
}

export const todoStore = new TodoList();
