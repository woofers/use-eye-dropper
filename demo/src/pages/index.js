import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { styled } from 'stitches'
import { Box, Flex } from 'components/box'
import Typography from 'components/typography'
import { BsDropletFill, BsEyedropper } from 'react-icons/bs'
import chroma from 'chroma-js'
import useEyeDropper from 'use-eye-dropper'

const makeColor = (color, scale) => `hsl(${!isNaN(color.h) ? color.h : 0}, ${color.s * 100 * scale}%, ${color.l * 100}%, 1)`

const toHsl = color => {
  const values = chroma(color).hsl()
  const [h, s, l, a] = values
  return { h, s, l, a}
}

const IconContainer = styled(Box, {
  fontSize: '240px'
})

const Drop = () => (
  <svg xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="var(---outline)" strokeWidth="0" height="1em" width="1em" viewbox="0 0 16 16">
    <path stroke="currentColor" style={{ transform: 'translate(-1px, 1px)', clipPath: 'inset(2px 0px 0px 0px)' }} fill="none" strokeWidth="1.619" d="M2.413 13.334l8.184-8.183.261.261-8.183 8.184z" />
    <path d="M13.354.646a1.207 1.207 0 00-1.708 0L8.5 3.793l-.646-.647a.5.5 0 10-.708.708L8.293 5l-7.147 7.146A.5.5 0 001 12.5v1.793l-.854.853a.5.5 0 10.708.707L1.707 15H3.5a.5.5 0 00.354-.146L11 7.707l1.146 1.147a.5.5 0 00.708-.708l-.647-.646 3.147-3.146a1.207 1.207 0 000-1.708l-2-2zM2 12.707l7-7L10.293 7l-7 7H2v-1.293z" stroke="none"/>
  </svg>
)


const darken = value => chroma(value).desaturate(1.5).darken(1.7).hex()

const Home = () => {
  const [color, setValue] = useState('rgb(244, 62, 92)')
  const { open } = useEyeDropper()
  const setColor = value => setValue(value.replace('0)', '1)'))
  return (
    <Box css={{ color: color, $$outline: darken(color) }}>
      <Flex direction="column" justify="center" align="center" css={{ height: '100vh', gap: '$10 0' }}>
        <IconContainer>
          <Box css={{ pl: '100px' }}><Drop /></Box>
          <Box css={{ fontSize: '180px', mt: '-28px', pr: '150px' }}><BsDropletFill /></Box>
        </IconContainer>
        <Typography type="h1" css={{ letterSpacing: '-5px', fontWeight: '900' }}>useEyeDropper</Typography>
        <button onClick={() => open().then(color => setColor(color?.sRGBHex))}>Open</button>
      </Flex>
    </Box>
  )
}

export default Home
