import { globalCss } from 'stitches'

const useGlobalStyles = globalCss({
  '*, *::before, *::after ': { boxSizing: 'border-box' },
  '*': {
    margin: 0,
  },
  html: {
    scrollBehavior: 'smooth',
    overflowX: 'hidden',
  },
  body: {
    '-webkit-font-smoothing': 'antialiased',
    backgroundColor: 'var(--body-background, rgb(0, 116, 224))',
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
    listStyleType: 'none',
  },
  li: {
    py: '$1',
  },
  pre: {
    overflowX: 'hidden',
    margin: 0,
    padding: '4px 0',
    br: '$3',
    color: '$$text',
  },
  code: {
    fontFamily: "'Red Hat Mono', monospace",
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
  '::selection': {
    backgroundColor: '$$lightText',
    color: '$$background',
  },
})

const Global = ({ children }) => {
  useGlobalStyles()
  return <>{children}</>
}

export default Global
