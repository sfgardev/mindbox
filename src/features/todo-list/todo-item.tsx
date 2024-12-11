import { Checkbox } from '@/shared/ui/checkbox'
import { TodoModel } from '@/entities/todo/model'
import { Trash2 } from 'lucide-react'
import { cn } from '@/shared/lib'

type Props = {
  onToggleTodo: (id: string) => void
  onDeleteTodo: (id: string) => void
} & TodoModel

export const TodoItem = ({ id, title, isCompleted, onToggleTodo, onDeleteTodo }: Props) => {
  const handleDeleteTodo = () => {
    onDeleteTodo(id)
  }

  const handleToggleTodo = () => {
    onToggleTodo(id)
  }

  return (
    <li className="flex items-center gap-2 border-b p-2">
      <Checkbox checked={isCompleted} className="size-5" onCheckedChange={handleToggleTodo} />
      <span className={cn('font-medium text-xl', { 'line-through opacity-50': isCompleted })}>{title}</span>
      <Trash2
        className="ml-auto cursor-pointer text-destructive transition-colors hover:text-destructive/70"
        onClick={handleDeleteTodo}
      />
    </li>
  )
}
