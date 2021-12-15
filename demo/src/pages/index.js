import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { styled } from 'stitches'
import { Box, Inline, Flex } from 'components/box'
import Typography from 'components/typography'
import { HiBan } from 'react-icons/hi'
import { BsDropletFill, BsEyedropper } from 'react-icons/bs'
import { FiCopy, FiPaperclip, FiExternalLink } from 'react-icons/fi'
import CodeBlock from 'components/code-block'
import chroma from 'chroma-js'
import useEyeDropper from 'use-eye-dropper'
import dynamic from 'next/dynamic'

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

const hasClipboard = () =>
  typeof window !== 'undefined' && 'clipboard' in navigator

const copyToClipboard = value => () => {
  navigator.clipboard.writeText(value)
}

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
})

const Li = ({ children }) => (
  <Typography type="body1" as="li">
    <Spacer aria-hidden>-</Spacer>
    {children}
  </Typography>
)

const PlainLink = styled('a', {
  position: 'relative',
  textDecoration: 'none',
  color: 'currentColor',
  borderBottom: '4px solid $$lightText',
  pb: '$1',
  transition: 'color 0.2s 0.0s ease-in-out, border-width 0.1s 0.0s ease-in-out',
  'svg': {
    transform: 'translate(0, -50%)',
    top: '50%',
    left: '0',
    position: 'absolute',
    fontSize: '0.7em',
    opacity: 0,
    transition: 'opacity 0.2s 0.05s ease-in-out, transform 0.2s 0.05s ease-in-out'
  },
  '&:hover, &:focus': {
    borderWidth: '0px',
    color: '$$lightText',
    'svg': {
      transform: 'translate(calc(-0.7em - 0.64em), -50%)',
      opacity: 1
    }
  },
  span: {
    fontWeight: 900,
    color: '$$lightText'
  }
})

const AnchorHeading = ({ type, as, id, children, ...rest }) => (
  <Typography id={id} as={as} type={type}>
    <PlainLink href={`#${id}`} {...rest}>
      <FiPaperclip aria-hidden /> <span>{children.substring(0, 1)}</span>{children.substring(1)}
    </PlainLink>
  </Typography>
)

const Home = () => {
  const [color, setValue] = useState('rgb(216, 61, 61)')
  const { open, isSupported } = useEyeDropper()
  const setColor = value => setValue(value.replace('0)', '1)'))
  const colors = scale(color)
  const [backgroundColor, swap] = getBackground(colors)
  const accent = getAccent(colors)
  const lightText = swap ? color : accent
  const text = !swap ? color : accent
  const colorText = chroma(color).hex()
  return (
    <>
      <Box
        css={{
          color: color,
          $$outline: accent,
          $$background: backgroundColor,
          backgroundColor: '$$background',
          $$lightText: lightText,
          $$text: text,
          minHeight: '100vh',
        }}
      >
        <Flex
          direction="column"
          align="center"
          css={{ pt: '12vh', gap: '$10 0' }}
        >
          <IconContainer>
            <Box css={{ pl: '100px' }}>
              <Drop />
            </Box>
            <Box css={{ fontSize: '180px', mt: '-28px', pr: '150px' }}>
              <BsDropletFill />
            </Box>
            <Button type="minimal" onClick={copyToClipboard(colorText)}>
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
          <Typography
            type="h1"
            css={{ letterSpacing: '-5px', fontWeight: '900' }}
          >
            <Inline css={{ color: '$$lightText' }}>use</Inline>
            <Inline css={{ color: '$$text' }}>EyeDropper</Inline>
          </Typography>
          {isSupported() ? (
            <Button
              onClick={() => open().then(color => setColor(color?.sRGBHex))}
            >
              <BsEyedropper aria-hidden />
              <Typography noMargin type="button">
                Pick color
              </Typography>
            </Button>
          ) : (
            <Button
              as="a"
              href="https://developer.mozilla.org/en-US/docs/Web/API/EyeDropper#browser_compatibility"
              target="_blank"
              and
              rel="noopener noreferrer"
            >
              <HiBan aria-hidden />
              <Typography noMargin type="button">
                Browser not supported
              </Typography>
              <FiExternalLink aria-label="External link" strokeWidth="2.5px" />
            </Button>
          )}
        </Flex>
        <Box
          css={{
            maxWidth: '720px',
            mx: 'auto',
            color: '$$text',
            pt: '$10',
            display: 'flex',
            flexDirection: 'column',
            gap: '$4 0',
          }}
        >
          <AnchorHeading id="documentation" type="h3" as="h2">
            Documentation
          </AnchorHeading>
          <Typography type="body1">
            Implements the{' '}
            <Link
              target="_blank"
              and
              rel="noopener noreferrer"
              href="https://github.com/WICG/eyedropper-api"
            >
              EyeDropper API
            </Link>{' '}
            (currently only available in Chrome) into easy-to-use React hook.
          </Typography>
          <AnchorHeading id="features" type="h4" as="h3">
            Features
          </AnchorHeading>
          <ul>
            <Li>Supports Server-Side rendering</Li>
            <Li>
              Safely detect and fallback on unsupported browsers using
              `isSupported` method.
            </Li>
            <Li>
              Closes eye dropper when corresponding component is unmounted.{' '}
            </Li>
            <Li>
              Provides explicit `close` method to cancel eye dropper (signals
              can still be used).
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
  // useEyeDropper will cancel/cleanup the open() promise on unmount,
  // so setState never fires when the component is unmounted.
  const pickColor = () =>
    open().then(color => setColor(color.sRGBHex).catch(() => setColor('#fff'))
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
        </Box>
      </Box>
    </>
  )
}

export default Home
