import { ReactNode } from 'react'
import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import { TodoModel } from '@/entities/todo/model'
import { TodosFilterModel } from '@/entities/todo/model/todos-filter-model.ts'
import { TodosProvider, useTodosContext } from '@/entities/todo/providers'

beforeEach(() => {
  localStorage.clear()
})

describe('TodosProvider', () => {
  const wrapper = ({ children }: { children: ReactNode }) => <TodosProvider>{children}</TodosProvider>

  it('should add a new todo', () => {
    const { result } = renderHook(() => useTodosContext(), { wrapper })

    const newTodoTitle = 'Learn Vitest'
    const id = crypto.randomUUID()
    act(() => {
      result.current.addTodo(newTodoTitle, id)
    })

    expect(result.current.todos).toHaveLength(1)
    expect(result.current.todos[0]).toMatchObject<TodoModel>({
      id,
      title: newTodoTitle,
      isCompleted: false,
    })
  })

  it('should toggle todo status', () => {
    const { result } = renderHook(() => useTodosContext(), { wrapper })

    const todoTitle = 'Complete unit tests'
    act(() => {
      result.current.addTodo(todoTitle)
    })

    const todoId = result.current.todos[0].id
    act(() => {
      result.current.toggleTodoStatus(todoId)
    })

    expect(result.current.todos[0].isCompleted).toBe(true)
  })

  it('should delete a todo', () => {
    const { result } = renderHook(() => useTodosContext(), { wrapper })
    console.log('before', result)

    const todoTitle = 'Write documentation'
    act(() => {
      result.current.addTodo(todoTitle)
    })

    const todoId = result.current.todos[0].id
    act(() => {
      result.current.deleteTodo(todoId)
    })
    console.log('after', result)
    expect(result.current.todos).toHaveLength(0)
  })

  it('should clear completed todos', () => {
    const { result } = renderHook(() => useTodosContext(), { wrapper })

    act(() => {
      result.current.addTodo('Task 1')
      result.current.addTodo('Task 2')
    })

    const todoId = result.current.todos[0].id
    act(() => {
      result.current.toggleTodoStatus(todoId)
    })

    act(() => {
      result.current.clearCompletedTodos()
    })

    expect(result.current.todos).toHaveLength(1)
    expect(result.current.todos[0].isCompleted).toBe(false)
  })

  it('should filter todos by status', () => {
    const { result } = renderHook(() => useTodosContext(), { wrapper })

    act(() => {
      result.current.addTodo('Task 1')
      result.current.addTodo('Task 2')
    })

    const todoId = result.current.todos[0].id
    act(() => {
      result.current.toggleTodoStatus(todoId)
    })

    act(() => {
      result.current.changeTodosFilter('completed' as TodosFilterModel)
    })

    expect(result.current.todos).toHaveLength(1)
    expect(result.current.todos[0].isCompleted).toBe(true)

    act(() => {
      result.current.changeTodosFilter('not completed' as TodosFilterModel)
    })

    expect(result.current.todos).toHaveLength(1)
    expect(result.current.todos[0].isCompleted).toBe(false)
  })
})
