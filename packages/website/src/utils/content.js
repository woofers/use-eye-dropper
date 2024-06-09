import { getMarkdownFile } from 'data/local'
import { bundleMDX } from 'mdx-bundler'

export const getMdxContent = async () => {
  const { content } = getMarkdownFile('../../../use-eye-dropper', 'README')
  const { code, frontmatter } = await bundleMDX({ source: content, files: {} })
  return { code, frontmatter }
}
