'use client'
import { useEffect, useState, useCallback, memo } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { globalCss } from 'stitches'
import useEyeDropper from 'use-eye-dropper'
import { Box, Flex } from 'components/box'
import Logo from 'components/logo'
import Dropper from 'components/dropper'
import AnchorHeading from 'components/anchor-heading'
import TocHeading from 'components/toc-heading'
import {
  toTitle,
  alpha,
  toHex,
  contrast,
  scale,
  getAccent,
  getBackground,
  scrollTo,
  scrollToTop,
  setBodyBackground
} from 'utils'
import {
  motion,
  useTransform,
  useScroll,
  useMotionTemplate
} from 'framer-motion'
import { sections } from 'utils/sections'

const useBackground = globalCss({
  body: {
    backgroundColor: 'var(--body-background, rgb(0, 116, 224))'
  }
})

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

const Home = memo(({ children }) => {
  useBackground()
  useEffect(() => {
    console.log('m')
    return () => {
      console.log('unmouint')
    }
  })
  const [color, setValue] = useState('rgb(0, 116, 224)')
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
  const setColor = useCallback(value => {
    const color = value.replace('0)', '1)')
    setValue(color)
    setBodyBackground(color)
  }, [])
  const colors = scale(color)
  const [backgroundColor, swap] = getBackground(colors)
  const accent = getAccent(colors)
  const lightText = swap ? color : accent
  const text = !swap ? color : accent
  const colorText = toHex(color)
  const apple =
    contrast('#FFF', backgroundColor) > 1.6 ? 'black-translucent' : 'default'
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
  return (
    <>
      <Head>
        <meta name="theme-color" content={backgroundColor} />
        <meta name="msapplication-navbutton-color" content={backgroundColor} />
        <meta name="apple-mobile-web-app-status-bar-style" content={apple} />
        <meta name="apple-mobile-web-app-capable" content="yes" />
      </Head>
      <Box
        css={{
          color: color,
          $$outline: accent,
          $$background: backgroundColor,
          $$background88: alpha(backgroundColor, 0.88),
          $$background0: alpha(backgroundColor, 0),
          backgroundColor: '$$background',
          $$lightText: lightText,
          $$text: text,
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
          <Link href="/" passHref scroll={false} legacyBehavior>
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
              as="a"
              aria-label="Scroll to top"
            >
              <Logo size="small" as="div" />
            </Flex>
          </Link>
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
