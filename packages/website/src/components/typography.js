import { styled } from 'stitches'

const Typography = styled('p', {
  margin: 0,
  fontFamily: '$sansSerif',
  color: '$current',
  variants: {
    type: {
      h1: {
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
      },
      h2: {
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
      },
      h3: {
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
      },
      h4: {
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
      },
      h5: {
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
      },
      h6: {
        fontSize: '$h6',
        fontWeight: '$medium',
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
      },
      subtitle1: {
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
      },
      subtitle2: {
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
      },
      body1: {
        fontSize: '$body1',
        fontWeight: '$regular',
        letterSpacing: '$body1',
        lineHeight: '$body1',
        mb: '$2',
        '&::before': {
          content: "''",
          marginBottom: '-0.4667em',
          display: 'table'
        },
        '&::after': {
          content: "''",
          marginTop: '-0.4667em',
          display: 'table'
        }
      },
      body2: {
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
      },
      button: {
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
      },
      overline: {
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
      }
    },
    noMargin: {
      true: {
        mb: '0 !important'
      }
    }
  },
  defaultVariants: {
    type: 'body1'
  }
})

export default Typography
