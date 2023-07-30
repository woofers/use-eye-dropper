export const toTitle = value => {
  if (!value) return value
  return value.substring(0, 1).toUpperCase() + value.substring(1).toLowerCase()
}
