import { useState, useEffect, useCallback } from 'react'

const getDate = days => {
  const date = new Date()
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
  return date
}

const getCookie = name => {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop().split(';').shift()
  return ''
}

const setCookie = (name, value, days = 365 * 2) => {
  if (typeof document === 'undefined') return
  const expires = days ? '; expires=' + getDate(days).toUTCString() : ''
  document.cookie =
    name + '=' + (value || '') + expires + '; path=/; SameSite=Strict; Secure'
}

const getItem = key => {
  if (typeof document === 'undefined') return undefined
  try {
    const item = getCookie(key)
    const value = item ? JSON.parse(item) : undefined
    return value
  } catch (error) {
    // fall-through
  }
  return undefined
}

const useCookie = (key, initialValue) => {
  const [mounted, setMounted] = useState(false)
  const [storedValue, setStoredValue] = useState(() => {
    const item = getItem(key)
    return typeof item !== 'undefined' ? item : initialValue
  })
  const setValue = useCallback(
    value => {
      try {
        setStoredValue(value)
        if (typeof document !== 'undefined') {
          setCookie(key, JSON.stringify(value))
        }
      } catch (error) {
        // fall-through
      }
    },
    [key]
  )
  useEffect(() => {
    setMounted(true)
  }, [key])
  return [mounted ? storedValue : initialValue, setValue]
}

export default useCookie
