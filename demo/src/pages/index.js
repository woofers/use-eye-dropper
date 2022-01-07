import { useMemo, useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { styled, globalCss } from 'stitches'
import { Box, Inline, Flex } from 'components/box'
import Logo from 'components/logo'
import Typography from 'components/typography'
import HoverLink from 'components/hover-link'
import { HiBan } from 'react-icons/hi'
import { BsDropletFill, BsEyedropper } from 'react-icons/bs'
import { FiCopy, FiPaperclip, FiExternalLink } from 'react-icons/fi'
import CodeBlock from 'components/code-block'
import InstallBlock from 'components/install-block'
import chroma from 'chroma-js'
import useEyeDropper from 'use-eye-dropper'
import { copyToClipboard } from 'utils'
import dynamic from 'next/dynamic'
import {
  motion,
  useTransform,
  useViewportScroll,
  useMotionTemplate,
} from 'framer-motion'
import { IoLogoNpm } from 'react-icons/io'
import { GoMarkGithub, GoLogoGithub } from 'react-icons/go'

const Button = dynamic(() => import('components/button'), { ssr: false })

const IconContainer = styled(Box, {
  fontSize: '240px',
})

const Drop = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    stroke="currentColor"
    fill="var(---outline)"
    strokeWidth="0"
    height="1em"
    width="1em"
    viewBox="0 0 16 16"
  >
    <path
      stroke="currentColor"
      style={{
        transform: 'translate(-1px, 1px)',
        clipPath: 'inset(2px 0px 0px 0px)',
      }}
      fill="none"
      strokeWidth="1.619"
      d="M2.413 13.334l8.184-8.183.261.261-8.183 8.184z"
    />
    <path
      d="M13.354.646a1.207 1.207 0 00-1.708 0L8.5 3.793l-.646-.647a.5.5 0 10-.708.708L8.293 5l-7.147 7.146A.5.5 0 001 12.5v1.793l-.854.853a.5.5 0 10.708.707L1.707 15H3.5a.5.5 0 00.354-.146L11 7.707l1.146 1.147a.5.5 0 00.708-.708l-.647-.646 3.147-3.146a1.207 1.207 0 000-1.708l-2-2zM2 12.707l7-7L10.293 7l-7 7H2v-1.293z"
      stroke="none"
    />
  </svg>
)

const scale = (color, steps = 31) =>
  chroma.scale(['#fff', color, '#000']).mode('lch').colors(steps)

const getDir = colors => {
  const steps = colors.length
  const end = steps - 1
  const mid = (steps - 1) / 2
  const color = colors[mid]
  const light = colors[1]
  const dark = colors[end - 1]
  const lightContrast = chroma.contrast(color, light)
  const darkContrast = chroma.contrast(color, dark)
  return [
    lightContrast < darkContrast ? 1 : -1,
    Math.min(lightContrast, darkContrast),
  ]
}

const steps = 31
const primary = 7
const highContrast = 1

const getAccent = colors => {
  const [dir, constrast] = getDir(colors)
  const boundary = dir > 0 ? colors.length - 1 : 0
  const offset = -1 * primary * dir
  return colors[boundary + offset]
}

const getBackground = colors => {
  const [dir, contrast] = getDir(colors)
  const boundary = dir < 0 ? colors.length - 1 : 0
  const offset = 7 * dir
  const isBad = contrast < 1.75
  if (isBad) {
    const contrastBoundary = dir > 0 ? colors.length - 1 : 0
    const contrastOffset = -1 * highContrast * dir
    return [colors[contrastOffset + contrastBoundary], false]
  }
  return [colors[boundary + offset], true]
}

const Link = styled('a', {
  color: '$$lightText',
  fontWeight: 700,
  textDecoration: 'none',
})

const Spacer = styled('span', {
  mr: '$2',
  color: '$$lightText',
  fontWeight: '900',
})

const Li = ({ children, showDivider = true }) => (
  <Typography type="body1" as="li">
    <Spacer aria-hidden>{showDivider ? '-' : ''}</Spacer>
    {children}
  </Typography>
)

const InnerList = styled(Box, {
  my: '$2',
  pl: '$4',
})

const ClipLink = styled(HoverLink, {
  svg: {
    transform: 'translate(0, -50%)',
    top: '50%',
    left: '0',
    position: 'absolute',
    fontSize: '0.7em',
    opacity: 0,
    transition:
      'opacity 0.2s 0.05s ease-in-out, transform 0.2s 0.05s ease-in-out',
  },
  '&:hover, &:focus': {
    svg: {
      transform: 'translate(calc(-0.7em - 0.64em), -50%)',
      opacity: 1,
    },
  },
})

const PlainLink = styled('a', {
  position: 'relative',
  textDecoration: 'none',
  color: 'currentColor',
  pb: '5px',
  transition: 'color 0.2s 0.0s ease-in-out, border-width 0.1s 0.0s ease-in-out',
  svg: {
    transform: 'translate(0, -50%)',
    top: '50%',
    left: '0',
    position: 'absolute',
    fontSize: '0.7em',
    opacity: 0,
    transition:
      'opacity 0.2s 0.05s ease-in-out, transform 0.2s 0.05s ease-in-out',
  },
  '&:hover, &:focus': {
    color: '$$lightText',
    svg: {
      transform: 'translate(calc(-0.7em - 0.64em), -50%)',
      opacity: 1,
    },
  },
})

