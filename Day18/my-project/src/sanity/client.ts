import {createClient} from '@sanity/client'

export const sanityClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || '4zd8pv5h',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  apiVersion: '2026-09-07',
  useCdn: true,
})
