import React, { Props, Component, SVGProps } from 'react'

export type ColorSelectionOptions = {
  signal?: AbortSignal
}

export type ColorSelectionResult = {
  sRGBHex: string
}

type EyeDropperHooks = {
  close: () => void
  open: (options?: ColorSelectionOptions) => Promise<ColorSelectionResult>
  isSupported: () => boolean
}

function useEyeDropper(): EyeDropperHooks

export default useEyeDropper
