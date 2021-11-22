import { globalCss } from 'stitches'

const useGlobalStyles = globalCss({
  '*': { boxSizing: 'border-box' },
  body: {
    margin: 0,
    padding: 0,
    backgroundColor: '$rose900',
    color: '$gray300'
  },
  'h1, h2, h3, h4, h5, h6, p': {}
})

const Global = ({ children }) => {
  useGlobalStyles()
  return <>{children}</>
}

export default Global