const TocHeading = ({ id, children, ...rest }) => (
  <Typography
    type={{ '@initial': 'h6', '@sm': 'h5' }}
    as="span"
    css={{ textTransform: 'lowercase', letterSpacing: '-0.5px' }}
  >
    <HoverLink href={`#${id}`}>{children}</HoverLink>
  </Typography>
)

const AnchorHeading = ({ type, as, id, children, ...rest }) => (
  <Typography id={id} as={as} type={type}>
    <ClipLink href={`#${id}`} {...rest}>
      <FiPaperclip aria-hidden /> <span>{children.substring(0, 1)}</span>
      {children.substring(1)}
    </ClipLink>
  </Typography>
)

const scrollToTop = () => {
  if (typeof window === 'undefined') return
  window.scrollTo(0, 0)
}

const setBodyBackground = color => {
  if (typeof window === 'undefined') return
  document.body.style.setProperty('--body-background', color)
}

const Home = () => {
  const [color, setValue] = useState('rgb(0, 116, 224)')
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
  const colorText = chroma(color).hex()
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
  const apple = () => chroma.contrast('#FFF', backgroundColor) > 1.6 ? 'black-translucent' : 'default'
  return (
    <>
      <Head>
        <meta name="theme-color" content={backgroundColor} />
        <meta name="msapplication-navbutton-color" content={backgroundColor} />
        <meta name="apple-mobile-web-app-status-bar-style" content={apple()} />
        <meta name="apple-mobile-web-app-capable" content="yes" />
      </Head>
      <Box
        css={{
          color: color,
          $$outline: accent,
          $$background: backgroundColor,
          $$background88: chroma(backgroundColor).alpha(0.88),
          $$background0: chroma(backgroundColor).alpha(0),
          backgroundColor: '$$background',
          $$lightText: lightText,
          $$text: text,
          minHeight: '100vh',
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
            color: '$$text',
          }}
          as={motion.div}
          style={{
            translateX: nav,
            pointerEvents: events,
          }}
        >
          <Flex
            css={{
              pt: '$5',
              pb: '$2',
              px: '$5',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              height: 'max-content',
              pointerEvents: 'all',
            }}
            as="button"
            onClick={scrollToTop}
            aria-label="Scroll to top"
          >
            <Logo size="small" as="div" />
          </Flex>
          <Flex
            direction="column"
            css={{ gap: '$1 0', pt: '$5', pr: '$5', '@sm': { gap: '$2 0' } }}
            as={motion.div}
            style={{
              opacity,
              filter: blur,
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
            '@sm': { pt: '12vh' },
          }}
          as={motion.div}
          style={{
            opacity,
            filter: blur,
            scale: scaleValue,
            translateY: translateValue,
            pointerEvents: events,
          }}
        >
          <IconContainer
            css={{
              mt: '-108px',
              transform: 'scale(calc(1 / 1.5)) translate(40px, 230px)',
              '@sm': { mt: '0px', transform: 'none' },
            }}
          >
            <Box css={{ pl: '100px' }}>
              <Drop />
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
          <Logo size={{ '@initial': 'small', '@sm': 'normal' }}               css={{ mt: '-8px', '@sm': { mt: '0px' } }} />
          {isSupported() ? (
            <Button
              css={{ mt: '-64px', '@sm': { mt: '0px' } }}
              onClick={() => open().then(color => setColor(color?.sRGBHex))}
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
              and
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
            px: '$3',
            maxWidth: '844px',
            mx: 'auto',
            color: '$$text',
            py: '$10',
            display: 'flex',
            flexDirection: 'column',
            gap: '$4 0',
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
          <ul>
            <Li>Supports Server-Side rendering.</Li>
            <Li>
              Safely detect and fallback on unsupported browsers using{' '}
              <code>isSupported</code> method.
            </Li>
            <Li>
              Closes eye dropper when corresponding component is unmounted.{' '}
            </Li>
            <Li>
              Provides an explicit <code>close</code> method to cancel eye
              dropper (signals can still be used).
            </Li>
          </ul>
          <AnchorHeading id="usage" type="h4" as="h3">
            Usage
          </AnchorHeading>
          <CodeBlock>
            {`import React, { useState } from 'react'
import useEyeDropper from 'use-eye-dropper'

const App = () => {
  const { open, close, isSupported } = useEyeDropper()
  const [color, setColor] = useState('#fff')
  // useEyeDropper will reject/cleanup the open() promise on unmount,
  // so setState never fires when the component is unmounted.
  const pickColor = () =>
    open().then(color => setColor(color.sRGBHex).catch(err => console.log(err))
  return (
    <>
      <div style={{ padding: '64px', background: color }}>Selected color</div>
      {isSupported() ?
          <button onClick={pickColor}>Pick color</button>
        : <span>EyeDropper API not supported in this browser</span>
      }
    </>
  )
}`}
          </CodeBlock>
          <AnchorHeading id="methods" type="h4" as="h3">
            Methods
          </AnchorHeading>
          <ul>
            <Li>
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
            </Li>
            <Li>
              <code>{'close()  => void'}</code>
              <InnerList>
                This method closes the EyeDropper API selector if it is open and
                rejects the promise from <code>open</code>. Otherwise this
                performs a no-op.
              </InnerList>
            </Li>
            <Li>
              <code>
                {'isSupported()'}
                {' => boolean'}
              </code>
              <InnerList>
                Determines if the EyeDropper API is supported in the current
                browser.
              </InnerList>
            </Li>
          </ul>
        </Box>
      </Box>
    </>
  )
}

export default Home
