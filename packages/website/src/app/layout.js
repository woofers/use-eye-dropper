import Providers from './providers'
import StitchesRegistry from './registry'

const RootLayout = ({ children }) => (
  <html lang="en">
    <head>
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com/"
        crossOrigin="true"
      />
      <script
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.className = 'js'`
        }}
      ></script>
    </head>
    <body className="light">
      <div id="__next">
        <StitchesRegistry>
          <Providers>{children}</Providers>
        </StitchesRegistry>
      </div>
    </body>
  </html>
)

export default RootLayout
