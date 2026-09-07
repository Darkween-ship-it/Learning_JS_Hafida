import {createClient} from '@sanity/client'

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || '4zd8pv5h'
const dataset = import.meta.env.VITE_SANITY_DATASET || 'production'
const apiVersion = '2026-09-07'

// Live client – talks to the live API so edits show up quickly (no CDN cache).
// Use this for fetching content that needs to be up to date, and for listening.
export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
})

// Prefer the exact same client everywhere to keep behaviour predictable.
export const liveClient = sanityClient
