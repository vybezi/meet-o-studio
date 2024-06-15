'use client'
import { ImageLoader } from 'next/image'

export const customLoader: ImageLoader = ({ src, width, quality }) => {
  return `${src}?w=${width}${quality ? `&q=${quality}` : ''}`
}
