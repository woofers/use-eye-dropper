import React, { useState, Children, useEffect } from 'react'
import { styled } from 'stitches'
import { lowlight } from 'lowlight'
import { toHtml } from 'hast-util-to-html'

const Element = styled('div', {})

const Pre = styled('pre', {
  overflowX: 'auto',
  fontSize: '12px',
  '@sm': {
    fontSize: '16px',
    lineHeight: '1.5'
  }
})

const Content = ({ html, as = 'div', ...rest }) => (
  <Element {...rest} as={as} dangerouslySetInnerHTML={{ __html: html }} />
)

const CodeBlock = ({ children, lang = 'language-jsx', ...rest }) => {
  const shortLang = lang.replace(/language-/g, '')
  const [id, setId] = useState()
  useEffect(() => {
    setId(true)
  }, [setId])
  return (
    <Pre>
      <Content
        className={`hljs language-${shortLang}`}
        as="code"
        html={toHtml(lowlight.highlight(id ? shortLang : 'c', children))}
      />
    </Pre>
  )
}

export default CodeBlock
