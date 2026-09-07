import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { sanityClient } from '../sanity/client'

type Project = {
  title: string
  description: string
  role: string
  category?: string
  date?: string
  team?: string
  problem?: string
  objective?: string
  responsibilities?: string[]
  process?: {
    step: string
    description: string
  }[]
  tools?: string[]
  challenges?: string[]
  results?: string
  lessonsLearned?: string
  tags?: string[]
  slug: {
    current: string
  }
}

const projectQuery = `*[_type == "project" && slug.current == $slug][0] {
  title,
  description,
  coverImage,
  category,
  date,
  role,
  team,
  problem,
  objective,
  responsibilities,
  process,
  tools,
  challenges,
  results,
  lessonsLearned,
  gallery,
  tags,
  slug
}`

export default function ProjectCaseStudy() {
  const { slug } = useParams()
  const [project, setProject] = useState<Project | null>(null)

  useEffect(() => {
    if (!slug) return

    sanityClient
      .fetch<Project | null>(projectQuery, { slug })
      .then(setProject)
      .catch(() => setProject(null))
  }, [slug])

  if (!project) {
    return (
      <main className="min-h-screen bg-ivory flex items-center justify-center">
        <p className="text-deep-teal">Project not found.</p>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-ivory py-20 px-6">
      <div className="max-w-[1000px] mx-auto">
        <p className="text-[12px] font-bold tracking-[2px] uppercase text-ocean mb-4">
          {project.role}
        </p>

        <h1 className="font-serif text-[42px] md:text-[64px] text-espresso leading-tight mb-6">
          {project.title}
        </h1>

        <p className="text-[17px] leading-[28px] text-espresso/70 max-w-[700px] mb-8">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.tags?.map((tag) => (
            <span
              key={tag}
              className="text-[12px] font-medium px-3 py-1 rounded-full bg-pastel-teal/50 text-deep-teal"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </main>
  )
}