export const scrollToTop = () => {
  if (typeof window === 'undefined') return
  window.scrollTo(0, 0)
}

export const scrollTo = id => {
  if (typeof window === 'undefined') return
  const element = document.getElementById(id)
  if (!element) return
  const offset = 100
  const y = element.getBoundingClientRect().top + window.scrollY - offset
  window.scroll({ top: y })
}
