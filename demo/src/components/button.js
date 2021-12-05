import { styled } from 'stitches'

const Button = styled('button', {
  border: 'none',
  background: '$$text',
  color: '$$background',
  cursor: 'pointer',
  padding: '$4 $7',
  br: '$pill',
  display: 'inline-flex',
  alignItems: 'center',
  fontSize: '$button',
  gap: '$0 $2',
  textDecoration: 'none',
  justifyContent: 'center',
  minWidth: '188px',
  '&:disabled': {
    cursor: 'not-allowed'
  }
})

export default Button
