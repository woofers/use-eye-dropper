import fs from 'fs-extra'
import { parse, join } from 'path'

const getTypeGlob = type => new RegExp(`.${type}?$`, '')

const getPathGlob = path => {
  const re = path
    .split('/')
    .map(folder => `${folder}\\/`)
    .join('')
  return new RegExp(`^${re}`, '')
}

export const getFile = (path, file, type) => {
  const filePath = join(`./${path}`, `${file}.${type}`)
  const { ext, name } = parse(filePath)
  if (ext.startsWith(`.${type}`)) {
    try {
      const content = fs.readFileSync(filePath, 'utf8')
      const post = {
        content,
        date: '',
        post: filePath
          .replace(getPathGlob(path), '')
          .replace(getTypeGlob(type), '')
      }
      return post
    } catch (e) {
      console.log(e)
      return {}
    }
  }
}

export const getFiles = (path, type) => {
  const names = getFileNames(path, getTypeGlob(type))
  return names.map(file => getFile(path, file, type))
}

export const getFileNames = (path, glob) => {
  const files = fs.readdirSync(`./${path}`)
  if (!glob) return files
  return files.map(name => name.replace(glob, ''))
}

export const getMarkdownFile = (path, name) => getFile(path, name, 'md')

export const getMarkdownFiles = path => getFiles(path, 'md')

export const getMarkdownFileNames = path =>
  getFileNames(path, getTypeGlob('md'))
