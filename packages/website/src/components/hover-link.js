import { forwardRef } from 'react'
import { styled } from 'stitches'
import { ExternalLinkIcon } from 'icons'

const Link = styled('a', {
  position: 'relative',
  textDecoration: 'none',
  color: '$$linkText',
  transition: 'color 0.2s 0.0s ease-in-out, border-width 0.1s 0.0s ease-in-out',
  '&:hover, &:focus': {
    color: '$$linkHover'
  },
  variants: {
    type: {
      primary: {
        $$linkText: '$$lightText',
        $$linkHover: 'currentColor',
        fontWeight: 700
      },
      minimal: {
        $$linkText: 'currentColor',
        $$linkHover: '$$lightText',
        pb: '5px'
      }
    }
  },
  defaultVariants: {
    type: 'minimal'
  }
})

const HoverLink = forwardRef(({ target, children, ...rest }, ref) => (
  <Link target={target} ref={ref} {...rest}>
    {children}
    {target && target != '_self' && (
      <>
        {' '}
        <ExternalLinkIcon aria-label="External link" strokeWidth="2.5px" />
      </>
    )}
  </Link>
))

HoverLink.displayName = 'HoverLink'

export default HoverLink
