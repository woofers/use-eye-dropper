import Global from 'components/global'
import GoogleFonts from 'components/google-fonts'

const App = ({ Component, pageProps }) => {
  return (
    <>
      <GoogleFonts
        fonts={['Cabin:wght@400;700']}
      >
        <link href="/use-eye-dropper/fonts/albertsans/font.css" rel="stylesheet" />
      </GoogleFonts>
      <Global />
      <Component {...pageProps} />
    </>
  )
}

export default App
