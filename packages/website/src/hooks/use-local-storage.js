import { useState, useEffect, useCallback } from 'react'

const getItem = (key) => {
  if (typeof document === 'undefined') return undefined
  try {
    const item = window.localStorage.getItem(key)
    const value = item ? JSON.parse(item) : undefined
    return value
  } catch (error) {
    // fall-through
  }
  return undefined
}

const useLocalStorage = (key, initialValue) => {
  const [mounted, setMounted] = useState(false)
  const [storedValue, setStoredValue] = useState(() => {
    const item = getItem(key)
    return typeof item !== 'undefined' ? item : initialValue
  })
  const setValue = useCallback((value) => {
    try {
      setStoredValue(value)
      if (typeof document !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(value))
      }
    } catch (error) {
      // fall-through
    }
  }, [])
  useEffect(() => {
    setMounted(true)
  }, [key])
  return [mounted ? storedValue : initialValue, setValue]
}

export default useLocalStorage
