import { useEffect, useMemo, useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { styled, globalCss } from 'stitches'
import { Box, Inline, Flex } from 'components/box'
import Logo from 'components/logo'
import Typography from 'components/typography'
import HoverLink from 'components/hover-link'
import { HiBan } from 'react-icons/hi'
import { BsDropletFill, BsEyedropper } from 'react-icons/bs'
import { FiCopy, FiExternalLink } from 'react-icons/fi'
import CodeBlock from 'components/code-block'
import Button from 'components/button'
import InstallBlock from 'components/install-block'
import { List, ListItem, InnerList } from 'components/list'
import chroma from 'chroma-js'
import useEyeDropper from 'use-eye-dropper'
import {
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
import Dropper from 'components/dropper'
import { IoLogoNpm } from 'react-icons/io'
import { GoMarkGithub, GoLogoGithub } from 'react-icons/go'
import AnchorHeading from 'components/anchor-heading'

const useBackground = globalCss({
  body: {
    backgroundColor: 'var(--body-background, rgb(0, 116, 224))'
  }
})

const IconContainer = styled(Box, {
  fontSize: '240px',
  mt: '-108px',
  transform: 'scale(calc(1 / 1.5)) translate(40px, 230px)',
  '@sm': { mt: '0px', transform: 'none' }
})

const TocHeading = ({ id, children, ...rest }) => (
  <Typography
    type={{ '@initial': 'h6', '@sm': 'h5' }}
    as="span"
    css={{ textTransform: 'lowercase', letterSpacing: '-0.5px' }}
  >
    <Link href={`/${id}`} passHref scroll={false}>
      <HoverLink>{children}</HoverLink>
    </Link>
  </Typography>
)

const useScrollListItemnks = () => {
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

const Home = () => {
  useBackground()
  useScrollListItemnks()
  const [color, setValue] = useState('rgb(0, 116, 224)')
  const { opacity, opacityDocs, blur, scaleValue, nav, translateValue, events } = useScrollValues()
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
  const apple = contrast('#FFF', backgroundColor) > 1.6 ? 'black-translucent' : 'default'
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
            <TocHeading id="documentation">Documentation</TocHeading>
            <TocHeading id="features">Features</TocHeading>
            <TocHeading id="usage">Usage</TocHeading>
            <TocHeading id="methods">Methods</TocHeading>
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
          <IconContainer>
            <Box css={{ pl: '100px' }}>
              <Dropper />
            </Box>
            <Box css={{ fontSize: '180px', mt: '-28px', pr: '150px' }}>
              <BsDropletFill />
            </Box>
            <Button
              type="minimal"
              onClick={copyToClipboard(colorText)}
              title="Copy to clipboard"
              aria-label="Copy to HEX color code to clipboard"
              css={{ mt: '-24px', '@sm': { mt: '0px' } }}
            >
              <Typography
                type="h3"
                as="div"
                noMargin
                css={{ textTransform: 'lowercase' }}
              >
                {colorText}
              </Typography>
              <FiCopy />
            </Button>
          </IconContainer>
          <Logo
            size={{ '@initial': 'small', '@sm': 'normal' }}
            css={{ mt: '-8px', '@sm': { mt: '0px' } }}
          />
          {isSupported() ? (
            <Button
              css={{ mt: '-64px', '@sm': { mt: '0px' } }}
              onClick={() =>
                open()
                  .then(color => setColor(color?.sRGBHex))
                  .catch(() => {})
              }
            >
              <BsEyedropper aria-hidden />
              <Typography noMargin type="button" as="span">
                Pick color
              </Typography>
            </Button>
          ) : (
            <Button
              css={{ mt: '-64px', '@sm': { mt: '0px' } }}
              as="a"
              href="https://developer.mozilla.org/en-US/docs/Web/API/EyeDropper#browser_compatibility"
              target="_blank"
              rel="noopener noreferrer"
            >
              <HiBan aria-hidden />
              <Typography noMargin type="button" as="span">
                Browser not supported
              </Typography>
              <FiExternalLink aria-label="External link" strokeWidth="2.5px" />
            </Button>
          )}
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
          <Typography type="body1">
            Browser color picker hook for React.
          </Typography>
          <Typography type="body1">
            Implements the{' '}
            <HoverLink
              type="primary"
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/WICG/eyedropper-api"
            >
              EyeDropper API{' '}
            </HoverLink>{' '}
            into an easy-to-use React hook. This API is currently only available
            in Chromium based browsers.
          </Typography>
          <InstallBlock type="npm">npm install use-eye-dropper</InstallBlock>
          <InstallBlock type="yarn">yarn add use-eye-dropper</InstallBlock>
          <AnchorHeading id="features" type="h4" as="h3">
            Features
          </AnchorHeading>
          <List>
            <ListItem>Supports Server-Side rendering.</ListItem>
            <ListItem>
              Safely detect and fallback on unsupported browsers using{' '}
              <code>isSupported</code> method.
            </ListItem>
            <ListItem>
              Closes eye dropper when corresponding component is unmounted.{' '}
            </ListItem>
            <ListItem>
              Provides an explicit <code>close</code> method to cancel eye
              dropper (signals can still be used).
            </ListItem>
          </List>
          <AnchorHeading id="usage" type="h4" as="h3">
            Usage
          </AnchorHeading>
          <CodeBlock>
            {`import React, { useState } from 'react'
import useEyeDropper from 'use-eye-dropper'

const App = () => {
  const { open, close, isSupported } = useEyeDropper()
  const [color, setColor] = useState('#fff')
  const [error, setError] = useState()
  // useEyeDropper will reject/cleanup the open() promise on unmount,
  // so setState never fires when the component is unmounted.
  const pickColor = () => {
    open()
      .then(color => setColor(color.sRGBHex))
      .catch(e => {
        console.log(e)
        // Ensures component is still mounted
        // before calling setState
        if (!e.canceled) setError(e)
      })
  }
  return (
    <>
      <div style={{ padding: '64px', background: color }}>Selected color</div>
      {isSupported() ?
          <button onClick={pickColor}>Pick color</button>
        : <span>EyeDropper API not supported in this browser</span>
      }
      {!!error && <span>{error.message}</span>}
    </>
  )
}`}
          </CodeBlock>
          <AnchorHeading id="methods" type="h4" as="h3">
            Methods
          </AnchorHeading>
          <List>
            <ListItem>
              <code>
                {'open({ signal?: AbortSignal })'}
                {' => Promise<{ sRGBHex: string }>'}
              </code>
              <InnerList>
                Opens the EyeDropper API in supported browsers and returns a
                promise which will resolve with the selected color.
                Alternatively the promise will be rejected if the user cancels
                the operation, for instance by hitting escape. Additionally if
                the browser does not support the API, the promise is rejected.
                While the spec currently indicates that a 6-digit HEX value is
                returned, the current Chrome implementation returns a{' '}
                <code>rgba</code> value.
              </InnerList>
            </ListItem>
            <ListItem>
              <code>{'close()  => void'}</code>
              <InnerList>
                This method closes the EyeDropper API selector if it is open and
                rejects the promise from <code>open</code>. Otherwise this
                performs a no-op.
              </InnerList>
            </ListItem>
            <ListItem>
              <code>
                {'isSupported()'}
                {' => boolean'}
              </code>
              <InnerList>
                Determines if the EyeDropper API is supported in the current
                browser.
              </InnerList>
            </ListItem>
          </List>
        </Box>
      </Box>
    </>
  )
}

const sections = ['', 'documentation', 'features', 'usage', 'methods']

const getPaths = () =>
  sections.map(path => {
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
  return {
    props: {}
  }
}

export default Home
