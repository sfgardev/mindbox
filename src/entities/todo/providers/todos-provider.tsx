import { createContext, PropsWithChildren, useContext } from 'react'
import { TodoModel } from '@/entities/todo/model'
import { TodosFilterModel } from '@/entities/todo/model/todos-filter-model.ts'
import { useLocalStorage } from '@/shared/hooks'

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
  const [todos, setTodos] = useLocalStorage<TodoModel[]>('todos', [])
  const [todosFilter, setTodosFilter] = useLocalStorage<TodosFilterModel>('filter', 'all')

  const addTodo = (title: string) => {
    const newTodo: TodoModel = {
      id: crypto.randomUUID(),
      isCompleted: false,
      title,
    }

    setTodos((prevTodos) => [...prevTodos, newTodo])
  }

  const toggleTodoStatus = (todoId: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === todoId ? { ...todo, isCompleted: !todo.isCompleted } : todo))
    )
  }

  const deleteTodo = (todoId: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== todoId))
  }

  const changeTodosFilter = (filter: TodosFilterModel) => {
    setTodosFilter(filter)
    localStorage.setItem('filter', JSON.stringify(filter))
  }

  const clearCompletedTodos = () => {
    setTodos((prevTodos) => prevTodos.filter((todo) => !todo.isCompleted))
  }

  const filterTodos = () => {
    switch (todosFilter) {
      case 'completed':
        return todos.filter((todo) => todo.isCompleted)
      case 'not completed':
        return todos.filter((todo) => !todo.isCompleted)
      default:
        return todos
    }
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
