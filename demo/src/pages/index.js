import Head from 'next/head'
import Image from 'next/image'
import { styled } from 'stitches'
import { Box, Flex } from 'components/box'
import Typography from 'components/typography'
import { BsDropletFill, BsEyedropper } from 'react-icons/bs'

const IconContainer = styled(Box, {
  fontSize: '240px',
  position: 'relative',
  color: '$rose500'
})

const Home = () => {
  return (
    <div>
      <Flex direction="column" justify="center" align="center" css={{ height: '100vh', gap: '$10 0' }}>
        <IconContainer>
          <Box css={{ pl: '100px' }}><BsEyedropper /></Box>
          <Box css={{ fontSize: '180px', mt: '-28px', pr: '150px' }}><BsDropletFill /></Box>
        </IconContainer>
        <Typography type="h1" css={{ color: '$rose500', letterSpacing: '-5px', fontWeight: '900' }}>useEyeDroper</Typography>
      </Flex>
    </div>
  )
}

export default Home
