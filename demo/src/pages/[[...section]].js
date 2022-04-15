import { Children, useEffect, useMemo, useState } from 'react'
import { bundleMDX } from 'mdx-bundler'
import { getMDXComponent } from 'mdx-bundler/client'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { styled, globalCss } from 'stitches'
import useEyeDropper from 'use-eye-dropper'
import { Box, Inline, Flex } from 'components/box'
import Logo from 'components/logo'
import Typography from 'components/typography'
import HoverLink from 'components/hover-link'
import CodeBlock from 'components/code-block'
import Button from 'components/button'
import InstallBlock from 'components/install-block'
import { List, ListItem, InnerList } from 'components/list'
import Dropper from 'components/dropper'
import AnchorHeading from 'components/anchor-heading'
import TocHeading from 'components/toc-heading'
import { getMarkdownFile } from 'data/local'
import {
  toTitle,
  alpha,
  toHex,
  contrast,
  scale,
  getAccent,
  getBackground,
  scrollTo,
  scrollToTop,
  copyToClipboard,
  setBodyBackground
} from 'utils'
import {
  motion,
  useTransform,
  useViewportScroll,
  useMotionTemplate
} from 'framer-motion'

const sections = ['documentation', 'features', 'usage', 'methods']
const pages = ['', ...sections]

const components = {
  p: ({ children, ...rest }) => {
    if (typeof children !== 'string' && children.type === 'strong') return null
    const filtered = typeof children === 'string' ? children.replace(/(👀|🩸|🧫)/g, '') : children
    return <Typography {...rest} type="body1">{filtered}</Typography>
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
            if (['yarn', 'npm'].indexOf(lang) >= 0)
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

const useBackground = globalCss({
  body: {
    backgroundColor: 'var(--body-background, rgb(0, 116, 224))'
  }
})

const useScrollListItems = () => {
  const router = useRouter()
  const isReady = router.isReady
  const path = router?.query?.section?.[0]
  useEffect(() => {
    if (!isReady) return
    if (!path) {
      scrollToTop()
    } else {
      scrollTo(path)
    }
  }, [path, isReady, router])
  return null
}

const useScrollValues = () => {
  const { scrollYProgress } = useViewportScroll()
  const opacity = useTransform(
    scrollYProgress,
    value => 1 - Math.pow(value, 0.5)
  )
  const opacityDocs = useTransform(scrollYProgress, value =>
    Math.max(value * 2, 0)
  )
  const blurValue = useTransform(scrollYProgress, value => value * 2 * 10)
  const blur = useMotionTemplate`blur(${blurValue}px)`
  const scaleValue = useTransform(scrollYProgress, value =>
    Math.max(1 * (1 - value), 0.67)
  )
  const nav = useTransform(scrollYProgress, value => Math.min(value * 500, 300))
  const translateValue = useTransform(scrollYProgress, value => -200 * value)
  const transform = useMotionTemplate`scale(${scaleValue}px)`
  const events = useTransform(scrollYProgress, value =>
    value === 0 ? 'all' : 'none'
  )
  return { opacity, opacityDocs, blur, scaleValue, nav, translateValue, events }
}

const Home = ({ code, frontmatter }) => {
  const Component = useMemo(() => getMDXComponent(code), [code])
  useBackground()
  useScrollListItems()
  const [color, setValue] = useState('rgb(0, 116, 224)')
  const {
    opacity,
    opacityDocs,
    blur,
    scaleValue,
    nav,
    translateValue,
    events
  } = useScrollValues()
  const { open, isSupported } = useEyeDropper()
  const setColor = value => {
    const color = value.replace('0)', '1)')
    setValue(color)
    setBodyBackground(color)
  }
  const colors = scale(color)
  const [backgroundColor, swap] = getBackground(colors)
  const accent = getAccent(colors)
  const lightText = swap ? color : accent
  const text = !swap ? color : accent
  const colorText = toHex(color)
  const apple =
    contrast('#FFF', backgroundColor) > 1.6 ? 'black-translucent' : 'default'
  return (
    <>
      <Head>
        <meta name="theme-color" content={backgroundColor} />
        <meta name="msapplication-navbutton-color" content={backgroundColor} />
        <meta name="apple-mobile-web-app-status-bar-style" content={apple} />
        <meta name="apple-mobile-web-app-capable" content="yes" />
      </Head>
      <Box
        css={{
          color: color,
          $$outline: accent,
          $$background: backgroundColor,
          $$background88: alpha(backgroundColor, 0.88),
          $$background0: alpha(backgroundColor, 0),
          backgroundColor: '$$background',
          $$lightText: lightText,
          $$text: text,
          minHeight: '100vh'
        }}
      >
        <Flex
          justify="between"
          css={{
            fontSize: '92px',
            width: 'calc(100% + 300px)',
            ml: 'auto',
            zIndex: 50,
            height: '120px',
            background:
              'linear-gradient(180deg, $$background 0%, $$background88 34%, $$background0 100%)',
            position: 'fixed',
            top: 0,
            right: 0,
            color: '$$text'
          }}
          as={motion.div}
          style={{
            translateX: nav,
            pointerEvents: events
          }}
        >
          <Link href="/" passHref scroll={false}>
            <Flex
              css={{
                pt: '$5',
                pb: '$2',
                px: '$5',
                textDecoration: 'none',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                height: 'max-content',
                pointerEvents: 'all'
              }}
              as="a"
              aria-label="Scroll to top"
            >
              <Logo size="small" as="div" />
            </Flex>
          </Link>
          <Flex
            direction="column"
            css={{ gap: '$1 0', pt: '$5', pr: '$5', '@sm': { gap: '$2 0' } }}
            as={motion.div}
            style={{
              opacity,
              filter: blur
            }}
          >
            {sections.map(section => (
              <TocHeading key={section} id={section}>
                {toTitle(section)}
              </TocHeading>
            ))}
          </Flex>
        </Flex>
        <Flex
          direction="column"
          align="center"
          css={{
            pt: '0',
            gap: '$10 0',
            position: 'sticky',
            top: 0,
            '@sm': { pt: '12vh' }
          }}
          as={motion.div}
          style={{
            opacity,
            filter: blur,
            scale: scaleValue,
            translateY: translateValue,
            pointerEvents: events
          }}
        >
          <Dropper
            colorText={colorText}
            supported={isSupported()}
            onClick={() =>
              open()
                .then(color => setColor(color?.sRGBHex))
                .catch(() => {})
            }
          />
        </Flex>
        <Box
          as={motion.div}
          style={{ opacity: opacityDocs }}
          css={{
            px: '14px',
            maxWidth: '844px',
            mx: 'auto',
            color: '$$text',
            py: '$10',
            display: 'flex',
            flexDirection: 'column',
            gap: '$4 0',
            '@sm': {
              px: '$3'
            }
          }}
        >
          <AnchorHeading id="documentation" type="h3" as="h2">
            Documentation
          </AnchorHeading>
          <Component components={components} />
        </Box>
      </Box>
    </>
  )
}

const getPaths = () =>
  pages.map(path => {
    const section = path ? [path] : []
    return { params: { section } }
  })

export const getStaticPaths = async () => {
  return {
    paths: getPaths(),
    fallback: false
  }
}

export const getStaticProps = async () => {
  const { content } = getMarkdownFile('../', 'README')
  const { code, frontmatter } = await bundleMDX({ source: content, files: {} })
  return {
    props: { code, frontmatter }
  }
}

export default Home
