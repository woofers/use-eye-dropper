
class DOMException extends Error {
  constructor(message) {
    super(message)
    this.name = 'DOMException'
  }
}

const cancelSelection = () => {
  return new DOMException('The user canceled the selection.')
}
const abortSignal = () => {
  return new DOMException("Failed to execute 'open' on 'EyeDropper': Color selection aborted.")
}
const abortSignalDuring = () => {
  return new DOMException('Color selection aborted.')
}

class EyeDropper {
  constructor() {

  }
  open(options) {
    return new Promise((resolve, reject) => {
      const signal = options?.signal
      const onAbortDuring = () => {
        clearTimeout(resolveTimeout)
        reject(abortSignalDuring())
      }
      if (signal) {
        if (signal.aborted) {
          reject(abortSignal())
          return
        }
        signal.addEventListener('abort', onAbortDuring)
      }
      const resolveTimeout = setTimeout(() => {
        if (signal) signal.removeEventListener('abort', onAbortDuring)
        resolve({ sRGBHex: 'rgba(255, 255, 255, 0)' })
      }, 300)
    })
  }
}

export default EyeDropper
