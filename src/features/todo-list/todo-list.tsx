import { TodoItem } from '@/features/todo-list/todo-item.tsx'
import { useTodosContext } from '@/entities/todo/providers'

export const TodoList = () => {
  const { todos, deleteTodo, toggleTodoStatus } = useTodosContext()

  if (todos.length === 0) return <h2 className="text-2xl text-center font-medium">No todos yet...</h2>

  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          id={todo.id}
          title={todo.title}
          isCompleted={todo.isCompleted}
          onDeleteTodo={deleteTodo}
          onToggleTodo={toggleTodoStatus}
        />
      ))}
    </ul>
  )
}
