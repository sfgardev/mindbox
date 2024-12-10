import { ComponentPropsWithoutRef, forwardRef } from 'react'
import { cn } from '@/shared/lib'

type Props = {} & ComponentPropsWithoutRef<'button'>

export const Button = forwardRef<HTMLButtonElement, Props>(({ className, children, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        'bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
})

Button.displayName = 'Button'
