import { styled } from 'stitches'
import { Box } from 'components/box'
import Button from 'components/button'
import Typography from 'components/typography'
import Logo from 'components/logo'
import { copyToClipboard } from 'utils'
import {
  BanIcon,
  CopyIcon,
  ExternalLinkIcon,
  DropperIcon,
  DropIcon
} from 'icons'

const IconContainer = styled(Box, {
  fontSize: '240px',
  mt: '-108px',
  transform: 'scale(calc(1 / 1.5)) translate(40px, 230px)',
  '@sm': { mt: '0px', transform: 'none' }
})

const DropButton = ({ onClick, supported }) => (
  <>
    {supported ? (
      <Button css={{ mt: '-64px', '@sm': { mt: '0px' } }} onClick={onClick}>
        <DropperIcon aria-hidden />
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
        <BanIcon aria-hidden />
        <Typography noMargin type="button" as="span">
          Browser not supported
        </Typography>
        <ExternalLinkIcon aria-label="External link" strokeWidth="2.5px" />
      </Button>
    )}
  </>
)

const ColorDropperIcon = () => (
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
        clipPath: 'inset(2px 0px 0px 0px)'
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

const Dropper = ({ colorText, onClick, supported }) => {
  return (
    <>
      <IconContainer>
        <Box css={{ pl: '100px' }}>
          <ColorDropperIcon />
        </Box>
        <Box css={{ fontSize: '180px', mt: '-28px', pr: '150px' }}>
          <DropIcon />
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
          <CopyIcon />
        </Button>
      </IconContainer>
      <Logo
        size={{ '@initial': 'small', '@sm': 'normal' }}
        css={{ mt: '-8px', '@sm': { mt: '0px' } }}
      />
      <DropButton onClick={onClick} supported={supported} />
    </>
  )
}

export default Dropper
