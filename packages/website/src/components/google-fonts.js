import React from 'react'
import { globalCss } from 'stitches'

const useGlobalStyles = globalCss({
  '@import': [
    `url('https://fonts.googleapis.com/css2?family=Red+Hat+Mono&display=swap')`
  ]
})

const GoogleFonts = ({ children }) => {
  useGlobalStyles()
  return null
}

export default GoogleFonts
