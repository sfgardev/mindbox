import { AddTodoForm } from '@/features/add-todo-form'
import { TodoList } from '@/features/todo-list'
import { useState } from 'react'
import { TodoModel } from '@/entities/todo/model'

type Props = {}

export const Todos = (props: Props) => {
  const [todos, setTodos] = useState<TodoModel[]>([])

  return (
    <div className="w-1/3 mx-auto p-8 flex flex-col gap-8 rounded-xl border bg-card text-card-foreground shadow">
      <AddTodoForm />
      <TodoList todos={todos} />
    </div>
  )
}
