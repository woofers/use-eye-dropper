import Global from 'components/global'
import Head from 'next/head'
import Fonts from 'components/google-fonts'
import { ThemeProvider } from 'components/theme-provider'

const App = ({ Component, pageProps }) => {
  return (
    <ThemeProvider>
      <Fonts fonts={['Red+Hat+Mono']}>
        <title>use-eye-dropper</title>
        <link
          href="/use-eye-dropper/fonts/albertsans/font.css"
          rel="stylesheet"
        />
        <link rel="icon" href="/use-eye-dropper/favicon.ico" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
      </Fonts>
      <Global />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default App
