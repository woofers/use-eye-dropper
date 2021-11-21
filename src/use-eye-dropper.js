
const isSupported = () => typeof window !== 'undefined' || 'EyeDropper' in window

const noop = () => {}

const createInstance = isSupported() ? new EyeDropper() : {}

const bindFunc = (key, instance) => {
  if (!isSupported()) return noop
  return EyeDropper.prototype[key].bind(instance)
}

const useHelpers = () => {
  const dropper = new EyeDropper()
  const open = bindFunc('open', eyeDropper)
  return { open, isSupported }
}

export const useEyeDropper = () => {
  const { open, isSupported } = useHelpers()
  return { open, isSupported }
}
