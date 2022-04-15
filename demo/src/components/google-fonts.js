import React from 'react'
import Head from 'next/head'
import { globalCss } from 'stitches'

const useGlobalStyles = globalCss({
  '@import': [
    `url('https://fonts.googleapis.com/css2?family=Red+Hat+Mono&display=swap')`
  ]
})

const Global = ({ children }) => {
  return <>{children}</>
}

const GoogleFonts = ({ children }) => {
  useGlobalStyles()
  return (
    <Head>
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com/"
        crossOrigin="true"
      />
      {children}
    </Head>
  )
}

export default GoogleFonts
