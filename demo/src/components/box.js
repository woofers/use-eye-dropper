import { styled } from 'stitches'

export const Box = styled('div', {
  boxSizing: 'border-box',
  margin: 0,
  minWidth: 0
})

export const Inline = styled(Box, {
  display: 'inline'
})

export const Flex = styled(Box, {
  display: 'flex',
  variants: {
    direction: {
      column: {
        flexDirection: 'column'
      },
      row: {
        flexDirection: 'row'
      }
    },
    justify: {
      start: {
        justifyContent: 'flex-start'
      },
      between: {
        justifyContent: 'space-between'
      },
      around: {
        justifyContent: 'space-around'
      },
      evenly: {
        justifyContent: 'space-evenly'
      },
      center: {
        justifyContent: 'center'
      },
      end: {
        justifyContent: 'flex-end'
      }
    },
    align: {
      start: {
        alignItems: 'flex-start'
      },
      baseline: {
        alignItems: 'baseline'
      },
      center: {
        alignItems: 'center'
      },
      end: {
        alignItems: 'flex-end'
      },
      normal: {
        alignItems: 'normal'
      }
    }
  },
  defaultVariants: {
    direction: 'row',
    justify: 'start',
    align: 'normal'
  }
})

export const Stack = styled(Box, {
  $$space: '0',
  verticalAlign: 'baseline',
  '> *': {
    pt: '$$space'
  }
})
