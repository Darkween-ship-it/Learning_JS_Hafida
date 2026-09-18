import {useState} from 'react'
import type {Achievement} from '../sanity/content'

const fallbackAchievements = [
  {
    title: 'First Major Project',
    org: 'National Youth Economic Pre-Forum',
    description:
      'Active contribution to the successful implementation of the project.',
    type: 'project-event',
  },
  {
    title: 'First PM Internship',
    org: 'TIC Foundation',
    description:
      'A first real exposure to professional project management, planning and documentation.',
    type: 'milestone',
  },
  {
    title: 'Team Leader',
    org: 'MAP4CHANGE — AYSA Africa',
    description:
      'Led a four-member team during a community mapping initiative.',
    type: 'leadership',
  },
  {
    title: 'Selected Fellow',
    org: 'IYLN — Cohort 1',
    description:
      'Selected as a fellow in the first cohort of the International Youth Leadership Network.',
    type: 'fellowship',
  },
]

export default function Achievements({achievements}: {achievements?: Achievement[]}) {
  const [openId, setOpenId] = useState<string | null>(null)
  const visible = achievements?.length ? achievements : fallbackAchievements

  const keyFor = (a: (typeof visible)[number]) => ('_id' in a ? a._id : a.title)
  const count = String(visible.length).padStart(2, '0')

  const toggle = (key: string) => {
    setOpenId((cur) => (cur === key ? null : key))
  }

  return (
    <section id="achievements" className="bg-beige py-[90px] md:py-[110px]">
      <div className="max-w-[840px] mx-auto px-[20px] md:px-[40px]">
        {/* Header */}
        <div className="flex items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-[13px] font-bold text-ocean tracking-[2px] uppercase mb-4">
              Achievements
            </p>
            <h2 className="font-serif text-[32px] md:text-[40px] text-espresso leading-tight">
              Proof, <span className="text-peacock italic">not promise.</span>
            </h2>
          </div>
          <div className="text-right shrink-0">
            <span className="block font-serif text-[48px] md:text-[60px] text-peacock leading-none">
              {count}
            </span>
            <p className="text-[11px] md:text-[12px] font-semibold uppercase tracking-[2px] text-espresso/60 max-w-[150px] ml-auto mt-2">
              milestones that shaped my project journey.
            </p>
          </div>
        </div>

        {/* Interactive list */}
        <div>
          {visible.map((a, i) => {
            const key = keyFor(a)
            const isOpen = openId === key
            const number = String(i + 1).padStart(2, '0')
            return (
              <div key={key}>
                <button
                  onClick={() => toggle(key)}
                  className="group w-full flex items-center gap-5 py-5 text-left cursor-pointer"
                >
                  <span className="shrink-0 font-serif text-[18px] md:text-[22px] text-peacock/70 w-[52px]">
                    {number}
                  </span>
                  <span className="flex-1 min-w-0">
                    <span
                      className={`block font-serif text-[20px] md:text-[24px] leading-tight transition-colors ${
                        isOpen ? 'text-peacock' : 'text-deep-teal group-hover:text-peacock'
                      }`}
                    >
                      {a.title}
                    </span>
                  </span>
                  <span
                    className={`shrink-0 text-[16px] text-peacock/60 transition-transform duration-400 ${
                      isOpen ? 'rotate-90' : 'group-hover:translate-x-1'
                    }`}
                  >
                    →
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
                  className={`grid transition-all duration-400 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="pl-[72px] pr-[24px] pb-7">
                      {'org' in a && (
                        <p className="text-[12px] font-bold text-ocean uppercase tracking-wide mb-2">
                          {a.org}
                        </p>
                      )}
                      {'metric' in a && a.metric && (
                        <p className="text-[12px] font-semibold text-espresso/60 mb-2">
                          {a.metric}
                        </p>
                      )}
                      <p className="text-[14px] md:text-[15px] leading-[24px] text-espresso/80">
                        {('description' in a && a.description) || a.title}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}