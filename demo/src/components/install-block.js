import { Fragment } from 'react'
import { styled } from 'stitches'
import { Flex } from 'components/box'
import Typography from 'components/typography'
import { IoLogoNpm } from 'react-icons/io'
import { FaYarn } from 'react-icons/fa'

const Yarn = styled(FaYarn, {
  width: '30px',
  height: '100%',
  color: '$$text',
})

const Npm = styled(IoLogoNpm, {
  width: '62px',
  height: '100%',
  color: '$$text',
})

const Logos = {
  npm: Npm,
  yarn: Yarn
}

const InstallBlock = ({ type, children }) => {
  const Logo = Logos[type] || Fragment
  return (
    <Flex
      css={{
        width: 'max-content',
        height: '48px',
        br: '$3',
        overflow: 'hidden'
      }}
    >
      <Flex
        justify="center"
        css={{
          background: '$$lightText',
          width: '84px',
          height: '48px',
          br: '$3',
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0
        }}
      >
        <Logo />
      </Flex>
      <Flex
        css={{ flex: '1 1 auto', color: '$$background',         background: '$$text', px: '$5' }}
        justify="center"
        align="center"
      >
        <Typography noMargin type="button">
          {children}
        </Typography>
      </Flex>
    </Flex>

  )
}

export default InstallBlock
