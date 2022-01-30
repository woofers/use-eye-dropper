import React, { useEffect, useRef, useState } from 'react'
import { styled, globalCss } from 'stitches'
import useEyeDropper from 'use-eye-dropper'
import Typography from 'components/typography'
import { Box, Flex } from 'components/box'
import Button from 'components/button'

const abortController = () => {
  if (typeof window === 'undefined') return
  return new AbortController()
}

const useBackground = globalCss({
  body: {
    backgroundColor: '#f9fafe'
  },
  '::selection': {
    background: 'rgba(0, 40, 255, 0.3) !important',
    color: '#314cf0 !important'
  }
})

const pattern =
  'linear-gradient(to right, rgba(192, 192, 192, 0.75), rgba(192, 192, 192, 0.75)), linear-gradient(to right, black 50%, white 50%), linear-gradient(to bottom, black 50%, white 50%);'

const Heading = props => <Typography type="h4" {...props} as="h1" />

const Color = props => <Typography type="h6" {...props} as="div" />

const Bold = props => <Typography type="button" noMargin as="span" {...props} />

const Text = props => <Typography type="body1" as="span" {...props} />

const Dropper = ({ onPick }) => {
  const [status, setStatus] = useState('None')
  const [error, setError] = useState(true)
  const timeout = useRef()
  const timeout2 = useRef()
  useEffect(() => {
    return () => {
      if (typeof timeout.current !== 'undefined') {
        clearTimeout(timeout.current)
      }
      if (typeof timeout2.current !== 'undefined') {
        clearTimeout(timeout2.current)
      }
    }
  }, [])
  const { open, close, isSupported } = useEyeDropper()
  const controller = useRef(abortController())
  const onClick = () => {
    const openPicker = async () => {
      const { signal } = controller.current
      try {
        const result = await open({ signal })
        setStatus(result.sRGBHex)
        setError(false)
      } catch (e) {
        if (!e.canceled) {
          setStatus(e.message)
          setError(true)
        }
      }
    }
    openPicker()
  }
  const background = status?.replace(/0\)/g, `1)`)
  const style = !error
    ? { background }
    : {
        backgroundImage: pattern,
        backgroundBlendMode: 'normal, difference, normal',
        backgroundSize: '2em 2em'
      }
  return (
    <>
      <Heading>EyeDropper</Heading>
      <Text>
        {isSupported()
          ? 'EyeDropper API is supported'
          : 'EyeDropper API unavailable'}
      </Text>
      <Flex
        align="end"
        css={{ gap: '0 $4', height: '128px', color: '$slate400' }}
      >
        <Box css={{ ...style, padding: '$9', maxWidth: '$9', br: '$4' }} />
        <Color aria-label="Status" css={{ pb: '$2' }}>{status}</Color>
      </Flex>
      <Flex css={{ gap: '0 $6' }}>
        <Button onClick={onClick}>
          <Bold>Open</Bold>
        </Button>
        <Button onClick={close} type="minimal" css={{ minWidth: 'unset' }}>
          <Bold>Close</Bold>
        </Button>
        <Button
          onClick={() => (timeout2.current = setTimeout(() => close(), 1000))}
          type="minimal"
          css={{ minWidth: 'unset' }}
        >
          <Bold>Close after 1s</Bold>
        </Button>
      </Flex>
      <Flex css={{ gap: '0 $3' }}>
        <Button
          onClick={() => (controller.current = abortController())}
          type="minimal"
        >
          <Bold>Reset controller</Bold>
        </Button>
        <Button onClick={() => controller.current.abort()} type="minimal">
          <Bold>Abort controller now</Bold>
        </Button>
        <Button
          onClick={() =>
            (timeout.current = setTimeout(
              () => controller.current.abort(),
              1000
            ))
          }
          type="minimal"
        >
          <Bold>Abort controller after 1s</Bold>
        </Button>
      </Flex>
    </>
  )
}

const Sandbox = () => {
  useBackground()
  const [mount, setMount] = useState(true)
  const timeout = useRef()
  useEffect(() => {
    return () => {
      if (typeof timeout.current === 'undefined') return
      clearTimeout(timeout.current)
    }
  }, [])
  return (
    <Flex
      direction="column"
      css={{
        gap: '$5 0',
        px: '$7',
        py: '$8',
        $$text: '#222328',
        $$background: '#fff'
      }}
    >
      <Flex css={{ pb: '$6', gap: '0 $3' }}>
        <Button onClick={() => setMount(value => !value)}>
          <Bold>{mount ? 'Unmount' : 'Mount'}</Bold>
        </Button>
        {mount && (
          <Button
            onClick={() => {
              timeout.current = setTimeout(() => setMount(false), 1000)
            }}
            type="minimal"
          >
            <Bold>Unmount after 1s</Bold>
          </Button>
        )}
      </Flex>
      {mount && <Dropper />}
    </Flex>
  )
}

export default Sandbox
