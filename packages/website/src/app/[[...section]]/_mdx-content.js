'use client'
import { Children, memo, useMemo } from 'react'
import { getMDXComponent } from 'mdx-bundler/client'
import CodeBlock from 'components/code-block'
import InstallBlock from 'components/install-block'
import { InnerList, List, ListItem } from 'components/list'
import AnchorHeading from 'components/anchor-heading'
import HoverLink from 'components/hover-link'
import Typography from 'components/typography'

const components = {
  img: () => null,
  p: ({ children, ...rest }) => {
    if (typeof children !== 'string' && children.type === 'strong') return null
    const filtered =
      typeof children === 'string'
        ? children.replace(/(👀|🩸|🧫)/g, '')
        : children
    const single = Children.count(children) === 1
    if (!single) {
      const first = children[0]
      if (typeof first !== 'string' && first.type.name === 'a') {
        const url = first?.props?.href ?? ''
        if (url.endsWith('use-eye-dropper/actions')) {
          return null
        }
      }
    }
    return (
      <Typography {...rest} type="body1">
        {filtered}
      </Typography>
    )
  },
  a: props => (
    <HoverLink
      {...props}
      type="primary"
      target="_blank"
      rel="noopener noreferrer"
    />
  ),
  h1: props => null,
  h2: ({ children, ...rest }) => {
    const id = typeof children === 'string' ? children.toLowerCase() : ''
    const props = id ? { id } : {}
    if (id === 'installation') return null
    return (
      <AnchorHeading {...props} type="h4" as="h3" {...rest}>
        {children}
      </AnchorHeading>
    )
  },
  h3: ({ children, ...rest }) => {
    const id = (
      typeof children === 'string' ? children.toLowerCase() : ''
    ).replace(/\s/g, '-')
    const props = id ? { id } : {}
    return (
      <AnchorHeading {...props} type="h5" as="h4" {...rest}>
        {children}
      </AnchorHeading>
    )
  },
  ul: List,
  li: ({ children, ...rest }) => {
    const filtered = Children.map(children, item =>
      item !== '\n' ? item : null
    )
    const single = Children.count(filtered) === 1
    const first = filtered[0]
    if (!single && typeof first !== 'string' && first.type.name === 'p') {
      const text = Children.map(filtered, item => {
        if (typeof item !== 'string' && item.type.name === 'p')
          return <>{item.props.children}</>
        return item
      })
      const content = Children.map(text, (item, i) => {
        if (i <= 0 && typeof item === 'object')
          return <>{item.props.children}</>
        return <InnerList>{item}</InnerList>
      })
      return <ListItem {...rest}>{content}</ListItem>
    }
    return <ListItem {...rest}>{children}</ListItem>
  },
  pre: ({ children, ...rest }) => {
    const single = Children.count(children) === 1
    if (single) {
      if (typeof children !== 'string' && children.type === 'code') {
        const { children: content, ...rest } = children.props
        if (typeof content === 'string') {
          const reg = /language-(.*)/
          const { className } = rest
          const matches = reg.exec(className)
          if (matches) {
            const lang = matches[1]
            if (['yarn', 'npm', 'pnpm'].indexOf(lang) >= 0)
              return <InstallBlock type={lang}>{content}</InstallBlock>
            if (lang === 'jsx')
              return <CodeBlock lang={className}>{content}</CodeBlock>
          }
        }
      }
    }
    return <pre {...rest}>{children}</pre>
  }
}

const MdxContent = memo(({ code }) => {
  const Component = useMemo(() => getMDXComponent(code), [code])
  return <Component components={components} />
})
MdxContent.displayName = 'MdxContent'

export default MdxContent
