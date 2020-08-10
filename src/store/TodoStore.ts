import { decorate, observable, computed } from "mobx";
import { toast } from "react-toastify";


export interface ITodo {
  id: number;
  text: string;
  completed: boolean;
}

export class TodoStore {
  public todos: ITodo[] = [
    { id: 1, text: "todo 1", completed: true },
    { id: 2, text: "todo 2", completed: false },
    { id: 3, text: "todo 3", completed: false }
  ]

  public addTodo = (todo: ITodo) => {
    this.todos.push(todo)
    toast.success('Novo To Do adicionado', {
      position: toast.POSITION.BOTTOM_CENTER
    })
  }

  public toggleCompleted = (id: number) => {
    const updatedTodos = this.todos.map(todo => {
      if (todo.id === id) {
        todo.completed = !todo.completed
        if (todo.completed) {
          toast.success('Novo To Do Finalizado', {
            position: toast.POSITION.BOTTOM_CENTER
          })
        } else {
          toast.error('Novo To do aberto novamente', {
            position: toast.POSITION.BOTTOM_CENTER
          })
        }
      }
      return todo
    })
    this.todos = updatedTodos
  }

  public updateTodo = (updatedTodo : ITodo) => {
    const updatedTodos = this.todos.map(todo => {
      if(todo.id === updatedTodo.id) {
        return { ...updatedTodo}
      }
      return todo
    })
    this.todos = updatedTodos
  }

  public deleteTodo = (id:number) => {
    const updatedTodos = this.todos.filter(todo => todo.id !== id)
    this.todos = updatedTodos
    toast.info('To Do deletato', {
      position: toast.POSITION.BOTTOM_CENTER
    })
  }

  get todoProgress() {
    const completedCount = this.todos.filter(t => t.completed).length
    const totalCount = this.todos.length
    return `${completedCount}/${totalCount}`
  }

  get completedTodos() {
    return this.todos.filter(t => t.completed)
  }

  get incompleteTodos() {
    return this.todos.filter(t => ! t.completed)
  }
}

decorate(TodoStore, {
  todos: observable,
  todoProgress: computed,
  completedTodos: computed,
  incompleteTodos: computed
})