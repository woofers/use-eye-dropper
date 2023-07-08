type ColorSelectionOptions = {
  signal?: AbortSignal
}

type ColorSelectionResult = {
  sRGBHex: string
}

declare namespace useEyeDropper {
  export { ColorSelectionOptions, ColorSelectionResult }
}

type EyeDropperHooks = {
  close: () => void
  open: (options?: ColorSelectionOptions) => Promise<ColorSelectionResult>
  isSupported: () => boolean
}

declare function useEyeDropper(): EyeDropperHooks

export = useEyeDropper