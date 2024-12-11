import { Moon, Sun } from 'lucide-react'
import { cn } from '@/shared/lib'
import { useThemeContext } from '@/shared/providers'

type Props = {
  className?: string
}

export const ToggleTheme = ({ className }: Props) => {
  const { theme, toggleTheme } = useThemeContext()

  const createIconStyles = (themeMode: string) => {
    return cn('cursor-pointer border border-transparent p-1 box-content rounded', {
      'border-primary': theme === themeMode,
    })
  }

  return (
    <div className={cn('flex items-center justify-center gap-4 ', className)}>
      <Sun className={createIconStyles('light')} onClick={() => toggleTheme('light')} />
      <Moon className={createIconStyles('dark')} onClick={() => toggleTheme('dark')} />
    </div>
  )
}
