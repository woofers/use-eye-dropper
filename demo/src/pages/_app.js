import Global from 'components/global'
import Head from 'next/head'

const App = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>use-eye-dropper</title>
        <link href="/use-eye-dropper/fonts/albertsans/font.css" rel="stylesheet" />
        <link rel="icon" href="/use-eye-dropper/favicon.ico" />
      </Head>
      <Global />
      <Component {...pageProps} />
    </>
  )
}

export default App
