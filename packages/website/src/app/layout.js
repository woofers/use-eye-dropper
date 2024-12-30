import { ColorScript } from '../components/color-script'
import Providers from './providers'
import StitchesRegistry from './registry'
import Script from 'next/script'

/* eslint-disable @next/next/no-sync-scripts */

const baseUrl =
  process.env.NODE_ENV === 'production'
    ? new URL('https://jaxs.onl/use-eye-dropper')
    : new URL('http://localhost:3000/use-eye-dropper')

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com/"
          crossOrigin="true"
        />
        <script src={`${baseUrl}/chroma.js`}></script>
        <script src={`${baseUrl}/colors.js`}></script>
      </head>
      <body className="light" suppressHydrationWarning>
        <div
          id="__next"
          style={{
            '--dropper-color': '#0074e0',
            '--dropper-outline': '#abbbf2',
            '--dropper-background': '#003897',
            '--dropper-background88': '#003897e0',
            '--dropper-background0': '#00389700',
            '--dropper-lightText': '#0074e0',
            '--dropper-text': '#abbbf2',
            '--dropper-colorText': '#0074e0',
            '--dropper-apple': 'black-translucent'
          }}
          suppressHydrationWarning
        >
          <ColorScript />
          <StitchesRegistry>
            <Providers>{children}</Providers>
          </StitchesRegistry>
        </div>
      </body>
    </html>
  )
}

export default RootLayout
