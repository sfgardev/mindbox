import { Checkbox } from '@/shared/ui/checkbox'

type Props = {}

export const TodoItem = (props: Props) => {
  return (
    <li className="flex items-center gap-2 border-b p-2">
      <Checkbox className='size-5' /> <span>Practice FSD</span>
    </li>

  )
}
