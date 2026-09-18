import {useState} from 'react'
import type {Skill} from '../sanity/content'

const fallbackSkills = [
  {name: 'Project Planning', category: 'project-management'},
  {name: 'Project Coordination', category: 'project-management'},
  {name: 'Stakeholder Management', category: 'communication'},
  {name: 'Risk Management', category: 'project-management'},
  {name: 'Communication', category: 'communication'},
  {name: 'Leadership', category: 'leadership'},
  {name: 'Design Thinking', category: 'product-management'},
  {name: 'Task & Workflow Management', category: 'project-management'},
  {name: 'Documentation & Reporting', category: 'communication'},
  {name: 'Problem Solving', category: 'leadership'},
  {name: 'Teamwork', category: 'leadership'},
]

const skillDescriptions: Record<string, string> = {
  'Project Planning': 'Defining scope, milestones and the path forward.',
  'Project Coordination': 'Organizing people, tasks and timelines into one rhythm.',
  'Project Management': 'Planning, coordinating and seeing work through.',
  'Stakeholder Management': 'Aligning expectations across everyone involved.',
  'Risk Management': 'Spotting problems early and planning around them.',
  'Communication': 'Clear, honest updates for teams and partners.',
  'Leadership': 'Coordinating people, responsibilities and goals.',
  'Design Thinking': 'Solving problems starting from the people involved.',
  'Task & Workflow Management': 'Breaking work into clear, trackable steps.',
  'Task Management': 'Keeping every task visible and moving.',
  'Documentation & Reporting': 'Capturing decisions so nothing gets lost.',
  'Documentation': 'Capturing decisions so nothing gets lost.',
  'Problem Solving': 'Staying calm and systematic when things go wrong.',
  'Teamwork': 'Building on the strengths of the people around me.',
  'Workflow Management': 'Building repeatable processes that keep work moving.',
  'Agile': 'Iterating quickly with feedback instead of waiting for perfect.',
}

const categoryDescriptions: Record<string, string> = {
  'project-management': 'Planning, coordinating and seeing work through.',
  'product-management': 'Turning ideas into deliverable outcomes.',
  'leadership': 'Guiding people toward a shared goal.',
  'communication': 'Clear, honest collaboration at every step.',
  'technical': 'Comfortable with the tools that keep projects moving.',
  tools: 'Hands-on with the everyday project toolkit.',
}

const cloudSizes = [
  'text-[22px] md:text-[24px] font-semibold',
  'text-[14px] md:text-[15px] font-medium',
  'text-[18px] md:text-[19px] font-semibold',
  'text-[12px] md:text-[13px] font-medium',
  'text-[20px] md:text-[21px] font-semibold',
  'text-[15px] md:text-[16px] font-medium',
]

export default function Skills({skills}: {skills?: Skill[]}) {
  const [hovered, setHovered] = useState<string | null>(null)
  const visible = skills?.length ? skills : fallbackSkills
  const anyHovered = hovered !== null

  const caption = hovered
    ? skillDescriptions[hovered] ||
      categoryDescriptions[visible.find((s) => s.name === hovered)?.category ?? ''] ||
      hovered
    : null

  return (
    <section id="skills" className="bg-ivory py-[35px] md:py-[45px] flex items-center min-h-screen">
      <div className="w-full max-w-[980px] mx-auto px-[20px] md:px-[40px]">
        {/* Header */}
        <p className="text-[11px] font-bold text-ocean tracking-[2px] uppercase mb-2">
          Skills
        </p>
        <h2 className="font-serif text-[26px] md:text-[30px] text-espresso max-w-[560px] leading-tight">
          My toolkit, <span className="text-peacock italic">by feel.</span>
        </h2>

        {/* Typographic cloud */}
        <div className="mt-6 flex flex-wrap gap-x-[26px] gap-y-[8px] md:gap-x-[38px] md:gap-y-[12px] items-baseline">
          {visible.map((skill, i) => {
            const name = skill.name
            const isActive = hovered === name
            const size = cloudSizes[i % cloudSizes.length]
            return (
              <button
                key={(skill as {_id?: string})._id ?? skill.name}
                type="button"
                onMouseEnter={() => setHovered(name)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(name)}
                onBlur={() => setHovered(null)}
                className={`${size} leading-tight transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'font-serif italic text-deep-teal underline decoration-2 underline-offset-[6px] decoration-peacock'
                    : anyHovered
                      ? 'text-espresso/25 hover:text-peacock'
                      : 'text-espresso/75 hover:text-peacock'
                }`}
              >
                {name}
              </button>
            )
          })}
        </div>

        {/* Caption */}
        <div className="mt-5 min-h-[44px]">
          {caption && hovered ? (
            <p key={hovered} className="animate-section-reveal">
              <span className="block text-[10px] font-bold text-ocean uppercase tracking-[2px] mb-1">
                {hovered}
              </span>
              <span className="block text-[13px] md:text-[14px] text-espresso/80">
                {caption}
              </span>
            </p>
          ) : (
            <p className="text-[12px] text-espresso/40 italic">
              Hover a skill to see how I use it.
            </p>
          )}
        </div>
      </div>
    </section>
  )
}