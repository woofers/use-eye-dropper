import '@testing-library/jest-dom'

class DOMException extends Error {
  constructor(message) {
    super(message)
    this.name = 'DOMException'
  }
}

const cancelSelection = () => {
  throw new DOMException('The user canceled the selection.')
}
const abortSignal = () => {
  throw new DOMException("Failed to execute 'open' on 'EyeDropper': Color selection aborted.")
}
const abortSignalDuring = () => {
  throw new DOMException('Color selection aborted.')
}

class EyeDropper {
  constructor() {

  }
  open(options) {
    return new Promise((resolve, reject) => {
      const signal = options?.signal
      if (signal) {
        const abort = () => reject()
        if (signal.aborted) {
          abortSignal()
          abort()
        }
        addEventListener('abort', () => {
          abortSignalDuring()
          abort()
        })
      }
      setTimeout(() => resolve({ sRGBHex: 'rgba(255, 255, 255, 0)' }), 300)
    })
  }
}

const window = {
  EyeDropper
}
global.window.EyeDropper = EyeDropper
