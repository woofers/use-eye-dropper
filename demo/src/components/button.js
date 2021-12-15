import { styled } from 'stitches'

const Button = styled('button', {
  border: 'none',
  background: '$$buttonColor',
  color: '$$buttonText',
  cursor: 'pointer',
  padding: '$4 $7',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '$0 $2',
  textDecoration: 'none',
  justifyContent: 'center',
  minWidth: '188px',
  '&:disabled': {
    cursor: 'not-allowed',
  },
  variants: {
    type: {
      primary: {
        $$buttonText: '$$background',
        $$buttonColor: '$$text',
        fontSize: '$button',
        br: '$pill',
      },
      minimal: {
        $$buttonText: 'currentColor',
        $$buttonColor: 'none',
        fontSize: '$h3',
        display: 'flex',
        br: '$3',
        px: '$1',
      },
    },
  },
  defaultVariants: {
    type: 'primary',
  },
})

export default Button
