import Head from 'next/head'
import Image from 'next/image'
import { styled } from 'stitches'
import { Flex } from 'components/box'
import Typography from 'components/typography'
import { BsDropletFill, BsEyedropper } from 'react-icons/bs'

const IconContainer = styled(Flex, {
  fontSize: '300px',
  color: '$rose500'
})

const Home = () => {
  return (
    <div>
      <Flex direction="column" align="center">
        <IconContainer justify="center" align="center">
          <BsDropletFill />
          <BsEyedropper />
        </IconContainer>
        <Typography type="h1" css={{ letterSpacing: '-6px' }}>useEyeDroper</Typography>
      </Flex>
    </div>
  )
}

export default Home
