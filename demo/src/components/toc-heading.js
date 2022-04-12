import Link from 'next/link'
import Typography from 'components/typography'
import HoverLink from 'components/hover-link'

const TocHeading = ({ id, children, ...rest }) => (
  <Typography
    type={{ '@initial': 'h6', '@sm': 'h5' }}
    as="span"
    css={{ textTransform: 'lowercase', letterSpacing: '-0.5px' }}
  >
    <Link href={`/${id}`} passHref scroll={false}>
      <HoverLink>{children}</HoverLink>
    </Link>
  </Typography>
)

export default TocHeading
