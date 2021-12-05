import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { styled } from 'stitches'
import { Box, Inline, Flex } from 'components/box'
import Typography from 'components/typography'
import { HiBan } from 'react-icons/hi'
import { BsDropletFill, BsEyedropper } from 'react-icons/bs'
import { FiCopy, FiExternalLink } from 'react-icons/fi'
import chroma from 'chroma-js'
import useEyeDropper from 'use-eye-dropper'
import dynamic from 'next/dynamic'

const Button = dynamic(() => import('components/button'), { ssr: false })

const IconContainer = styled(Box, {
  fontSize: '240px'
})

const Drop = () => (
  <svg xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="var(---outline)" strokeWidth="0" height="1em" width="1em" viewBox="0 0 16 16">
    <path stroke="currentColor" style={{ transform: 'translate(-1px, 1px)', clipPath: 'inset(2px 0px 0px 0px)' }} fill="none" strokeWidth="1.619" d="M2.413 13.334l8.184-8.183.261.261-8.183 8.184z" />
    <path d="M13.354.646a1.207 1.207 0 00-1.708 0L8.5 3.793l-.646-.647a.5.5 0 10-.708.708L8.293 5l-7.147 7.146A.5.5 0 001 12.5v1.793l-.854.853a.5.5 0 10.708.707L1.707 15H3.5a.5.5 0 00.354-.146L11 7.707l1.146 1.147a.5.5 0 00.708-.708l-.647-.646 3.147-3.146a1.207 1.207 0 000-1.708l-2-2zM2 12.707l7-7L10.293 7l-7 7H2v-1.293z" stroke="none"/>
  </svg>
)

const hasClipboard = () => typeof window !== 'undefined' && 'clipboard' in navigator

const copyToClipboard = value => () => {
  navigator.clipboard.writeText(value)
}

const scale = (color, steps = 31) => chroma.scale(['#fff', color, '#000']).mode('lch').colors(steps)

const getDir = colors => {
  const steps = colors.length
  const end = steps - 1
  const mid = (steps - 1) / 2
  const color = colors[mid]
  const light = colors[1]
  const dark = colors[end - 1]
  const lightContrast = chroma.contrast(color, light)
  const darkContrast = chroma.contrast(color, dark)
  return [lightContrast < darkContrast ? 1 : -1, Math.min(lightContrast, darkContrast)]
}

const steps = 31
const primary = 7
const highContrast = 1

const getAccent = colors => {
  const [dir, constrast] = getDir(colors)
  const boundary = dir > 0 ? (colors.length - 1) : 0
  const offset = -1 * primary * dir
  return colors[boundary + offset]
}

const getBackground = colors => {
  const [dir, contrast] = getDir(colors)
  const boundary = dir < 0 ? (colors.length - 1) : 0
  const offset = 7 * dir
  const isBad = contrast < 1.75
  if (isBad) {
    const contrastBoundary = dir > 0 ? (colors.length - 1) : 0
    const contrastOffset = -1 * highContrast * dir
    return [colors[contrastOffset + contrastBoundary], false]
  }
  return [colors[boundary + offset], true]
}

const Home = () => {
  const [color, setValue] = useState('rgb(244, 62, 92)')
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
      <Box css={{ color: color, $$outline: accent, $$background: backgroundColor, backgroundColor: '$$background', $$lightText: lightText, $$text: text  }}>
        <Flex direction="column" justify="center" align="center" css={{ height: '100vh', gap: '$10 0' }}>
          <IconContainer>
            <Box css={{ pl: '100px' }}><Drop /></Box>
            <Box css={{ fontSize: '180px', mt: '-28px', pr: '150px' }}><BsDropletFill /></Box>
            <Button type="minimal" onClick={copyToClipboard(colorText)}>
              <Typography type="h3" as="div" noMargin css={{ textTransform: 'lowercase' }}>
                {colorText}
              </Typography>
              <FiCopy />
            </Button>
          </IconContainer>
          <Typography type="h1" css={{ letterSpacing: '-5px', fontWeight: '900' }}>
            <Inline css={{ color: '$$lightText'}}>use</Inline>
            <Inline css={{ color: '$$text'}}>EyeDropper</Inline>
          </Typography>
            {isSupported() ? (
               <Button onClick={() => open().then(color => setColor(color?.sRGBHex))}>
                 <BsEyedropper aria-hidden />
                 <Typography noMargin type="button">Pick color</Typography>
               </Button>
            ) : (
                <Button as="a" href="https://developer.mozilla.org/en-US/docs/Web/API/EyeDropper#browser_compatibility" target="_blank" and rel="noopener noreferrer">
                  <HiBan aria-hidden />
                  <Typography noMargin type="button">Browser not supported</Typography>
                  <FiExternalLink aria-label="External link" strokeWidth="2.5px" />
                </Button>
              )
            }
        </Flex>
      </Box>
    </>
  )
}

export default Home
