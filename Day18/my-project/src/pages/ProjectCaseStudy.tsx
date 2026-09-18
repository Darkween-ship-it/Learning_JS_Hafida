import { useCallback, useEffect, useState, type ReactNode } from 'react'
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

type CaptionedImage = {
  _key?: string
  alt?: string
  caption?: string
  image?: {
    asset?: { _ref?: string; url?: string }
    hotspot?: { x: number; y: number }
  }
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
  problemStatement?: string
  problem?: string
  problemImage?: CaptionedImage
  objectiveStatement?: string
  objective?: string
  objectiveImage?: CaptionedImage
  roleStatement?: string
  responsibilities?: Responsibility[]
  roleImage?: CaptionedImage
  processStatement?: string
  process?: ProcessStep[]
  processImage?: CaptionedImage
  tools?: string[]
  challengesStatement?: string
  challenges?: string[]
  challengesImage?: CaptionedImage
  resultsStatement?: string
  results?: string
  resultsImage?: CaptionedImage
  resultStats?: ResultStat[]
  lessonsLearned?: string[]
  lessonsImage?: CaptionedImage
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
  problemStatement,
  problem,
  problemImage{
    alt,
    caption,
    image
  },
  objectiveStatement,
  objective,
  objectiveImage{
    alt,
    caption,
    image
  },
  roleStatement,
  responsibilities,
  roleImage{
    alt,
    caption,
    image
  },
  processStatement,
  process,
  processImage{
    alt,
    caption,
    image
  },
  tools,
  links[]{
    _key,
    label,
    url
  },
  challengesStatement,
  challenges,
  challengesImage{
    alt,
    caption,
    image
  },
  resultsStatement,
  results,
  resultsImage{
    alt,
    caption,
    image
  },
  resultStats[]{
    _key,
    value,
    label
  },
  lessonsLearned,
  lessonsImage{
    alt,
    caption,
    image
  },
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

type LightboxProps = {
  src: string
  alt?: string
  caption?: string
  onClose: () => void
}

function Lightbox({ src, alt, caption, onClose }: LightboxProps) {
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    },
    [onClose],
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [handleKey])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-espresso/80 backdrop-blur-sm p-4 md:p-10 cursor-zoom-out"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute top-5 right-5 md:top-8 md:right-8 text-ivory/80 hover:text-ivory text-[28px] font-bold leading-none bg-white/10 hover:bg-white/20 rounded-full w-10 h-10 flex items-center justify-center transition-colors cursor-pointer z-10"
        aria-label="Close"
      >
        ×
      </button>
      <img
        src={src}
        alt={alt ?? ''}
        className="max-w-full max-h-[90vh] object-contain rounded-[12px] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />
      {caption && (
        <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-ivory/70 text-[13px] italic whitespace-nowrap">
          {caption}
        </p>
      )}
    </div>
  )
}

type SectionMediaProps = {
  items: { key?: string; url: string; caption?: string }[]
  onImageClick: (src: string, alt?: string, caption?: string) => void
}

function SectionMedia({ items, onImageClick }: SectionMediaProps) {
  if (items.length === 0) return null
  return (
    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
      {items.map((m) => (
        <figure key={m.key}>
          <div
            className="relative max-h-[280px] md:max-h-[320px] overflow-hidden rounded-[16px] cursor-pointer group"
            onClick={() => onImageClick(m.url, m.caption, m.caption)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onImageClick(m.url, m.caption, m.caption) }}
          >
            <img
              src={m.url}
              alt={m.caption ?? ''}
              className="w-full h-auto object-cover"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
              <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 text-espresso text-[13px] font-semibold px-4 py-2 rounded-full shadow-lg">
                Click to expand
              </span>
            </div>
          </div>
          {m.caption && (
            <figcaption className="mt-3 text-[13px] italic text-cocoa/60">{m.caption}</figcaption>
          )}
        </figure>
      ))}
    </div>
  )
}

type SectionFigureProps = {
  src?: string
  alt?: string
  caption?: string
  onImageClick?: () => void
}

function SectionFigure({ src, alt, caption, onImageClick }: SectionFigureProps) {
  if (!src) return null
  return (
    <figure className="mt-10 w-full max-w-[880px]">
      <div
        className="relative max-h-[320px] md:max-h-[420px] overflow-hidden rounded-[20px] cursor-pointer group"
        onClick={onImageClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onImageClick?.() }}
      >
        <img
          src={src}
          alt={alt ?? ''}
          className="w-full h-auto object-cover"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
          <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 text-espresso text-[13px] font-semibold px-4 py-2 rounded-full shadow-lg">
            Click to expand
          </span>
        </div>
      </div>
      {caption && <figcaption className="mt-3 text-[13px] italic text-cocoa/60">{caption}</figcaption>}
    </figure>
  )
}

