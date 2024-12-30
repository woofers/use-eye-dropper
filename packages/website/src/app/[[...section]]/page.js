import Root, { Scroll } from 'features/root'
import { getPaths } from 'utils/sections'
import { getMdxContent } from 'utils/content'
import MdxContent from './_mdx-content'

const name = 'Jaxson Van Doorn'

const title = 'use-eye-dropper'
const description = 'Browser color picker hook for React'

export const viewport = {
  width: 'device-width',
  viewportFit: 'cover',
  initialScale: 1,
  themeColor: '#003897'
}

export const metadata = {
  title,
  description,
  creator: name,
  publisher: name,
  icons: {
    icon: [{ url: '/use-eye-dropper/favicon.ico' }],
    shortcut: ['/use-eye-dropper/favicon.ico'],
    apple: [],
    other: []
  },
  metadataBase:
    process.env.NODE_ENV === 'production'
      ? new URL('https://jaxs.onl/use-eye-dropper')
      : new URL('http://localhost:3000/use-eye-dropper')
}

/**
 * @param {{ params: Promise<{ section: string[] }> }} props
 */
const PageNested = async (props) => {
  const { section } = await props.params
  const { code } = await getMdxContent()
  return (
    <>
      <Root>
        <MdxContent code={code} />
      </Root>
      <Scroll section={section?.[0] || ''} />
    </>
  )
}

export const generateStaticParams = async () => getPaths()

export default PageNested
