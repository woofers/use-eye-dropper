import chroma from 'chroma-js'

export const scale = (color, steps = 31) =>
  chroma.scale(['#fff', color, '#000']).mode('lch').colors(steps)

const getDir = colors => {
  const steps = colors.length
  const end = steps - 1
  const mid = (steps - 1) / 2
  const color = colors[mid]
  const light = colors[1]
  const dark = colors[end - 1]
  const lightContrast = chroma.contrast(color, light)
  const darkContrast = chroma.contrast(color, dark)
  return [
    lightContrast < darkContrast ? 1 : -1,
    Math.min(lightContrast, darkContrast)
  ]
}

const steps = 31
const primary = 7
const highContrast = 1

export const getAccent = colors => {
  const [dir, constrast] = getDir(colors)
  const boundary = dir > 0 ? colors.length - 1 : 0
  const offset = -1 * primary * dir
  return colors[boundary + offset]
}

export const getBackground = colors => {
  const [dir, contrast] = getDir(colors)
  const boundary = dir < 0 ? colors.length - 1 : 0
  const offset = 7 * dir
  const isBad = contrast < 1.75
  if (isBad) {
    const contrastBoundary = dir > 0 ? colors.length - 1 : 0
    const contrastOffset = -1 * highContrast * dir
    return [colors[contrastOffset + contrastBoundary], false]
  }
  return [colors[boundary + offset], true]
}

export const contrast = (a, b) => chroma.contrast(a, b)

export const toHex = color => chroma(color).hex()

export const alpha = (color, a) => chroma(color).alpha(a)
