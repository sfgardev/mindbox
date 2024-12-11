import { AddTodoForm } from '@/features/add-todo-form'
import { TodoList } from '@/features/todo-list'
import { TodosFooter } from '@/features/todos-footer'
import { ToggleTheme } from '@/features/toggle-theme'

export const Todos = () => {
  return (
    <div className="max-w-xl mx-auto p-8 flex flex-col gap-8 rounded-xl border bg-card text-card-foreground shadow">
      <ToggleTheme className="self-end" />
      <AddTodoForm />
      <TodoList />
      <TodosFooter />
    </div>
  )
}
