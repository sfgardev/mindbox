import { TodosFilterModel } from '@/entities/todo/model'
import { cn } from '@/shared/lib'

type Props = {
  todosFilter: TodosFilterModel
  onChangeTodosFilter: (filter: TodosFilterModel) => void
}

type Filter = {
  value: TodosFilterModel
  label: string
}

const filters: Filter[] = [
  { value: 'all', label: 'All' },
  { value: 'completed', label: 'Completed' },
  { value: 'not completed', label: 'Not completed' },
]

export const TodosFilter = ({ todosFilter, onChangeTodosFilter }: Props) => {
  return (
    <div className="flex justify-between items-center gap-2">
      {filters.map((filter) => (
        <button
          className={cn('border border-transparent px-2 rounded transition', {
            'border-primary': filter.value === todosFilter,
          })}
          key={filter.value}
          onClick={() => onChangeTodosFilter(filter.value)}
        >
          {filter.value}
        </button>
      ))}
    </div>
  )
}
