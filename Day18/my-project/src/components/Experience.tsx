import { useState } from 'react'
import type { Experience as ExperienceEntry } from '../sanity/content'

const fallbackExperiences = [
  {
    id: '01',
    title: 'Project Coordinator',
    org: 'Youth & Community Initiatives',
    period: '2025 — Present',
    role: 'Project Coordinator',
    points: [
      'Coordinated volunteers and community activities',
      'Planned and scheduled community initiatives',
      'Managed communication and coordination',
      'Tracked deliverables and follow-ups',
    ],
    tags: ['Coordination', 'Planning', 'Communication'],
  },
  {
    id: '02',
    title: 'SDG Academy Fellow',
    org: 'ROLFES SDG Academy',
    period: '2025',
    role: 'Fellowship',
    points: [
      'Studied the Sustainable Development Goals',
      'Collaborated on real-world problem solving',
      'Developed a solutions mindset across disciplines',
    ],
    tags: ['SDGs', 'Collaboration', 'Problem Solving'],
  },
  {
    id: '03',
    title: 'Project Lead',
    org: 'Independent Digital Projects',
    period: '2024 — Present',
    role: 'Project Lead',
    points: [
      'Led small digital projects from idea to prototype',
      'Coordinated design and development tasks',
      'Managed scope, timelines and feedback',
    ],
    tags: ['Project Management', 'Figma', 'Team Coordination'],
  },
  {
    id: '04',
    title: 'Community & Tech Volunteer',
    org: 'Student Technology & Community Events',
    period: '2023 — 2024',
    role: 'Volunteering',
    points: [
      'Supported event planning and logistics',
      'Helped coordinate participants',
      'Assisted event-day operations',
    ],
    tags: ['Events', 'Logistics', 'Coordination'],
  },
]

export default function Experience({experiences}: {experiences?: ExperienceEntry[]}) {
  const [open, setOpen] = useState<string | null>(null)
  const visibleExperiences = experiences?.length ? experiences : fallbackExperiences

  const toggle = (id: string) => {
    setOpen((cur) => (cur === id ? null : id))
  }

  return (
    <section id="experience" className="bg-beige py-[80px] md:py-[110px]">
      <div className="max-w-[860px] mx-auto px-[20px] md:px-[40px]">
        {/* Header */}
        <p className="text-[13px] font-bold text-ocean tracking-[2px] uppercase mb-4">
          Experience
        </p>
        <h2 className="font-serif text-[36px] md:text-[48px] text-espresso mb-3 leading-tight">
          Where I've learned to work{' '}
          <span className="text-peacock italic">with people, ideas and responsibility.</span>
        </h2>

        {/* Expandable archive list */}
        <div className="mt-14">
          {visibleExperiences.map((exp, i) => {
            const last = i === visibleExperiences.length - 1
            const id = '_id' in exp ? exp._id : exp.id
            const number = String(i + 1).padStart(2, '0')
            const isOpen = open === id

            return (
              <div key={id}>
                <button
                  onClick={() => toggle(id)}
                  className="group w-full flex items-center gap-5 py-6 text-left"
                >
                  {/* Number */}
                  <span className="shrink-0 font-serif text-[20px] md:text-[24px] text-peacock/70 w-[44px]">
                    {number}
                  </span>

                  {/* Title block */}
                  <span className="flex-1 min-w-0">
                    <span className="block font-serif text-[19px] md:text-[24px] text-deep-teal leading-tight group-hover:text-peacock transition-colors">
                      {exp.title}
                    </span>
                    <span className="block text-[13px] md:text-[14px] text-cocoa mt-1">
                      {'organization' in exp ? exp.organization : exp.org}
                    </span>
                    <span className="inline-block mt-2 text-[11px] font-bold text-ocean bg-pastel-teal/40 px-[10px] py-[3px] rounded-full">
                      {exp.period}
                    </span>
                  </span>

                  {/* Expand icon */}
                  <span
                    className={`shrink-0 w-[34px] h-[34px] rounded-full border-2 flex items-center justify-center text-[20px] font-medium leading-none transition-all duration-300 ${
                      isOpen
                        ? 'rotate-180 bg-soft-aqua border-soft-aqua text-deep-teal'
                        : 'border-peacock/40 text-peacock group-hover:border-peacock group-hover:scale-110'
                    }`}
                  >
                    {isOpen ? '−' : '+'}
                  </span>
                </button>

                {/* Accent line */}
                <div className="relative h-[1px]">
                  <div className="absolute inset-0 bg-espresso/15"></div>
                  <div
                    className={`absolute left-0 h-[1px] bg-peacock transition-all duration-500 ${
                      isOpen ? 'w-full' : 'w-0 group-hover:w-[15%]'
                    }`}
                  ></div>
                </div>

                {/* Expandable body */}
                <div
                  className={`grid transition-all duration-500 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100 mt-6 mb-10' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    {/* Folder-style card */}
                    <div className="bg-ivory border border-pastel-teal/40 rounded-[18px] p-6 md:p-8">
                      <p className="text-[11px] font-bold text-ocean tracking-wide uppercase mb-4">
                        What I did
                      </p>
                      <ul className="space-y-2.5 mb-6">
                        {exp.points.map((point) => (
                          <li
                            key={point}
                            className="flex items-start gap-3 text-[14px] md:text-[15px] text-espresso/80 leading-snug"
                          >
                            <span className="mt-[7px] shrink-0 w-[6px] h-[6px] rounded-full bg-peacock"></span>
                            {point}
                          </li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap gap-2">
                        {exp.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[11px] font-medium text-deep-teal bg-peacock/10 px-[10px] py-[4px] rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {last && <p className="mt-4 text-[13px] text-espresso/50 italic"></p>}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}