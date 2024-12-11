import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { TodosProvider } from '@/entities/todo/providers'
import { ThemeProvider } from '@/shared/providers'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <TodosProvider>
        <App />
      </TodosProvider>
    </ThemeProvider>
  </StrictMode>
)
