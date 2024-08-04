'use client'
import {
  useEffect,
  useCallback,
  memo,
  useSyncExternalStore,
  useMemo
} from 'react'
import Link from 'components/client-link'
import { useRouter } from 'next/navigation'
import useEyeDropper from 'use-eye-dropper'
import { Box, Flex } from 'components/box'
import Logo from 'components/logo'
import Dropper from 'components/dropper'
import AnchorHeading from 'components/anchor-heading'
import TocHeading from 'components/toc-heading'
import { toTitle, scrollTo, scrollToTop } from 'utils'
import {
  motion,
  useTransform,
  useScroll,
  useMotionTemplate
} from 'framer-motion'
import { sections } from 'utils/sections'
import useCookie from 'hooks/use-cookie'
import chroma from 'chroma-js'

const useScrollListItems = ({ section: path }) => {
  const router = useRouter()
  useEffect(() => {
    if (!path) {
      scrollToTop()
    } else {
      scrollTo(path)
    }
  }, [path, router])
  return null
}

export const Scroll = ({ section }) => {
  useScrollListItems({ section })
  return null
}

const useScrollValues = () => {
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(
    scrollYProgress,
    value => 1 - Math.pow(value, 0.5)
  )
  const opacityDocs = useTransform(scrollYProgress, value =>
    Math.max(value * 2.8, 0)
  )
  const blurValue = useTransform(scrollYProgress, value => value * 2 * 10)
  const blur = useMotionTemplate`blur(${blurValue}px)`
  const scaleValue = useTransform(scrollYProgress, value =>
    Math.max(1 * (1 - value), 0.67)
  )
  const nav = useTransform(scrollYProgress, value => Math.min(value * 500, 300))
  const translateValue = useTransform(scrollYProgress, value => -250 * value)
  const transform = useMotionTemplate`scale(${scaleValue}px)`
  const events = useTransform(scrollYProgress, value =>
    value === 0 ? 'all' : 'none'
  )
  return { opacity, opacityDocs, blur, scaleValue, nav, translateValue, events }
}

const Meta = ({ name, content }) => {
  useEffect(() => {
    if (typeof document === 'undefined') return
    const meta = document.querySelector(`meta[name="${name}"]`)
    if (meta) {
      meta.setAttribute('content', content)
    }
  }, [name, content])
  return null
}

const defaultColor = '#0074e0'
const subscribe = () => {}
const getSnapshot = () => {
  const element = document.body.children?.[0]
  if (element) {
    const computed = window.getComputedStyle(element)
    const color = computed.getPropertyValue('--dropper-color')
    if (color) return color
  }
  return defaultColor
}
const getServerSnapshop = () => defaultColor

const Home = memo(({ children }) => {
  const color = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshop)
  const [_, setValue] = useCookie('color', color)
  const {
    opacity,
    opacityDocs,
    blur,
    scaleValue,
    nav,
    translateValue,
    events
  } = useScrollValues()
  const { open, isSupported } = useEyeDropper()
  const setColor = useCallback(
    value => {
      const color = value.replace('0)', '1)')
      setValue(color)
      if (typeof window !== 'undefined' && window.ued) {
        window.ued.setPropFromColor(color)
      }
    },
    [setValue]
  )

  const pickColor = useCallback(() => {
    const openPicker = async () => {
      try {
        const color = await open()
        setColor(color.sRGBHex)
      } catch (e) {
        // fall-through
      }
    }
    openPicker()
  }, [open, setColor])
  const colorText = chroma(color).hex()
  return (
    <>
      <Meta name="theme-color" content="var(--dropper-background)" />
      <Meta
        name="msapplication-navbutton-color"
        content="var(--dropper-background)"
      />
      <Meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <Meta name="apple-mobile-web-app-capable" content="yes" />
      <Box
        css={{
          $$outline: 'var(--dropper-outline)',
          $$background: 'var(--dropper-background)',
          $$background88: 'var(--dropper-background88)',
          $$background0: 'var(--dropper-background0)',
          $$lightText: 'var(--dropper-lightText)',
          $$text: 'var(--dropper-text)',
          color: 'var(--dropper-color)',
          backgroundColor: '$$background',
          minHeight: '100vh'
        }}
      >
        <Flex
          justify="between"
          css={{
            fontSize: '92px',
            width: 'calc(100% + 300px)',
            ml: 'auto',
            zIndex: 50,
            height: '120px',
            background:
              'linear-gradient(180deg, $$background 0%, $$background88 34%, $$background0 100%)',
            position: 'fixed',
            top: 0,
            right: 0,
            color: '$$text'
          }}
          as={motion.div}
          style={{
            translateX: nav,
            pointerEvents: events
          }}
        >
          <Flex
            css={{
              pt: '$5',
              pb: '$2',
              px: '$5',
              textDecoration: 'none',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              height: 'max-content',
              pointerEvents: 'all'
            }}
            as={Link}
            aria-label="Scroll to top"
            href="/"
            passHref
            scroll={false}
            shallow
          >
            <Logo size="small" as="div" />
          </Flex>

          <Flex
            direction="column"
            css={{ gap: '$1 0', pt: '$5', pr: '$5', '@sm': { gap: '$2 0' } }}
            as={motion.div}
            style={{
              opacity,
              filter: blur
            }}
          >
            {sections.map(section => (
              <TocHeading key={section} id={section}>
                {toTitle(section)}
              </TocHeading>
            ))}
          </Flex>
        </Flex>
        <Flex
          direction="column"
          align="center"
          css={{
            pt: '0',
            gap: '$10 0',
            position: 'sticky',
            top: 0,
            '@sm': { pt: '12vh' }
          }}
          as={motion.div}
          style={{
            opacity,
            filter: blur,
            scale: scaleValue,
            translateY: translateValue,
            pointerEvents: events
          }}
        >
          <Dropper
            colorText={colorText}
            supported={isSupported()}
            onClick={pickColor}
          />
        </Flex>
        <Box
          as={motion.div}
          style={{ opacity: opacityDocs }}
          css={{
            px: '14px',
            maxWidth: '844px',
            mx: 'auto',
            color: '$$text',
            py: '$10',
            display: 'flex',
            flexDirection: 'column',
            gap: '$4 0',
            '@sm': {
              px: '$3'
            }
          }}
        >
          <AnchorHeading id="documentation" type="h3" as="h2">
            Documentation
          </AnchorHeading>
          {children}
        </Box>
      </Box>
    </>
  )
})
Home.displayName = 'Home'

export default Home
