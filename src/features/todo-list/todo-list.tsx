import { TodoItem } from '@/features/todo-list/todo-item.tsx'
import { TodoModel } from '@/entities/todo/model'

type Props = {
  todos: TodoModel[]
}

export const TodoList = (props: Props) => {
  return (
    <ul>
      <TodoItem />
      <TodoItem />
      <TodoItem />
    </ul>
  )
}
