import { TodosFilter } from '@/features/todos-footer/todos-filter.tsx'
import { useTodosContext } from '@/entities/todo/providers'

export const TodosFooter = () => {
  const { todosFilter, todos, changeTodosFilter, clearCompletedTodos } = useTodosContext()

  const notCompletedTodosCount = todos.filter((todo) => !todo.isCompleted).length

  return (
    <footer className="flex justify-between flex-col items-center gap-2 sm:flex-row">
      <div>{notCompletedTodosCount} items left</div>
      <TodosFilter todosFilter={todosFilter} onChangeTodosFilter={changeTodosFilter} />
      <button onClick={clearCompletedTodos}>Clear completed</button>
    </footer>
  )
}
