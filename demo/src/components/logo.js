import Typography from 'components/typography'
import { Inline } from 'components/box'

const Logo = ({ size = 'normal' }) => {
  const isNormal = size === 'normal'
  const type = isNormal ? 'h1' : 'h4'
  const spacing = isNormal ? '-5px' : '-1.8px'
  return (
    <Typography type={type} css={{ letterSpacing: spacing, fontWeight: '900' }}>
      <Inline css={{ color: '$$lightText' }}>use</Inline>
      <Inline css={{ color: '$$text' }}>EyeDropper</Inline>
    </Typography>
  )
}

export default Logo
