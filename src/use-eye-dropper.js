import { useCallback, useMemo, useEffect, useRef } from 'react'

// https://github.com/whatwg/fetch/issues/905#issuecomment-491970649
const anySignal = signals => {
  const controller = new AbortController()
  const onAbort = () => {
    controller.abort()
    for (const signal of signals) {
      signal.removeEventListener('abort', onAbort)
    }
  }
  for (const signal of signals) {
    if (signal.aborted) {
      onAbort()
      break
    }
    signal.addEventListener('abort', onAbort)
  }
  return controller.signal
}

const isSupported = () => typeof window !== 'undefined' && 'EyeDropper' in window

const resolveError = () => {
  let error = 'Unsupported browser.'
  if (__isDev__) {
    error = 'Unsupported browser: no EyeDropper in Window. Check https://developer.mozilla.org/en-US/docs/Web/API/EyeDropper_API.'
  }
  return Promise.reject(new Error(error))
}

const createInstance = options => isSupported() ? new EyeDropper(options) : {}

const bindFunc = (key, instance) => {
  if (!isSupported()) return resolveError
  return EyeDropper.prototype[key].bind(instance)
}

const createHelpers = options => {
  const dropper = createInstance(options)
  const open = bindFunc('open', dropper)
  return { open, isSupported }
}

export const useEyeDropper = options => {
  const { open: openPicker, isSupported } = useMemo(() => createHelpers(options), [])
  const controller = useRef()
  const hasController = () => typeof controller.current !== 'undefined'
  const close = useCallback(() => {
    if (!hasController()) return
    controller.current.abort()
  }, [controller])
  const open = useCallback(async (options = {}) => {
    close()
    const { signal, ...rest } = options
    const newController = new AbortController()
    controller.current = newController
    const unionSignal = typeof signal !== 'undefined' ? anySignal([signal, newController.signal]) : newController.signal
    const results = await openPicker({ ...rest, signal: unionSignal })
    return results
  }, [controller])
  useEffect(() => close, [close])
  return { open, close, isSupported }
}
