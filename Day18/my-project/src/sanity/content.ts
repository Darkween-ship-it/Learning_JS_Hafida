import {sanityClient} from './client'

export type Project = {
  _id: string
  title: string
  slug: {
    current: string
  }
  description: string
  role: string
  tags: string[]
  order?: number
}

export type Experience = {
  _id: string
  title: string
  organization: string
  period: string
  role: string
  type?: 'professional' | 'internship' | 'fellowship' | 'volunteering' | 'leadership'
  points: string[]
  tags: string[]
  order?: number
}

export type Skill = {
  _id: string
  name: string
  category:
    | 'project-management'
    | 'product-management'
    | 'leadership'
    | 'communication'
    | 'technical'
    | 'tools'
  level?: 'beginner' | 'intermediate' | 'advanced' | 'expert'
  order?: number
}

export type Certification = {
  _id: string
  title: string
  organization: string
  type: 'course' | 'certification' | 'fellowship' | 'leadership-program' | 'training'
  date?: string
  credentialUrl?: string
  description?: string
  order?: number
}

export type Achievement = {
  _id: string
  title: string
  type: 'award' | 'milestone' | 'leadership' | 'project-event' | 'measurable-result'
  metric?: string
  description?: string
  date?: string
  order?: number
}

export type ProfileLink = {
  _key?: string
  label: string
  url: string
}

export type Profile = {
  _id: string
  name: string
  title?: string
  shortMessage?: string
  email?: string
  location?: string
  whatsappUrl?: string
  links?: ProfileLink[]
  // Hero — client-controlled
  heroLabel?: string
  heroHeadline?: {
    _key?: string
    lead?: string
    accent?: string
  }[]
  heroIntro?: string
  heroImage?: {
    asset?: {_ref?: string; url?: string}
    hotspot?: {x: number; y: number}
    alt?: string
  }
  // About — client-controlled
  aboutHeadingLead?: string
  aboutHeadingAccent?: string
  aboutImage?: {
    asset?: {_ref?: string; url?: string}
    hotspot?: {x: number; y: number}
    alt?: string
  }
  aboutParagraph1?: string
  aboutParagraph2?: string
  aboutQuote?: string
}

export type PortfolioContent = {
  projects: Project[]
  experiences: Experience[]
  skills: Skill[]
  certifications: Certification[]
  achievements: Achievement[]
  profile: Profile | null
}

export const projectsQuery = `*[_type == "project"] | order(order asc) {
  _id,
  title,
  slug,
  description,
  role,
  tags,
  order
}`

export const experiencesQuery = `*[_type == "experience"] | order(order asc) {
  _id,
  title,
  organization,
  period,
  role,
  type,
  points,
  tags,
  order
}`

export const skillsQuery = `*[_type == "skill"] | order(order asc) {
  _id,
  name,
  category,
  level,
  order
}`

export const certificationsQuery = `*[_type == "certification"] | order(order asc) {
  _id,
  title,
  organization,
  type,
  date,
  credentialUrl,
  description,
  order
}`

export const achievementsQuery = `*[_type == "achievement"] | order(order asc) {
  _id,
  title,
  type,
  metric,
  description,
  date,
  order
}`

export const profileQuery = `*[_type == "profile"][0] {
  _id,
  name,
  title,
  shortMessage,
  email,
  location,
  whatsappUrl,
  links[]{
    _key,
    label,
    url
  },
  heroLabel,
  heroHeadline[]{
    _key,
    lead,
    accent
  },
  heroIntro,
  heroImage{
    asset,
    hotspot,
    alt
  },
  aboutHeadingLead,
  aboutHeadingAccent,
  aboutImage{
    asset,
    hotspot,
    alt
  },
  aboutParagraph1,
  aboutParagraph2,
  aboutQuote
}`

export async function fetchPortfolioContent() {
  const [projects, experiences, skills, certifications, achievements, profile] =
    await Promise.all([
      sanityClient.fetch<Project[]>(projectsQuery),
      sanityClient.fetch<Experience[]>(experiencesQuery),
      sanityClient.fetch<Skill[]>(skillsQuery),
      sanityClient.fetch<Certification[]>(certificationsQuery),
      sanityClient.fetch<Achievement[]>(achievementsQuery),
      sanityClient.fetch<Profile | null>(profileQuery),
    ])

  return {projects, experiences, skills, certifications, achievements, profile}
}
