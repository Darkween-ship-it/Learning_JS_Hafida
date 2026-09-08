import { useState } from 'react'
import type { Project } from '../sanity/content'

const fallbackProjects = [
  {
    id: '01',
    name: 'Campus Connect',
    description: 'Making campus opportunities easier to discover.',
    tags: ['Digital', 'Community', 'UX'],
    role: 'Project Lead',
  },
  {
    id: '02',
    name: 'Green Steps',
    description: 'Turning sustainability awareness into community action.',
    tags: ['Community', 'Sustainability'],
    role: 'Project Coordinator',
  },
  {
    id: '03',
    name: 'Creative Market',
    description: 'Connecting local creatives with new customers.',
    tags: ['Digital', 'Product', 'Entrepreneurship'],
    role: 'Project Manager',
  },
  {
    id: '04',
    name: 'Tech Talks',
    description: 'Coordinating a student-led technology event.',
    tags: ['Technology', 'Events', 'Community'],
    role: 'Event Project Coordinator',
  },
]

const cardStyles = [
  {
    container:
      'bg-beige hover:bg-white rounded-tl-[20px] rounded-bl-[20px] rounded-tr-[20px] rounded-br-[20px] border-l-[3px] border-t-[3px] border-t-cocoa border-l-cocoa',
    number: 'text-cocoa group-hover:text-chocolate',
    role: 'bg-chocolate text-white',
    tag: 'bg-cocoa/15 text-chocolate',
  },
  {
    container:
      'bg-beige hover:bg-white rounded-tr-[20px] rounded-br-[20px] rounded-tl-[20px] rounded-bl-[20px] border-t-[3px] border-r-[3px] border-t-cocoa border-r-cocoa',
    number: 'text-cocoa group-hover:text-chocolate',
    role: 'bg-chocolate text-white',
    tag: 'bg-cocoa/15 text-chocolate',
  },
  {
    container:
      'bg-beige hover:bg-white rounded-tl-[20px] rounded-bl-[20px] rounded-tr-[20px] rounded-br-[20px] border-l-[3px] border-b-[3px] border-l-cocoa border-b-cocoa',
    number: 'text-cocoa group-hover:text-chocolate',
    role: 'bg-chocolate text-white',
    tag: 'bg-cocoa/15 text-chocolate',
  },
  {
    container:
      'bg-beige hover:bg-white rounded-tr-[20px] rounded-br-[20px] rounded-tl-[20px] rounded-bl-[20px] border-r-[3px] border-b-[3px] border-b-cocoa',
    number: 'text-cocoa group-hover:text-chocolate',
    role: 'bg-chocolate text-white',
    tag: 'bg-cocoa/15 text-chocolate',
  },
]

const stages = [
  { id: '01', title: 'Empathize', sub: 'Understand people' },
  { id: '02', title: 'Define', sub: 'Frame the problem' },
  { id: '03', title: 'Ideate', sub: 'Explore ideas' },
  { id: '04', title: 'Prototype', sub: 'Make it tangible' },
  { id: '05', title: 'Test', sub: 'Learn & adapt' },
]

export default function Projects({projects}: {projects?: Project[]}) {
  const [hovered, setHovered] = useState(-1)
  const progress = hovered < 0 ? 0 : (hovered + 1) / stages.length
  const visibleProjects = projects?.length ? projects : fallbackProjects

  return (
    <section
      id="project"
      className="bg-ivory min-h-screen flex flex-col justify-center py-[40px] md:py-[50px]"
    >
      <div className="max-w-[1200px] w-full mx-auto px-[20px] md:px-[40px]">
        <h2 className="font-serif text-[34px] md:text-[44px] text-espresso mb-[36px] leading-tight">
          Projects that show
          <span className="text-peacock italic"> how I work.</span>
        </h2>

        {/* 4 project cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-[16px] mb-[40px]">
          {visibleProjects.map((project, i) => {
            const style = cardStyles[i % cardStyles.length]
            const number = String(i + 1).padStart(2, '0')
            return (
              <article
                key={'_id' in project ? project._id : project.id}
                className={`group ${style.container} p-[20px] transition-all cursor-pointer hover:border-pastel-teal flex flex-col`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className={`font-serif text-[20px] transition-colors ${style.number}`}>
                    {number}
                  </span>
                  <span className={`text-[11px] font-semibold px-[10px] py-[4px] rounded-full ${style.role}`}>
                    {project.role}
                  </span>
                </div>

                <h3 className="font-serif text-[19px] md:text-[21px] text-deep-teal mb-2 leading-tight">
                  {'title' in project ? project.title : project.name}
                </h3>

                <p className="text-[13px] leading-[22px] text-espresso/75 mb-4 flex-grow">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span key={tag} className={`text-[11px] font-medium px-[10px] py-[3px] rounded-full ${style.tag}`}>
                      {tag}
                    </span>
                  ))}
                </div>
                  { 'slug' in project && project.slug?.current ? (
                    <a
                      href={`/projects/${project.slug.current}`}
                      className="inline-flex items-center gap-2 text-[13px] font-semibold text-deep-teal no-underline group-hover:text-peacock transition-colors"
                    >
                      View case study
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-2 text-[13px] font-semibold text-deep-teal">
                      View case study
                      <span>→</span>
                    </span>
                  )}
              </article>
            )
          })}
        </div>

        {/* Horizontal timeline band */}
        <div>
          <div className="flex items-end justify-between mb-4">
            <p className="text-[13px] font-bold text-ocean tracking-[2px] uppercase">
              How I approach projects
            </p>
            <p className="hidden md:block text-[14px] text-espresso/60 italic max-w-[360px] text-right">
              I start with people, define the problem, explore possibilities, then build and learn.
            </p>
          </div>

          <div
            onMouseLeave={() => setHovered(-1)}
            className="relative bg-deep-teal rounded-[20px] px-8 py-8"
          >
            <div className="relative mb-6">
              <div className="absolute top-3 left-4 right-4 h-[3px] bg-white/20 rounded-full"></div>
              <div
                className="absolute top-3 left-4 h-[3px] bg-soft-aqua rounded-full transition-all duration-500"
                style={{ width: `${progress * 85}%` }}
              ></div>

              <div className="relative grid grid-cols-5 gap-2">
                {stages.map((stage, i) => {
                  const active = i <= hovered
                  return (
                    <div
                      key={stage.id}
                      onMouseEnter={() => setHovered(i)}
                      className="flex flex-col items-center text-center cursor-pointer"
                    >
                      <span
                        className={`w-[22px] h-[22px] rounded-full border-2 flex items-center justify-center transition-colors duration-300 ${
                          active
                            ? 'bg-soft-aqua border-soft-aqua'
                            : 'bg-transparent border-white/40'
                        }`}
                      >
                        <span className="text-[9px] font-bold text-deep-teal leading-none">{stage.id}</span>
                      </span>
                      <span className={`mt-3 font-serif text-[13px] md:text-[15px] transition-colors ${active ? 'text-white' : 'text-white/50'}`}>
                        {stage.title}
                      </span>
                      <span className={`text-[10px] md:text-[12px] mt-1 transition-colors ${active ? 'text-soft-aqua' : 'text-white/40'}`}>
                        {stage.sub}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>

            <p className="text-center font-serif italic text-[15px] md:text-[17px] text-pastel-teal/90 leading-snug">
              Projects rarely move in a straight line.
              <span className="text-white"> I learn, adapt and iterate along the way.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}