import Typography from 'components/typography'
import HoverLink from 'components/hover-link'
import Link from 'components/client-link'
import { styled } from 'stitches'
import { PaperclipIcon } from 'icons'

const ClipLink = styled(props => <HoverLink {...props} as={Link} />, {
  position: 'relative',
  div: {
    display: 'inline-block',
    transform: 'translate(0, 0)',
    transition: 'transform 0.2s 0.05s ease-in-out'
  },
  svg: {
    position: 'absolute',
    top: '50%',
    left: '0',
    fontSize: '0.7em',
    opacity: 0,
    transform: 'translate(-0.7em, -50%)',
    transition:
      'opacity 0.2s 0.05s ease-in-out, transform 0.2s 0.05s ease-in-out'
  },
  '&:hover, &:focus': {
    div: {
      transform: 'translate(calc(0.7em + 0.18em), 0)'
    },
    svg: {
      transform: 'translate(0, -50%)',
      opacity: 1
    }
  },
  '@lg': {
    div: {
      transform: 'translate(0, 0)'
    },
    svg: {
      transform: 'translate(0, -50%)',
      opacity: 0
    },
    '&:hover, &:focus': {
      div: {
        transform: 'translate(0, 0)'
      },
      svg: {
        transform: 'translate(calc(-0.7em - 0.64em), -50%)',
        opacity: 1
      }
    }
  }
})

const AnchorHeading = ({ type, as, id, children, ...rest }) => (
  <Typography as={as} type={type}>
    <ClipLink {...rest} id={id} href={`/${id}`} passHref scroll={false} shallow>
      <PaperclipIcon aria-hidden />
      <div>{children}</div>
    </ClipLink>
  </Typography>
)

export default AnchorHeading
