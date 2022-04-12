export const setBodyBackground = color => {
  if (typeof window === 'undefined') return
  document.body.style.setProperty('--body-background', color)
}
