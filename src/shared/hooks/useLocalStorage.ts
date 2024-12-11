import { useState } from 'react'

export const useLocalStorage = <Value>(key: string, value: Value) => {
  const [state, setState] = useState<Value>(() => {
    const localStorageItem = localStorage.getItem(key)
    return localStorageItem ? JSON.parse(localStorageItem) : value
  })

  const updateState = (newValue: Value | ((prevState: Value) => Value)) => {
    setState((prevState) => {
      const updatedState =
        typeof newValue === 'function' ? (newValue as (prevState: Value) => Value)(prevState) : newValue

      localStorage.setItem(key, JSON.stringify(updatedState))
      return updatedState
    })
  }

  return [state, updateState] as const
}
