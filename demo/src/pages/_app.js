import Global from 'components/global'
import Head from 'next/head'
import GoogleFonts from 'components/google-fonts'
import Fonts from 'components/fonts'
import { ThemeProvider } from 'components/theme-provider'

const App = ({ Component, pageProps }) => {
  return (
    <ThemeProvider>
      <Fonts />
      <GoogleFonts>
        <title>use-eye-dropper</title>
        <link rel="icon" href="/use-eye-dropper/favicon.ico" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
      </GoogleFonts>
      <Global />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default App
