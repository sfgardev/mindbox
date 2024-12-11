import { AddTodoForm } from '@/features/add-todo-form'
import { TodoList } from '@/features/todo-list'
import { TodosFooter } from '@/features/todos-footer'

export const Todos = () => {
  return (
    <div className="w-1/3 mx-auto p-8 flex flex-col gap-8 rounded-xl border bg-card text-card-foreground shadow">
      <AddTodoForm />
      <TodoList />
      <TodosFooter />
    </div>
  )
}
