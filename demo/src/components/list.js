import { styled } from 'stitches'
import { Box } from 'components/box'
import Typography from 'components/typography'

const Spacer = styled('span', {
  mr: '$2',
  color: '$$lightText',
  fontWeight: '900'
})

export const List = styled('ul', {})

export const ListItem = ({ children, showDivider = true }) => (
  <Typography type="body1" as="li">
    <Spacer aria-hidden>{showDivider ? '-' : ''}</Spacer>
    {children}
  </Typography>
)

export const InnerList = styled(Box, {
  my: '$2',
  pl: '$4'
})
