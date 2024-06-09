export const sections = ['documentation', 'features', 'usage', 'methods']
const pages = ['', ...sections]

export const getPaths = () =>
  [...pages, 'usage-with-typescript'].map(path => {
    const section = path ? [path] : []
    return { section }
  })
