import { styled } from 'stitches'

const HoverLink = styled('a', {
  position: 'relative',
  textDecoration: 'none',
  color: 'currentColor',
  pb: '5px',
  transition: 'color 0.2s 0.0s ease-in-out, border-width 0.1s 0.0s ease-in-out',
  '&:hover, &:focus': {
    color: '$$lightText',
  },
})

export default HoverLink
