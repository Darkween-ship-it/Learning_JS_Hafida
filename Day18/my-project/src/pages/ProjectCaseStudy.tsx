import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { sanityClient } from '../sanity/client'
import { urlFor } from '../sanity/image'
import Navbar from '../components/Navbar'

type ProcessStep = {
  _key?: string
  step: string
  description: string
}

type Project = {
  title: string
  description: string
  role: string
  coverImage?: {
    asset?: { _ref?: string; url?: string }
    hotspot?: { x: number; y: number }
  }
  category?: string
  date?: string
  team?: string
  problem?: string
  objective?: string
  responsibilities?: string[]
  process?: ProcessStep[]
  tools?: string[]
  challenges?: string[]
  results?: string
  lessonsLearned?: string
  gallery?: {
    _key?: string
    asset?: { _ref?: string; url?: string }
  }[]
  links?: {
    _key?: string
    label?: string
    url?: string
  }[]
  tags?: string[]
  order?: number
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
  links[]{
    _key,
    label,
    url
  },
  challenges,
  results,
  lessonsLearned,
  gallery,
  tags,
  order,
  slug
}`

const allProjectsQuery = `*[_type == "project"] | order(order asc) {
  title,
  slug,
  category
}`

export default function ProjectCaseStudy() {
  const { slug } = useParams()
  const [project, setProject] = useState<Project | null>(null)
  const [allProjects, setAllProjects] = useState<{ title: string; slug: { current: string }; category?: string }[]>([])

  useEffect(() => {
    if (!slug) return

    sanityClient
      .fetch<Project | null>(projectQuery, { slug })
      .then(setProject)
      .catch(() => setProject(null))

    sanityClient
      .fetch<{ title: string; slug: { current: string }; category?: string }[]>(allProjectsQuery)
      .then(setAllProjects)
      .catch(() => setAllProjects([]))
  }, [slug])

  if (!project) {
    return (
      <main className="min-h-screen bg-ivory flex items-center justify-center">
        <p className="text-deep-teal">Project not found.</p>
      </main>
    )
  }

  const idx = allProjects.findIndex((p) => p.slug.current === slug)
  const next = idx >= 0 ? allProjects[(idx + 1) % allProjects.length] : undefined

  const coverUrl = project.coverImage?.asset
    ? urlFor(project.coverImage).width(1400).url()
    : undefined
  const galleryUrls =
    project.gallery?.map((g) =>
      g.asset ? { _key: g._key, url: urlFor(g).width(1200).url() } : undefined,
    ) ?? []

  return (
    <main className="min-h-screen bg-ivory">
      <Navbar />

      {/* 01 — Two-column editorial hero */}
      <header className="bg-ivory">
        <div className="max-w-[1400px] mx-auto px-[20px] md:px-[50px] lg:px-[78px] pt-16 pb-16 md:pb-28">
          <div className="grid lg:grid-cols-[1fr_340px] gap-12 lg:gap-20 items-start">
            {/* Left — identity + visual */}
            <div>
              <p className="text-[13px] font-bold tracking-[2px] uppercase text-ocean mb-6">
                {project.order && (
                  <span className="mr-3 text-peacock">{String(project.order).padStart(2, '0')} /</span>
                )}
                Past Case Study
              </p>

              <h1 className="font-serif text-[36px] md:text-[54px] lg:text-[68px] leading-[1.02] text-espresso max-w-[820px]">
                {project.title}
              </h1>

              <p className="mt-8 text-[18px] md:text-[20px] leading-[32px] text-espresso/70 max-w-[640px]">
                {project.description}
              </p>

              {coverUrl ? (
                <div className="mt-12 w-full max-w-[880px] overflow-hidden rounded-[24px]">
                  <img
                    src={coverUrl}
                    alt={project.title}
                    className="w-full h-auto object-cover"
                  />
                </div>
              ) : (
                <div className="mt-12 w-full max-w-[880px] h-[420px] bg-beige rounded-[24px]"></div>
              )}
            </div>

            {/* Right — sticky info panel */}
            <aside className="lg:sticky lg:top-8 bg-white border border-pastel-teal/40 rounded-[16px] overflow-hidden">
              <div className="border-b border-pastel-teal/40 px-6 py-5">
                <p className="text-[12px] font-bold text-cocoa/60">Year</p>
                <p className="font-serif text-[22px] text-deep-teal mt-1">{project.date || '—'}</p>
              </div>

              <div className="border-b border-pastel-teal/40 px-6 py-5">
                <p className="text-[12px] font-bold text-cocoa/60">Category</p>
                <p className="font-serif text-[22px] text-deep-teal mt-1 leading-snug">
                  {project.category || '—'}
                </p>
              </div>

              <div className="border-b border-pastel-teal/40 px-6 py-5">
                <p className="text-[12px] font-bold text-cocoa/60">Role</p>
                <p className="font-serif text-[22px] text-deep-teal mt-1 leading-snug">
                  {project.role || '—'}
                </p>
              </div>

              {project.tools && project.tools.length > 0 && (
                <div className="border-b border-pastel-teal/40 px-6 py-5">
                  <p className="text-[12px] font-bold text-cocoa/60">Tools / Components</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {project.tools.map((tool) => (
                      <span
                        key={tool}
                        className="text-[11px] font-medium text-deep-teal bg-pastel-teal/50 px-[10px] py-[4px] rounded-full"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {project.links && project.links.length > 0 && (
                <div className="px-6 py-5">
                  <p className="text-[12px] font-bold text-cocoa/60">Links</p>
                  <ul className="mt-3 space-y-2">
                    {project.links.map((link, i) => (
                      <li key={link._key ?? i}>
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 text-[14px] font-semibold text-peacock no-underline hover:text-ocean transition-colors"
                        >
                          {link.label || link.url}
                          <span>→</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </aside>
          </div>
        </div>
      </header>

      <div className="max-w-[1400px] mx-auto px-[20px] md:px-[50px] lg:px-[78px]">
        {/* 02 — The challenge */}
        {project.problem && (
          <section className="max-w-[760px] mb-24">
            <p className="text-[11px] font-bold tracking-[2px] uppercase text-ocean mb-8">The Challenge</p>
            <p className="font-serif text-[30px] md:text-[42px] leading-[1.1] text-espresso">
              {project.problem}
            </p>
            {project.objective && (
              <p className="mt-8 text-[17px] leading-[30px] text-espresso/70">
                {project.objective}
              </p>
            )}
          </section>
        )}

        {/* 03 — What Louis did */}
        {(project.responsibilities?.length || project.process?.length) && (
          <section className="mb-24">
            <p className="text-[11px] font-bold tracking-[2px] uppercase text-ocean mb-10">My Role</p>
            <div className="grid md:grid-cols-2 gap-x-14 gap-y-10">
              {project.responsibilities?.map((r, i) => (
                <div key={i} className="flex gap-5 items-start">
                  <span className="font-serif text-[24px] text-peacock/50 w-[40px] shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="text-[16px] md:text-[18px] text-espresso/80 leading-[28px]">{r}</p>
                </div>
              ))}
              {project.process?.map((p, i) => (
                <div key={p._key ?? i} className="flex gap-5 items-start">
                  <span className="font-serif text-[24px] text-peacock/50 w-[40px] shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <p className="font-serif text-[20px] text-deep-teal mb-1">{p.step}</p>
                    <p className="text-[15px] text-espresso/70 leading-[26px]">{p.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 04 — Interwoven gallery */}
        {galleryUrls.length > 0 && (
          <section className="mb-20 grid grid-cols-1 md:grid-cols-2 gap-6">
            {galleryUrls.map((g) =>
              g ? (
                <img
                  key={g._key}
                  src={g.url}
                  alt=""
                  className="w-full h-[320px] object-cover rounded-[8px]"
                />
              ) : null,
            )}
          </section>
        )}

        {/* 05 — Challenges */}
        {project.challenges && project.challenges.length > 0 && (
          <section className="max-w-[760px] mb-24">
            <p className="text-[11px] font-bold tracking-[2px] uppercase text-ocean mb-8">Challenges</p>
            <ul className="space-y-4">
              {project.challenges.map((c, i) => (
                <li key={i} className="flex gap-4 text-[16px] text-espresso/75 leading-[28px]">
                  <span className="mt-[10px] shrink-0 w-[7px] h-[7px] rounded-full bg-peacock"></span>
                  {c}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* 06 — Impact */}
        {project.results && (
          <section className="bg-deep-teal rounded-[24px] px-8 md:px-16 py-14 md:py-20 mb-24 text-center">
            <p className="text-[11px] font-bold tracking-[2px] uppercase text-soft-aqua mb-6">The Impact</p>
            <p className="font-serif text-[26px] md:text-[38px] leading-snug text-white max-w-[820px] mx-auto">
              {project.results}
            </p>
            {project.tags && project.tags.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2 mt-8">
                {project.tags.map((t) => (
                  <span key={t} className="text-[11px] font-medium text-soft-aqua bg-white/10 px-3 py-1.5 rounded-full">
                    {t}
                  </span>
                ))}
              </div>
            )}
          </section>
        )}

        {/* 07 — Lessons */}
        {project.lessonsLearned && (
          <section className="max-w-[760px] mb-24">
            <p className="text-[11px] font-bold tracking-[2px] uppercase text-ocean mb-8">What I Learned</p>
            <p className="font-serif italic text-[24px] md:text-[30px] leading-snug text-espresso/80">
              “{project.lessonsLearned}”
            </p>
          </section>
        )}

        {/* Footer nav */}
        <footer className="border-t border-espresso/15 py-10 mb-16 flex items-center justify-between">
          <Link
            to="/#project"
            className="text-[14px] font-semibold text-deep-teal no-underline hover:text-peacock transition-colors"
          >
            ← All Projects
          </Link>
          {next && (
            <Link
              to={`/projects/${next.slug.current}`}
              className="text-right text-[14px] font-semibold text-deep-teal no-underline hover:text-peacock transition-colors"
            >
              Next Project{next.category ? ` — ${next.category}` : ''} →
            </Link>
          )}
        </footer>
      </div>
    </main>
  )
}