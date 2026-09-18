import {useEffect, useState} from 'react'
import type {Experience as ExperienceEntry} from '../sanity/content'

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
      'Managed scope, timelines and feedback',
    ],
    tags: ['Project Management', 'Figma', 'Team Coordination'],
  },
]

export default function Experience({experiences}: {experiences?: ExperienceEntry[]}) {
  const [index, setIndex] = useState(0)
  const [dir, setDir] = useState<1 | -1>(1)
  const [phase, setPhase] = useState<'in' | 'out'>('in')

  const visible = experiences?.length ? experiences : fallbackExperiences
  const count = visible.length

  const change = (step: 1 | -1) => {
    if (phase === 'out' || count < 2) return
    setDir(step)
    setPhase('out')
  }

  useEffect(() => {
    if (phase !== 'out') return
    const timer = setTimeout(() => {
      setIndex((i) => (i + dir + count) % count)
      setPhase('in')
    }, 290)
    return () => clearTimeout(timer)
  }, [phase, dir, count])

  const exp = visible[index]
  const key = '_id' in exp ? exp._id : exp.id
  const org = 'organization' in exp ? exp.organization : exp.org
  const essence = exp.points?.[0] || exp.tags?.slice(0, 3).join(' · ') || exp.role

  return (
    <section id="experience" className="bg-beige py-[35px] md:py-[45px] flex items-center min-h-screen">
      <div className="w-full max-w-[920px] mx-auto px-[20px] md:px-[40px]">
        {/* Header */}
        <p className="text-[11px] font-bold text-ocean tracking-[2px] uppercase mb-2">
          Experience
        </p>
        <h2 className="font-serif text-[26px] md:text-[30px] text-espresso max-w-[440px] leading-tight">
          The moments that shaped{' '}
          <span className="text-peacock italic">how I work.</span>
        </h2>

        {/* Rotating card */}
        <div className="mt-5 bg-ivory border border-pastel-teal/50 rounded-[16px] p-5 md:p-6 flex flex-col min-h-[220px]">
          <div
            key={key}
            className={`flex-1 flex flex-col ${
              phase === 'out'
                ? `transition-all duration-[300ms] ease-out opacity-0 ${
                    dir === 1 ? '-translate-y-3' : 'translate-y-3'
                  }`
                : dir === 1
                  ? 'animate-experience-down'
                  : 'animate-experience-up'
            }`}
          >
            {/* Top row: period + role chip */}
            <div className="flex items-center justify-between gap-4 mb-4">
              <span className="font-serif text-[14px] md:text-[16px] text-espresso tracking-wide tabular-nums">
                {exp.period}
              </span>
              <span className="text-[10px] font-semibold text-deep-teal bg-pastel-teal/50 px-[8px] py-[2px] rounded-full shrink-0">
                {exp.role}
              </span>
            </div>

            {/* Title + organization */}
            <h3 className="font-serif text-[20px] md:text-[24px] text-deep-teal leading-tight line-clamp-2">
              {exp.title}
            </h3>
            <p className="mt-1 text-[12px] md:text-[13px] font-medium text-cocoa line-clamp-1">{org}</p>

            {/* Essence */}
            <div className="mt-4 pt-4 border-t border-espresso/10">
              <p className="text-[13px] md:text-[14px] leading-[22px] text-espresso/80 line-clamp-2">
                {essence}
              </p>
            </div>
          </div>

          {/* Controls */}
          <div className="mt-4 flex items-center justify-center gap-6">
            <button
              onClick={() => change(-1)}
              disabled={count < 2}
              aria-label="Previous experience"
              className="w-[34px] h-[34px] rounded-full border-2 border-peacock/40 text-peacock flex items-center justify-center text-[14px] transition-colors hover:border-peacock hover:bg-peacock hover:text-ivory disabled:opacity-30 disabled:pointer-events-none"
            >
              ←
            </button>
            <span className="font-serif text-[14px] text-espresso tabular-nums">
              {String(index + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
            </span>
            <button
              onClick={() => change(1)}
              disabled={count < 2}
              aria-label="Next experience"
              className="w-[34px] h-[34px] rounded-full border-2 border-peacock/40 text-peacock flex items-center justify-center text-[14px] transition-colors hover:border-peacock hover:bg-peacock hover:text-ivory disabled:opacity-30 disabled:pointer-events-none"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}