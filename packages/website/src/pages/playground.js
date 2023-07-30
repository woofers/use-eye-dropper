import React, { useEffect, useRef, useState } from 'react'
import { styled, globalCss } from 'stitches'
import useEyeDropper from 'use-eye-dropper'
import Typography from 'components/typography'
import { Box, Flex } from 'components/box'
import Button from 'components/button'
import Head from 'next/head'

const delay = 100

const abortController = () => {
  if (typeof window === 'undefined') return
  return new AbortController()
}

const useCancelTimeout = () => {
  const ref = useRef()
  useEffect(() => {
    return () => {
      if (typeof ref.current === 'undefined') return
      clearTimeout(ref.current)
      ref.current = null
    }
  }, [])
  return ref
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

const Status = ({ children, css, ariaLabel = 'Status' }) => (
  <Color aria-label={ariaLabel} css={{ pb: '$2', ...css }}>
    {children}
  </Color>
)

const Heading = props => <Typography type="h4" {...props} as="h1" />

const Color = props => <Typography type="h6" {...props} as="div" />

const Bold = props => <Typography type="button" noMargin as="span" {...props} />

const Text = props => <Typography type="body1" as="span" {...props} />

const Dropper = ({ children, onPick, setStatus, setInternal }) => {
  const [error, setError] = useState(true)
  const [done, setDone] = useState('')
  const timeout = useCancelTimeout()
  const timeout2 = useCancelTimeout()
  const { open, close, isSupported } = useEyeDropper()
  const controller = useRef(abortController())
  const onClick = () => {
    const openPicker = async () => {
      const { signal } = controller.current
      try {
        const result = await open({ signal })
        setStatus(result.sRGBHex)
        setInternal(result.sRGBHex)
        setError(false)
      } catch (e) {
        if (!e.canceled) {
          setError(true)
          setInternal(e.message)
        }
        setStatus(e.message)
      }
    }
    openPicker()
  }
  const background = children?.replace(/0\)/g, `1)`)
  const style = !error
    ? { background }
    : {
        backgroundImage: pattern,
        backgroundBlendMode: 'normal, difference, normal',
        backgroundSize: '2em 2em'
      }
  return (
    <>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
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
        <Status>{children}</Status>
        <Color>{done && 'Done'}</Color>
      </Flex>
      <Flex css={{ gap: '0 $6' }}>
        <Button onClick={onClick}>
          <Bold>Open</Bold>
        </Button>
        <Button onClick={close} type="minimal" css={{ minWidth: 'unset' }}>
          <Bold>Close</Bold>
        </Button>
        <Button
          onClick={() =>
            (timeout2.current = setTimeout(() => {
              close()
              setDone(true)
            }, delay))
          }
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
            (timeout.current = setTimeout(() => {
              controller.current.abort()
              setDone(true)
            }, delay))
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
  const [status, setStatus] = useState('None')
  const [internal, setInternal] = useState('None')
  const timeout = useCancelTimeout()
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
      <Flex css={{ pb: '$6', gap: '0 $3' }} align="center">
        <Button onClick={() => setMount(value => !value)}>
          <Bold>{mount ? 'Unmount' : 'Mount'}</Bold>
        </Button>
        {mount ? (
          <Button
            onClick={() => {
              timeout.current = setTimeout(() => setMount(false), delay)
            }}
            type="minimal"
          >
            <Bold>Unmount after 1s</Bold>
          </Button>
        ) : (
          <>
            <Status css={{ pt: '$2', pb: 0, px: '$6' }}>{status}</Status>
            <Status css={{ pt: '$2', pb: 0, px: '$6' }} ariaLabel="Internal">
              Internal: {internal}
            </Status>
          </>
        )}
      </Flex>
      {mount && (
        <Dropper setStatus={setStatus} setInternal={setInternal}>
          {status}
        </Dropper>
      )}
    </Flex>
  )
}

export default Sandbox
