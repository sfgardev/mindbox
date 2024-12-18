import { ChangeEvent, ComponentPropsWithoutRef, ElementRef, FormEvent, forwardRef, useState } from 'react'
import { Input } from '@/shared/ui/input'
import { Button } from '@/shared/ui/button'
import { cn } from '@/shared/lib'
import { useTodosContext } from '@/entities/todo/providers'

type Props = {} & ComponentPropsWithoutRef<'form'>

export const AddTodoForm = forwardRef<ElementRef<'form'>, Props>(({ className, ...props }, ref) => {
  const [enteredText, setEnteredText] = useState('')
  const { addTodo } = useTodosContext()

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEnteredText(event.target.value)
  }

  const handleAddTodo = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    addTodo(enteredText.trim())
    setEnteredText('')
  }

  return (
    <form ref={ref} className={cn('flex flex-col gap-4', className)} onSubmit={handleAddTodo} {...props}>
      <Input value={enteredText} onChange={handleChange} placeholder='Enter todo...' required />
      <Button>Add todo</Button>
    </form>
  )
})

AddTodoForm.displayName = 'AddTodoForm'
