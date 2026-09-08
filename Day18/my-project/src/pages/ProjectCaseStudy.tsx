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

type Responsibility = {
  _key?: string
  title?: string
  description?: string
}

type MediaItem = {
  _key?: string
  image?: {
    asset?: { _ref?: string; url?: string }
    hotspot?: { x: number; y: number }
  }
  caption?: string
  section?: string
}

type ResultStat = {
  _key?: string
  value?: string
  label?: string
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
  responsibilities?: Responsibility[]
  process?: ProcessStep[]
  tools?: string[]
  challenges?: string[]
  results?: string
  resultStats?: ResultStat[]
  lessonsLearned?: string[]
  gallery?: MediaItem[]
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
  resultStats[]{
    _key,
    value,
    label
  },
  lessonsLearned,
  gallery[]{
    _key,
    caption,
    section,
    image
  },
  tags,
  order,
  slug
}`

const allProjectsQuery = `*[_type == "project"] | order(order asc) {
  title,
  slug,
  category
}`

type SectionMediaProps = {
  items: { key?: string; url: string; caption?: string }[]
}

function SectionMedia({ items }: SectionMediaProps) {
  if (items.length === 0) return null
  return (
    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
      {items.map((m) => (
        <figure key={m.key}>
          <img
            src={m.url}
            alt={m.caption ?? ''}
            className="w-full h-[280px] md:h-[320px] object-cover rounded-[16px]"
          />
          {m.caption && (
            <figcaption className="mt-3 text-[13px] italic text-cocoa/60">{m.caption}</figcaption>
          )}
        </figure>
      ))}
    </div>
  )
}

const num = (i: number) => String(i + 1).padStart(2, '0')

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

  const mediaBySection = new Map<string, { key?: string; url: string; caption?: string }[]>()
  project.gallery?.forEach((g) => {
    if (!g.image?.asset) return
    const item = {
      key: g._key,
      url: urlFor(g.image).width(1200).url(),
      caption: g.caption,
    }
    const section = g.section ?? 'process'
    if (!mediaBySection.has(section)) mediaBySection.set(section, [])
    mediaBySection.get(section)!.push(item)
  })
  const mediaFor = (section: string) => mediaBySection.get(section) ?? []

  const lessonsLearned: string[] = Array.isArray(project.lessonsLearned)
    ? project.lessonsLearned
    : project.lessonsLearned
      ? [String(project.lessonsLearned)]
      : []

  const responsibilities: Responsibility[] = (
    (project.responsibilities ?? []) as unknown as Array<string | Responsibility>
  ).map((r) =>
    typeof r === 'string'
      ? { title: r }
      : { _key: r._key, title: r.title, description: r.description },
  )

  const sectionDefs = [
    { id: 'problem', name: 'Problem', has: !!project.problem || mediaFor('problem').length > 0 },
    { id: 'objective', name: 'Objective', has: !!project.objective || mediaFor('objective').length > 0 },
    { id: 'responsibilities', name: 'Responsibilities', has: responsibilities.length > 0 || mediaFor('responsibilities').length > 0 },
    { id: 'process', name: 'Process', has: (project.process?.length ?? 0) > 0 || mediaFor('process').length > 0 },
    { id: 'challenges', name: 'Challenges', has: (project.challenges?.length ?? 0) > 0 || mediaFor('challenges').length > 0 },
    { id: 'results', name: 'Results', has: !!project.results || (project.resultStats?.length ?? 0) > 0 || mediaFor('results').length > 0 },
    { id: 'lessons', name: 'Lessons', has: lessonsLearned.length > 0 || mediaFor('lessons').length > 0 },
  ]
  const sections = sectionDefs.filter((s) => s.has)

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
                        className="inline-flex items-center shrink-0 text-[11px] font-medium text-deep-teal bg-pastel-teal/50 px-[10px] py-[4px] rounded-full"
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

      {/* Case-study navigation */}
      <nav className="sticky top-0 z-40 bg-ivory/90 backdrop-blur border-b border-espresso/10">
        <div className="max-w-[1400px] mx-auto px-[20px] md:px-[50px] lg:px-[78px] py-4">
          <div className="flex items-center gap-6 lg:gap-8 overflow-x-auto">
            {sections.map((s, i) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="shrink-0 text-[12px] md:text-[13px] font-bold tracking-[1.5px] uppercase text-deep-teal no-underline hover:text-peacock transition-colors"
              >
                <span className="text-peacock/60">{num(i)}</span>
                <span className="ml-2">{s.name}</span>
              </a>
            ))}
          </div>
        </div>
      </nav>

      <div className="max-w-[1400px] mx-auto px-[20px] md:px-[50px] lg:px-[78px]">
        {sections.map((sect, i) => {
          const label = `${num(i)} / ${sect.name}`

          if (sect.id === 'problem') {
            return (
              <section key={sect.id} id="problem" className="scroll-mt-28 pt-20 mb-20">
                <p className="text-[11px] font-bold tracking-[2px] uppercase text-ocean mb-8">{label}</p>
                {project.problem && (
                  <p className="font-serif text-[28px] md:text-[40px] leading-[1.1] text-espresso max-w-[780px]">
                    {project.problem}
                  </p>
                )}
                <SectionMedia items={mediaFor('problem')} />
              </section>
            )
          }

          if (sect.id === 'objective') {
            return (
              <section key={sect.id} id="objective" className="scroll-mt-28 mb-20">
                <p className="text-[11px] font-bold tracking-[2px] uppercase text-ocean mb-8">{label}</p>
                {project.objective && (
                  <p className="text-[17px] md:text-[19px] leading-[30px] text-espresso/75 max-w-[680px]">
                    {project.objective}
                  </p>
                )}
                <SectionMedia items={mediaFor('objective')} />
              </section>
            )
          }

          if (sect.id === 'responsibilities') {
            return (
              <section key={sect.id} id="responsibilities" className="scroll-mt-28 mb-20">
                <p className="text-[11px] font-bold tracking-[2px] uppercase text-ocean mb-10">{label}</p>
                <div className="grid md:grid-cols-2 gap-x-14 gap-y-10">
                  {responsibilities.map((r, j) => (
                    <div key={r._key ?? j} className="flex gap-5 items-start">
                      <span className="font-serif text-[24px] text-peacock/50 w-[40px] shrink-0">{num(j)}</span>
                      <div>
                        {r.title && <p className="font-serif text-[20px] text-deep-teal mb-1">{r.title}</p>}
                        {r.description && (
                          <p className="text-[15px] text-espresso/70 leading-[26px]">{r.description}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <SectionMedia items={mediaFor('responsibilities')} />
              </section>
            )
          }

          if (sect.id === 'process') {
            return (
              <section key={sect.id} id="process" className="scroll-mt-28 mb-20">
                <p className="text-[11px] font-bold tracking-[2px] uppercase text-ocean mb-10">{label}</p>
                <div className="grid md:grid-cols-2 gap-x-14 gap-y-10">
                  {project.process?.map((p, j) => (
                    <div key={p._key ?? j} className="flex gap-5 items-start">
                      <span className="font-serif text-[24px] text-peacock/50 w-[40px] shrink-0">{num(j)}</span>
                      <div>
                        <p className="font-serif text-[20px] text-deep-teal mb-1">{p.step}</p>
                        <p className="text-[15px] text-espresso/70 leading-[26px]">{p.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <SectionMedia items={mediaFor('process')} />
              </section>
            )
          }

          if (sect.id === 'challenges') {
            return (
              <section key={sect.id} id="challenges" className="scroll-mt-28 mb-20">
                <p className="text-[11px] font-bold tracking-[2px] uppercase text-ocean mb-8">{label}</p>
                <ul className="space-y-4 max-w-[760px]">
                  {project.challenges?.map((c, j) => (
                    <li key={j} className="flex gap-4 text-[16px] text-espresso/75 leading-[28px]">
                      <span className="mt-[10px] shrink-0 w-[7px] h-[7px] rounded-full bg-peacock"></span>
                      {c}
                    </li>
                  ))}
                </ul>
                <SectionMedia items={mediaFor('challenges')} />
              </section>
            )
          }

          if (sect.id === 'results') {
            return (
              <section key={sect.id} id="results" className="scroll-mt-28 mb-20">
                <p className="text-[11px] font-bold tracking-[2px] uppercase text-ocean mb-8">{label}</p>
                <div className="bg-deep-teal rounded-[24px] px-8 md:px-16 py-14 md:py-20 text-center">
                  {(project.resultStats ?? []).length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-12">
                      {project.resultStats!.map((s) => (
                        <div key={s._key} className="border-b sm:border-b-0 sm:border-r border-soft-aqua/20 last:border-0 pb-8 sm:pb-0">
                          <p className="font-serif text-[44px] md:text-[56px] leading-none text-white">
                            {s.value}
                          </p>
                          {s.label && (
                            <p className="mt-2 text-[12px] font-bold uppercase tracking-[2px] text-soft-aqua">
                              {s.label}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                  {project.results && (
                    <p className="font-serif text-[22px] md:text-[30px] leading-snug text-white max-w-[820px] mx-auto">
                      {project.results}
                    </p>
                  )}
                  {project.tags && project.tags.length > 0 && (
                    <div className="flex flex-wrap justify-center gap-2 mt-8">
                      {project.tags.map((t) => (
                        <span key={t} className="inline-flex items-center shrink-0 text-[11px] font-medium text-soft-aqua bg-white/10 px-3 py-1.5 rounded-full">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <SectionMedia items={mediaFor('results')} />
              </section>
            )
          }

          return (
            <section key={sect.id} id="lessons" className="scroll-mt-28 mb-20">
              <p className="text-[11px] font-bold tracking-[2px] uppercase text-ocean mb-8">{label}</p>
              <div className="space-y-5 max-w-[760px]">
                {lessonsLearned.map((l, j) => (
                  <p key={j} className="font-serif italic text-[22px] md:text-[26px] leading-snug text-espresso/80">
                    {l}
                  </p>
                ))}
              </div>
              <SectionMedia items={mediaFor('lessons')} />
            </section>
          )
        })}

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