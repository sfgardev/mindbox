import { createContext, PropsWithChildren, useContext, useState } from 'react'
import { TodoModel } from '@/entities/todo/model'
import { TodosFilterModel } from '@/entities/todo/model/todos-filter-model.ts'

type TodosContextValue = {
  todos: TodoModel[]
  todosFilter: TodosFilterModel
  addTodo: (title: string) => void
  toggleTodoStatus: (todoId: string) => void
  deleteTodo: (todoId: string) => void
  changeTodosFilter: (filter: TodosFilterModel) => void
  clearCompletedTodos: () => void
}

const TodosContext = createContext<TodosContextValue | null>(null)

export const TodosProvider = ({ children }: PropsWithChildren) => {
  const [todos, setTodos] = useState<TodoModel[]>(() => {
    const localStorageTodos = localStorage.getItem('todos')
    return localStorageTodos ? JSON.parse(localStorageTodos) : []
  })

  const [todosFilter, setTodosFilter] = useState<TodosFilterModel>(() => {
    const localStorageFilter = localStorage.getItem('filter')
    return localStorageFilter ? JSON.parse(localStorageFilter) : 'all'
  })

  const addTodo = (title: string) => {
    const newTodo: TodoModel = {
      id: crypto.randomUUID(),
      isCompleted: false,
      title,
    }

    setTodos((prevTodos) => {
      const updatedTodos = [...prevTodos, newTodo]
      localStorage.setItem('todos', JSON.stringify(updatedTodos))
      return updatedTodos
    })
  }

  const toggleTodoStatus = (todoId: string) => {
    setTodos((prevTodos) => {
      const updatedTodos = prevTodos.map((todo) =>
        todo.id === todoId ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
      localStorage.setItem('todos', JSON.stringify(updatedTodos))
      return updatedTodos
    })
  }

  const deleteTodo = (todoId: string) => {
    setTodos((prevTodos) => {
      const updatedTodos = prevTodos.filter((todo) => todo.id !== todoId)
      localStorage.setItem('todos', JSON.stringify(updatedTodos))
      return updatedTodos
    })
  }

  const changeTodosFilter = (filter: TodosFilterModel) => {
    setTodosFilter(filter)
    localStorage.setItem('filter', JSON.stringify(filter))
  }

  const clearCompletedTodos = () => {
    setTodos((prevState) => {
      const updatedTodos = prevState.filter((todo) => !todo.isCompleted)
      localStorage.setItem('todos', JSON.stringify(updatedTodos))
      return updatedTodos
    })
  }

  const filterTodos = () => {
    const dict: Record<TodosFilterModel, TodoModel[]> = {
      all: todos,
      completed: todos.filter((todo) => todo.isCompleted),
      'not completed': todos.filter((todo) => !todo.isCompleted),
    }

    return dict[todosFilter]
  }

  const contextValue = {
    todos: filterTodos(),
    todosFilter,
    addTodo,
    toggleTodoStatus,
    deleteTodo,
    changeTodosFilter,
    clearCompletedTodos,
  }

  return <TodosContext.Provider value={contextValue}>{children}</TodosContext.Provider>
}

export const useTodosContext = () => {
  const context = useContext(TodosContext)

  if (!context) throw new Error('You are using useTodosContext outside TodosProvider')

  return context
}
