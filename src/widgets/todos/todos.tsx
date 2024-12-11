import { AddTodoForm } from '@/features/add-todo-form'
import { TodoList } from '@/features/todo-list'
import { useState } from 'react'
import { TodoModel } from '@/entities/todo/model'

export const Todos = () => {
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

  return (
    <div className="w-1/3 mx-auto p-8 flex flex-col gap-8 rounded-xl border bg-card text-card-foreground shadow">
      <AddTodoForm onAddTodo={addTodo} />
      <TodoList todos={todos} onToggleTodo={toggleTodoStatus} onDeleteTodo={deleteTodo} />
    </div>
  )
}
