const scale = (color, steps = 31) =>
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

const primary = 7
const highContrast = 1

const getAccent = colors => {
  const [dir] = getDir(colors)
  const boundary = dir > 0 ? colors.length - 1 : 0
  const offset = -1 * primary * dir
  return colors[boundary + offset]
}

const getBackground = colors => {
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

const contrast = (a, b) => chroma.contrast(a, b)

const toHex = color => chroma(color).hex()

const alpha = (color, a) => chroma(color).alpha(a)

const getColorsFromBase = color => {
  const colors = scale(color)
  const [backgroundColor, swap] = getBackground(colors)
  const accent = getAccent(colors)
  const lightText = swap ? color : accent
  const text = !swap ? color : accent
  const colorText = toHex(color)
  const apple =
    contrast('#FFF', backgroundColor) > 1.6 ? 'black-translucent' : 'default'
  return {
    color,
    outline: accent,
    background: backgroundColor,
    background88: alpha(backgroundColor, 0.88),
    background0: alpha(backgroundColor, 0),
    lightText,
    text,
    colorText,
    apple
  }
}

const setPropFromColor = color => {
  const result = getColorsFromBase(color)
  const element = document.body.children?.[0]
  if (element) {
    Object.keys(result).forEach(key => {
      element.style.setProperty(`--dropper-${key}`, result[key])
    })
    document.body.style.backgroundColor = result.color
    const button = document.getElementById('ued-color')
    if (button) {
      button.setAttribute('data-text', color)
    }
  }
}

const ued = {
  alpha,
  toHex,
  contrast,
  scale,
  getAccent,
  getBackground,
  setPropFromColor
}
window.ued = ued

document.addEventListener('DOMContentLoaded', () => {
  !(function () {
    try {
      var e, s, f, v, o = document, c = o.cookie, k = `; ${c}`.split('; color=')
      if (2 === k.length && (e = k.pop().split(';').shift())) {
        v = JSON.parse(e)
        if (
          typeof v === 'string' &&
          v.length === 7 &&
          !isNaN(Number('0x' + v.substring(1)))
        ) {
          s = v
          f = true
        }
      }
      if (!f) s = '#0074e0'
      window.UED_COLOR = s
      ued.setPropFromColor(s)
    } catch (_) {}
  })()
})
