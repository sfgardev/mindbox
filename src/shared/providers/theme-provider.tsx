import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark' | 'system'

type ThemeContextValue = {
  theme: Theme
  toggleTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [theme, setTheme] = useState<Theme>('system')

  useEffect(() => {
    const root = window.document.documentElement

    root.classList.remove('light', 'dark')

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      setTheme(systemTheme)
      root.classList.add(systemTheme)
      return
    }

    root.classList.add(theme)
  }, [theme])

  const toggleTheme = (theme: Theme) => {
    setTheme(theme)
  }

  const contextValue = { theme, toggleTheme }

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>
}

export const useThemeContext = () => {
  const context = useContext(ThemeContext)

  if (!context) throw new Error('You are using useThemeContext outside ThemeProvider')

  return context
}
