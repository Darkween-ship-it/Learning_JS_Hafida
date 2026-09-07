import imageUrlBuilder from '@sanity/image-url'
import { sanityClient } from './client'

const builder = imageUrlBuilder(sanityClient)

// Accepts a Sanity image field (e.g. { asset, hotspot }) or an asset source.
export function urlFor(source: unknown) {
  return builder.image(source as Parameters<typeof builder.image>[0])
}