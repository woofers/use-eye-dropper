import { globalCss } from 'stitches'

const useGlobalStyles = globalCss({
  '*, *::before, *::after ': { boxSizing: 'border-box' },
  '*': {
    margin: 0,
  },
  'html, body': {
    height: '100%',
  },
  body: {
    '-webkit-font-smoothing': 'antialiased',
  },
  'input, button, textarea, select': {
    font: 'inherit',
  },
  'p, h1, h2, h3, h4, h5, h6': {
    overflowWrap: 'break-word',
  },
  '#root, #__next': {
    isolation: 'isolate',
  },
  ul: {
    padding: 0,
  },
  li: {
    display: 'inline-block',
  },
  pre: {
    overflowX: 'hidden',
    margin: 0,
    padding: '24px',
    br: '$3',
    fontSize: '14px',
    lineHeight: '1.5',
    color: '$$text',
  },
  '.hljs-comment': {
    color: '$$lightText',
  },
  '.hljs-bullet': {
    color: '$$lightText',
  },
  '.hljs-string, .hljs-name': {
    color: '$$lightText',
  },
  '.hljs-keyword, .hljs-link': {
    color: '$$lightText',
  },
  '.hljs-attr': {
    color: '$$text',
  },
})

const Global = ({ children }) => {
  useGlobalStyles()
  return <>{children}</>
}

export default Global
