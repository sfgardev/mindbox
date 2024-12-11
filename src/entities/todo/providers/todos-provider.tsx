import { createContext, PropsWithChildren, useContext, useState } from 'react'
import { TodoModel } from '@/entities/todo/model'

type TodosContextValue = {
  todos: TodoModel[]
  addTodo: (title: string) => void
  toggleTodoStatus: (todoId: string) => void
  deleteTodo: (todoId: string) => void
}

const TodosContext = createContext<TodosContextValue | null>(null)

export const TodosProvider = ({ children }: PropsWithChildren) => {
  const [todos, setTodos] = useState<TodoModel[]>(() => {
    const localStorageTodos = localStorage.getItem('todos')
    return localStorageTodos ? JSON.parse(localStorageTodos) : []
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

  const contextValue = {
    todos,
    addTodo,
    toggleTodoStatus,
    deleteTodo,
  }

  return <TodosContext.Provider value={contextValue}>{children}</TodosContext.Provider>
}

export const useTodosContext = () => {
  const context = useContext(TodosContext)

  if (!context) throw new Error('You are using useTodosContext outside TodosProvider')

  return context
}