type AlternatingRowProps = {
  flip?: boolean
  text: ReactNode
  image?: { src: string; alt?: string; caption?: string }
  onImageClick?: (src: string, alt?: string, caption?: string) => void
}

function AlternatingRow({ flip = false, text, image, onImageClick }: AlternatingRowProps) {
  return (
    <div className={image ? 'grid lg:grid-cols-2 gap-10 lg:gap-16 items-center' : ''}>
      <div className={image && flip ? 'lg:order-2' : undefined}>{text}</div>
      {image && (
        <div className={flip ? 'lg:order-1' : undefined}>
          <figure className="w-full">
            <div
              className="relative w-full aspect-[4/3] overflow-hidden rounded-[16px] bg-beige cursor-pointer group"
              onClick={() => onImageClick?.(image.src, image.alt, image.caption)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') onImageClick?.(image.src, image.alt, image.caption)
              }}
            >
              <img
                src={image.src}
                alt={image.alt ?? ''}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 text-espresso text-[13px] font-semibold px-4 py-2 rounded-full shadow-lg">
                  Click to expand
                </span>
              </div>
            </div>
            {image.caption && (
              <figcaption className="mt-3 text-[13px] italic text-cocoa/60">{image.caption}</figcaption>
            )}
          </figure>
        </div>
      )}
    </div>
  )
}

const resolveCaptionedImage = (field: CaptionedImage | undefined) => {
  if (!field?.image?.asset) return undefined
  return {
    src: urlFor(field.image).width(1200).url(),
    alt: field.alt,
    caption: field.caption,
  }
}

const num = (i: number) => String(i + 1).padStart(2, '0')

const sectionHeadings: Record<string, string> = {
  problem: 'The Problem',
  objective: 'The Objective',
  responsibilities: 'My Role',
  process: 'The Process',
  challenges: 'The Challenges',
  results: 'The Results',
  lessons: 'Lessons Learned',
}

