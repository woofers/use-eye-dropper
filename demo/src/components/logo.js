import { styled } from 'stitches'
import Typography from 'components/typography'
import { Inline } from 'components/box'

const BoldText = styled(Typography, {
  fontWeight: '900 !important',
  variants: {
    size: {
      normal: {
        letterSpacing: '-5px !important',
      },
      small: {
        letterSpacing: '-1.8px !important',
      },
    },
  },
  defaultVariants: {
    type: 'normal',
  },
})

const sizes = {
  normal: 'h1',
  small: 'h4',
}

const getType = size => {
  if (typeof size === 'string') {
    return sizes[size] || sizes['normal']
  }
  if (typeof size !== 'object') return size
  const arr = Object.entries(size)
  const transform = arr.reduce((acc, [key, value]) => {
    acc[key] = sizes[value] || sizes['normal']
    return acc
  }, {})
  return transform
}

const Logo = ({ size, as = 'h1', css, ...rest }) => {
  return (
    <BoldText type={getType(size)} as={as} size={size} {...rest}>
      <Inline css={{ color: '$$lightText' }}>use</Inline>
      <Inline css={{ color: '$$text' }}>EyeDropper</Inline>
    </BoldText>
  )
}

export default Logo
