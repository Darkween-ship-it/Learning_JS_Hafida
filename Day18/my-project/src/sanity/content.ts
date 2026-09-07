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
  links?: ProfileLink[]
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
  links[]{
    _key,
    label,
    url
  }
}`

export async function fetchPortfolioContent() {
  const [projects, experiences] = await Promise.all([
    sanityClient.fetch<Project[]>(projectsQuery),
    sanityClient.fetch<Experience[]>(experiencesQuery),
  ])

  return {projects, experiences}
}
