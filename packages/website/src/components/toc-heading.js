import Link from 'components/client-link'
import Typography from 'components/typography'
import HoverLink from 'components/hover-link'

const TocHeading = ({ id, children, ...rest }) => (
  <Typography
    type={{ '@initial': 'h6', '@sm': 'h5' }}
    as="span"
    css={{ textTransform: 'lowercase', letterSpacing: '-0.5px' }}
  >
    <HoverLink href={`/${id}`} passHref scroll={false} shallow as={Link}>
      {children}
    </HoverLink>
  </Typography>
)

export default TocHeading
