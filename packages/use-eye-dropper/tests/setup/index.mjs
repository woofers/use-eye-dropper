import '@testing-library/jest-dom/vitest'
import { TextEncoder, TextDecoder, format } from 'util'

/* Replaces built-in functions */
const replace = (obj, key, func) => {
  const original = obj[key]
  const wrapper = (...args) => func(args, original)
  const reset = () => {
    obj[key] = original
  }
  obj[key] = wrapper
  return reset
}

/* Throw error on console.error. Useful for React render errors */
replace(console, 'error', ([message, ...args], error) => {
  error.apply(message, args)
  const formatted = format(message, ...args)
  throw message instanceof Error ? formatted : new Error(formatted)
})

/* Set up text encoder/decode for jsdom */
global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder

