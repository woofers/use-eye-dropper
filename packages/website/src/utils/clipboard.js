const hasClipboard = () =>
  typeof window !== 'undefined' && 'clipboard' in navigator

export const copyToClipboard = value => () => {
  if (!hasClipboard()) return
  const trim = value.trim()
  navigator.clipboard.writeText(trim)
}
