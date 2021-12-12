import { globalCss } from 'stitches'

const useGlobalStyles = globalCss({
  '*, *::before, *::after ': { boxSizing: 'border-box' },
  '*': {
    margin: 0
  },
  'html, body': {
    height: '100%'
  },
  body: {
    '-webkit-font-smoothing': 'antialiased'
  },
  'input, button, textarea, select': {
    font: 'inherit'
  },
  'p, h1, h2, h3, h4, h5, h6': {
    overflowWrap: 'break-word'
  },
  '#root, #__next': {
    isolation: 'isolate'
  },
  ul: {
    padding: 0
  },
  li: {
    display: 'inline-block'
  }
})

const Global = ({ children }) => {
  useGlobalStyles()
  return <>{children}</>
}

export default Global