export default function ProjectCaseStudy() {
  const { slug } = useParams()
  const [project, setProject] = useState<Project | null>(null)
  const [allProjects, setAllProjects] = useState<{ title: string; slug: { current: string }; category?: string }[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)
  const [lightbox, setLightbox] = useState<{ src: string; alt?: string; caption?: string } | null>(null)

  const openLightbox = useCallback((src: string, alt?: string, caption?: string) => {
    setLightbox({ src, alt, caption })
  }, [])

  useEffect(() => {
    if (!slug) return

    setActiveId(null)

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

  const resultStats: ResultStat[] = Array.isArray(project.resultStats)
    ? project.resultStats
    : []

  const responsibilities: Responsibility[] = (
    (project.responsibilities ?? []) as unknown as Array<string | Responsibility>
  ).map((r) =>
    typeof r === 'string'
      ? { title: r }
      : { _key: r._key, title: r.title, description: r.description },
  )

  const problemFigure = resolveCaptionedImage(project.problemImage)
  const objectiveFigure = resolveCaptionedImage(project.objectiveImage)
  const roleFigure = resolveCaptionedImage(project.roleImage)
  const processFigure = resolveCaptionedImage(project.processImage)
  const challengesFigure = resolveCaptionedImage(project.challengesImage)
  const resultsFigure = resolveCaptionedImage(project.resultsImage)
  const lessonsFigure = resolveCaptionedImage(project.lessonsImage)

  const sectionDefs = [
    { id: 'problem', name: 'Problem', has: !!project.problemStatement || !!project.problem || !!problemFigure || mediaFor('problem').length > 0 },
    { id: 'objective', name: 'Objective', has: !!project.objectiveStatement || !!project.objective || !!objectiveFigure || mediaFor('objective').length > 0 },
    { id: 'responsibilities', name: 'My Role', has: !!project.roleStatement || responsibilities.length > 0 || !!roleFigure || mediaFor('responsibilities').length > 0 },
    { id: 'process', name: 'Process', has: !!project.processStatement || (project.process?.length ?? 0) > 0 || !!processFigure || mediaFor('process').length > 0 },
    { id: 'challenges', name: 'Challenges', has: !!project.challengesStatement || (project.challenges?.length ?? 0) > 0 || !!challengesFigure || mediaFor('challenges').length > 0 },
    { id: 'results', name: 'Results', has: !!project.resultsStatement || !!project.results || resultStats.length > 0 || !!resultsFigure || mediaFor('results').length > 0 },
    { id: 'lessons', name: 'Lessons', has: lessonsLearned.length > 0 || !!lessonsFigure || mediaFor('lessons').length > 0 },
  ]
  const sections = sectionDefs.filter((s) => s.has)
  const active = sections.find((s) => s.id === activeId) ?? sections[0]
  const activeIndex = Math.max(0, sections.findIndex((s) => s.id === active?.id))
  const activeLabel = active ? `${num(activeIndex)} / ${sectionHeadings[active.id]}` : ''

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
                <div
                  className="mt-12 w-full max-w-[880px] max-h-[320px] md:max-h-[420px] overflow-hidden rounded-[24px] cursor-pointer group relative"
                  onClick={() => openLightbox(coverUrl, project.title)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') openLightbox(coverUrl, project.title) }}
                >
                  <img
                    src={coverUrl}
                    alt={project.title}
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 text-espresso text-[13px] font-semibold px-4 py-2 rounded-full shadow-lg">
                      Click to expand
                    </span>
                  </div>
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

      {active && (
        <nav className="sticky top-0 z-40 bg-ivory/90 backdrop-blur border-b border-espresso/10">
          <div className="max-w-[1400px] mx-auto px-[20px] md:px-[50px] lg:px-[78px] py-3">
            <div className="flex items-center gap-6 lg:gap-8 overflow-x-auto">
              {sections.map((s, i) => {
                const isActive = s.id === active.id
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setActiveId(s.id)}
                    className={`group flex flex-col items-start shrink-0 pb-1 text-[12px] md:text-[13px] font-bold tracking-[1.5px] uppercase bg-transparent border-0 cursor-pointer transition-colors ${
                      isActive ? 'text-peacock' : 'text-deep-teal hover:text-peacock'
                    }`}
                  >
                    <span>
                      <span className={`${isActive ? 'text-peacock' : 'text-peacock/60'}`}>{num(i)}</span>
                      <span className="ml-2">{s.name}</span>
                    </span>
                    <span
                      className={`mt-1 h-[3px] w-full rounded-full transition-all duration-300 ${
                        isActive ? 'bg-peacock' : 'bg-transparent group-hover:bg-peacock/30'
                      }`}
                    ></span>
                  </button>
                )
              })}
            </div>
          </div>
        </nav>
      )}

      <div className="max-w-[1400px] mx-auto px-[20px] md:px-[50px] lg:px-[78px]">
        {active && (
          <div key={active.id} className="pt-16 md:pt-24 animate-section-reveal">
            <section className="mb-24">
              <p className="text-[11px] font-bold tracking-[2px] uppercase text-ocean mb-10">{activeLabel}</p>

              {active.id === 'problem' && (
                <>
                  <AlternatingRow
                    flip={false}
                    text={
                      <>
                        {project.problemStatement && (
                          <p className="font-serif text-[24px] md:text-[34px] leading-[1.15] text-espresso mb-6">
                            {project.problemStatement}
                          </p>
                        )}
                        {project.problem && (
                          <p className="text-[15px] md:text-[16px] leading-[28px] text-espresso/70">
                            {project.problem}
                          </p>
                        )}
                      </>
                    }
                    image={problemFigure}
                    onImageClick={(src, alt, caption) => openLightbox(src, alt, caption)}
                  />
                  <SectionMedia items={mediaFor('problem')} onImageClick={openLightbox} />
                </>
              )}

              {active.id === 'objective' && (
                <>
                  <AlternatingRow
                    flip
                    text={
                      <>
                        {project.objectiveStatement && (
                          <p className="font-serif text-[24px] md:text-[34px] leading-[1.15] text-espresso mb-6">
                            {project.objectiveStatement}
                          </p>
                        )}
                        {project.objective && (
                          <p className="text-[15px] md:text-[16px] leading-[28px] text-espresso/70">
                            {project.objective}
                          </p>
                        )}
                      </>
                    }
                    image={objectiveFigure}
                    onImageClick={(src, alt, caption) => openLightbox(src, alt, caption)}
                  />
                  <SectionMedia items={mediaFor('objective')} onImageClick={openLightbox} />
                </>
              )}

              {active.id === 'responsibilities' && (
                <>
                  <AlternatingRow
                    flip={false}
                    text={
                      <>
                        {project.roleStatement && (
                          <p className="font-serif text-[24px] md:text-[34px] leading-[1.15] text-espresso mb-8">
                            {project.roleStatement}
                          </p>
                        )}
                        <div className="space-y-6">
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
                      </>
                    }
                    image={roleFigure}
                    onImageClick={(src, alt, caption) => openLightbox(src, alt, caption)}
                  />
                  <SectionMedia items={mediaFor('responsibilities')} onImageClick={openLightbox} />
                </>
              )}

              {active.id === 'process' && (
                <>
                  {project.processStatement && (
                    <p className="font-serif text-[28px] md:text-[38px] leading-[1.15] text-espresso max-w-[720px] mb-8">
                      {project.processStatement}
                    </p>
                  )}
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
                  <SectionFigure {...processFigure} onImageClick={() => processFigure && openLightbox(processFigure.src, processFigure.alt, processFigure.caption)} />
                  <SectionMedia items={mediaFor('process')} onImageClick={openLightbox} />
                </>
              )}

              {active.id === 'challenges' && (
                <>
                  <AlternatingRow
                    flip
                    text={
                      <>
                        {project.challengesStatement && (
                          <p className="font-serif text-[24px] md:text-[34px] leading-[1.15] text-espresso mb-8">
                            {project.challengesStatement}
                          </p>
                        )}
                        <ul className="space-y-4">
                          {project.challenges?.map((c, j) => (
                            <li key={j} className="flex gap-4 text-[16px] text-espresso/75 leading-[28px]">
                              <span className="mt-[10px] shrink-0 w-[7px] h-[7px] rounded-full bg-peacock"></span>
                              {c}
                            </li>
                          ))}
                        </ul>
                      </>
                    }
                    image={challengesFigure}
                    onImageClick={(src, alt, caption) => openLightbox(src, alt, caption)}
                  />
                  <SectionMedia items={mediaFor('challenges')} onImageClick={openLightbox} />
                </>
              )}

              {active.id === 'results' && (
                <>
                  {project.resultsStatement && (
                    <p className="font-serif text-[24px] md:text-[34px] leading-[1.15] text-espresso max-w-[720px] mb-10">
                      {project.resultsStatement}
                    </p>
                  )}

                  <AlternatingRow
                    flip={false}
                    text={
                      <>
                        {project.results && (
                          <p className="text-[15px] md:text-[16px] leading-[28px] text-espresso/70">
                            {project.results}
                          </p>
                        )}
                        {project.tags && project.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-6">
                            {project.tags.map((t) => (
                              <span
                                key={t}
                                className="inline-flex items-center shrink-0 text-[11px] font-medium text-deep-teal bg-pastel-teal/50 px-3 py-1.5 rounded-full"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        )}
                      </>
                    }
                    image={resultsFigure}
                    onImageClick={(src, alt, caption) => openLightbox(src, alt, caption)}
                  />

                  <div className="border-t border-espresso/15"></div>

                  {resultStats.length > 0 && (
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 pt-10">
                      {resultStats.map((s) => (
                        <div key={s._key}>
                          <p className="font-serif text-[40px] md:text-[56px] leading-none text-deep-teal">
                            {s.value}
                          </p>
                          {s.label && (
                            <p className="mt-3 text-[12px] font-bold uppercase tracking-[2px] text-cocoa/60">
                              {s.label}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  <SectionMedia items={mediaFor('results')} onImageClick={openLightbox} />
                </>
              )}

              {active.id === 'lessons' && (
                <>
                  <div className="space-y-5 max-w-[720px]">
                    {lessonsLearned.map((l, j) => (
                      <p key={j} className="font-serif text-[24px] md:text-[30px] leading-[1.3] text-espresso/80">
                        {l}
                      </p>
                    ))}
                  </div>
                  <SectionFigure {...lessonsFigure} onImageClick={() => lessonsFigure && openLightbox(lessonsFigure.src, lessonsFigure.alt, lessonsFigure.caption)} />
                  <SectionMedia items={mediaFor('lessons')} onImageClick={openLightbox} />
                </>
              )}
            </section>
          </div>
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

      {lightbox && (
        <Lightbox
          src={lightbox.src}
          alt={lightbox.alt}
          caption={lightbox.caption}
          onClose={() => setLightbox(null)}
        />
      )}
    </main>
  )
}
