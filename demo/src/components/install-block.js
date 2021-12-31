import { Fragment } from 'react'
import { styled } from 'stitches'
import { Flex } from 'components/box'
import Typography from 'components/typography'
import { IoLogoNpm } from 'react-icons/io'
import { FaYarn } from 'react-icons/fa'
import { FiCopy } from 'react-icons/fi'
import HoverLink from 'components/hover-link'

const Yarn = styled(FaYarn, {
  width: '30px',
  height: '100%',
})

const Npm = styled(IoLogoNpm, {
  width: '62px',
  height: '100%',
})

const Logos = {
  npm: Npm,
  yarn: Yarn,
}

const InstallBlock = ({ type, children }) => {
  const Logo = Logos[type] || Fragment
  return (
    <HoverLink
      as="button"
      css={{
        width: 'max-content',

        background: 'none',
        border: 'none',
        cursor: 'pointer',
      }}
    >
      <Flex
        css={{
          height: '48px',
          br: '$3',
          overflow: 'hidden',
        }}
      >
        <Flex
          justify="center"
          css={{
            width: '84px',
            height: '48px',
            br: '$3',
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
          }}
        >
          <Logo />
        </Flex>
        <Flex
          css={{ flex: '1 1 auto', pl: '$5', pr: '$4', gap: '0 $3' }}
          justify="center"
          align="center"
        >
          <Typography noMargin type="button">
            {children}
          </Typography>
          <FiCopy style={{ fontSize: '22px' }} />
        </Flex>
      </Flex>
    </HoverLink>
  )
}

export default InstallBlock
