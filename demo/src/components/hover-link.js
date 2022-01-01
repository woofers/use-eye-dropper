import { styled } from 'stitches'
import { FiExternalLink } from 'react-icons/fi'

const Link = styled('a', {
  position: 'relative',
  textDecoration: 'none',
  color: '$$linkText',
  transition: 'color 0.2s 0.0s ease-in-out, border-width 0.1s 0.0s ease-in-out',
  '&:hover, &:focus': {
    color: '$$linkHover',
  },
  variants: {
    type: {
      primary: {
        $$linkText: '$$lightText',
        $$linkHover: 'currentColor',
        fontWeight: 700,
      },
      minimal: {
        $$linkText: 'currentColor',
        $$linkHover: '$$lightText',
        pb: '5px',
      },
    },
  },
  defaultVariants: {
    type: 'minimal',
  },
})

const HoverLink = ({ target, children, ...rest }) => (
  <Link target={target} {...rest}>
    {children}
    {target && target != '_self' && (
      <>
        {' '}
        <FiExternalLink aria-label="External link" strokeWidth="2.5px" />
      </>
    )}
  </Link>
)

export default HoverLink
