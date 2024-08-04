const bindFunc =
  key =>
  (...args) => {
    if (typeof window !== 'undefined') {
      if (window.ued) {
        return window.ued[key](...args)
      }
    }
  }

export const scale = bindFunc('scale')

export const getAccent = bindFunc('getAccent')

export const getBackground = bindFunc('getBackground')

export const contrast = bindFunc('contrast')

export const toHex = bindFunc('toHex')

export const alpha = bindFunc('alpha')
