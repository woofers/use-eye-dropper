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
      </Fonts>
      <Global />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default App
