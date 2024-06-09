'use client'

import React from 'react'
import Global from 'components/global'
import GoogleFonts from 'components/google-fonts'
import Fonts from 'components/fonts'

const Providers = ({ children }) => (
  <>
    <Fonts />
    <GoogleFonts />
    <Global />
    {children}
  </>
)

export default Providers
