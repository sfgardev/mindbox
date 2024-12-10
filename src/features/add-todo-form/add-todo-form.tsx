import { Input } from '@/shared/ui/input'
import { Button } from '@/shared/ui/button'
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import { cn } from '@/shared/lib'

type Props = {} & ComponentPropsWithoutRef<'form'>

export const AddTodoForm = forwardRef<ElementRef<'form'>, Props>(({ className, ...props }, ref) => {
  return (
    <form ref={ref} className={cn('flex flex-col gap-4', className)} {...props}>
      <Input />
      <Button>Add todo</Button>
    </form>
  )
})

AddTodoForm.displayName = 'AddTodoForm'
