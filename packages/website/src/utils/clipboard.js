const hasClipboard = () =>
  typeof window !== 'undefined' && 'clipboard' in navigator

export const copyToClipboard = value => () => {
  if (!hasClipboard()) return
  navigator.clipboard.writeText(value)
}
