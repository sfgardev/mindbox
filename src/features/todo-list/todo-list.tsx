import { TodoItem } from '@/features/todo-list/todo-item.tsx'
import { TodoModel } from '@/entities/todo/model'

type Props = {
  todos: TodoModel[]
  onToggleTodo: (id: string) => void
  onDeleteTodo: (id: string) => void
}

export const TodoList = ({ todos, onToggleTodo, onDeleteTodo }: Props) => {
  if (todos.length === 0) return <h2 className="text-2xl text-center font-medium">No todos yet...</h2>

  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          id={todo.id}
          title={todo.title}
          isCompleted={todo.isCompleted}
          onDeleteTodo={onDeleteTodo}
          onToggleTodo={onToggleTodo}
        />
      ))}
    </ul>
  )
}
