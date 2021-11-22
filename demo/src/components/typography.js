import { styled } from 'stitches'

const Base = styled('div', {
  margin: 0,
  fontFamily: '$sansSerif',
  color: '$current',
  variants: {
    noMargin: {
      true: {
        mb: '0'
      }
    }
  }
})

const Heading = styled(Base, {})

const Heading1 = styled(Heading, {
  fontSize: '$h1',
  fontWeight: '$bold',
  lineHeight: '$h1',
  letterSpacing: '$h1',
  mb: '$6',
  '&::before': {
    content: "''",
    marginBottom: '-0.175em',
    display: 'table'
  },
  '&::after': {
    content: "''",
    marginTop: '-0.175em',
    display: 'table'
  }
})

const Heading2 = styled(Heading, {
  fontSize: '$h2',
  fontWeight: '$semiBold',
  lineHeight: '$h2',
  mb: '$5',
  letterSpacing: '$h2',
  '&::before': {
    content: "''",
    marginBottom: '-0.1909em',
    display: 'table'
  },
  '&::after': {
    content: "''",
    marginTop: '-0.1909em',
    display: 'table'
  }
})

const Heading3 = styled(Heading, {
  fontSize: '$h3',
  fontWeight: '$bold',
  lineHeight: '$h3',
  letterSpacing: '$h3',
  mb: '$4',
  '&::before': {
    content: "''",
    marginBottom: '-0.2188em',
    display: 'table'
  },
  '&::after': {
    content: "''",
    marginTop: '-0.2188em',
    display: 'table'
  }
})

const Heading4 = styled(Heading, {
  fontSize: '$h4',
  fontWeight: '$semiBold',
  lineHeight: '$h4',
  letterSpacing: '$h4',
  mb: '$3',
  '&::before': {
    content: "''",
    marginBottom: '-0.2917em',
    display: 'table'
  },
  '&::after': {
    content: "''",
    marginTop: '-0.2917em',
    display: 'table'
  }
})

const Heading5 = styled(Heading, {
  fontSize: '$h5',
  fontWeight: '$medium',
  lineHeight: '$h5',
  letterSpacing: '$h5',
  mb: '$2',
  '&::before': {
    content: "''",
    marginBottom: '-0.21em',
    display: 'table'
  },
  '&::after': {
    content: "''",
    marginTop: '-0.21em',
    display: 'table'
  }
})

const Heading6 = styled(Heading, {
  fontSize: '$h6',
  fontWeight: '$semiBold',
  lineHeight: '$h6',
  letterSpacing: '$h6',
  mb: '$2',
  '&::before': {
    content: "''",
    marginBottom: '-0.2625em',
    display: 'table'
  },
  '&::after': {
    content: "''",
    marginTop: '-0.2625em',
    display: 'table'
  }
})

const Subtitle = styled(Base, {})

const Subtitle1 = styled(Subtitle, {
  fontSize: '$subtitle1',
  letterSpacing: '$subtitle1',
  fontWeight: '$regular',
  lineHeight: '$subtitle1',
  mb: '$2',
  '&::before': {
    content: "''",
    marginBottom: '-0.35em',
    display: 'table'
  },
  '&::after': {
    content: "''",
    marginTop: '-0.35em',
    display: 'table'
  }
})

const Subtitle2 = styled(Subtitle, {
  fontSize: '$subtitle2',
  letterSpacing: '$subtitle2',
  fontWeight: '$medium',
  lineHeight: '$subtitle2',
  mb: '$1',
  '&::before': {
    content: "''",
    marginBottom: '-0.35em',
    display: 'table'
  },
  '&::after': {
    content: "''",
    marginTop: '-0.35em',
    display: 'table'
  }
})

const Body = styled(Base, {})

const Body1 = styled(Body, {
  fontSize: '$body1',
  fontWeight: '$regular',
  letterSpacing: '$body1',
  lineHeight: '$body1',
  mb: '$2',
  '&::before': {
    content: "''",
    marginBottom: '-0.2333em',
    display: 'table'
  },
  '&::after': {
    content: "''",
    marginTop: '-0.2333em',
    display: 'table'
  }
})

const Body2 = styled(Body, {
  fontSize: '$body2',
  letterSpacing: '$body2',
  fontWeight: '$regular',
  lineHeight: '$body2',
  mb: '$1',
  '&::before': {
    content: "''",
    marginBottom: '-0.35em',
    display: 'table'
  },
  '&::after': {
    content: "''",
    marginTop: '-0.35em',
    display: 'table'
  }
})

const Button = styled(Base, {
  fontSize: '$button',
  letterSpacing: '$button',
  lineHeight: '$button',
  fontWeight: '$semiBold',
  mb: '$2',
  display: 'block',
  '&::before': {
    content: "''",
    marginBottom: '-0.35em',
    display: 'table'
  },
  '&::after': {
    content: "''",
    marginTop: '-0.35em',
    display: 'table'
  }
})

const Overline = styled(Base, {
  fontSize: '$overline',
  letterSpacing: '$overline',
  lineHeight: '$overline',
  fontWeight: '$light',
  textTransform: 'uppercase',
  mb: '$2',
  '&::before': {
    content: "''",
    marginBottom: '-0.2333em',
    display: 'table'
  },
  '&::after': {
    content: "''",
    marginTop: '-0.2333em',
    display: 'table'
  }
})

const variants = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  subtitle1: 'h6',
  subtitle2: 'h6',
  body1: 'p',
  body2: 'p',
  button: 'span',
  overline: 'p'
}

const Components = {
  h1: Heading1,
  h2: Heading2,
  h3: Heading3,
  h4: Heading4,
  h5: Heading5,
  h6: Heading6,
  subtitle1: Subtitle1,
  subtitle2: Subtitle2,
  body1: Body1,
  body2: Body2,
  button: Button,
  overline: Overline
}

const Typography = ({ type, as, ...rest }) => {
  const lowercase = typeof type === 'string' ? type.toLowerCase() : ''
  const typeProp = lowercase in variants ? lowercase : 'body1'
  const asProp = as || variants[typeProp]
  const Component = Components[typeProp]
  return <Component as={asProp} {...rest} />
}

export default Typography
