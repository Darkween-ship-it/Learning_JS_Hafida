const projects = [
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
  // 01 - rounded top heavy + soft-aqua accent
  {
    container: 'bg-beige hover:bg-white rounded-tl-[48px] rounded-bl-[20px] rounded-r-[20px] border-l-[3px] border-t-[3px] border-t-soft-aqua border-l-soft-aqua',
    number: 'text-soft-aqua group-hover:text-peacock',
    role: 'bg-deep-teal text-white',
    tag: 'bg-pastel-teal/50 text-deep-teal',
  },
  // 02 - rounded right heavy + sand tint on hover
  {
    container: 'bg-beige hover:bg-white rounded-tr-[48px] rounded-br-[20px] rounded-l-[20px] border-t-[3px] border-r-[3px] border-t-sand border-r-sand',
    number: 'text-sand group-hover:text-cocoa',
    role: 'bg-cocoa text-white',
    tag: 'bg-sand/40 text-cocoa',
  },
  // 03 - rounded bottom heavy + peacock accent
  {
    container: 'bg-beige hover:bg-white rounded-tl-[20px] rounded-bl-[48px] rounded-r-[20px] border-l-[3px] border-b-[3px]  border-l-peacock border-b-peacock',
    number: 'text-peacock group-hover:text-ocean',
    role: 'bg-peacock text-white',
    tag: 'bg-peacock/10 text-peacock',
  },
  // 04 - rounded left heavy + olive/warm accent
  {
    container: 'bg-beige hover:bg-white rounded-tr-[20px] rounded-br-[48px] rounded-l-[20px] border-r-[3px]  border-b-[3px]  border-b-cocoa, border-b-cocoa',
    number: 'text-cocoa group-hover:text-chocolate',
    role: 'bg-chocolate text-white',
    tag: 'bg-cocoa/15 text-chocolate',
  },
]

export default function Projects() {
  return (
    <section id="project" className="bg-ivory py-[100px] md:py-[120px]">
      <div className="max-w-[1100px] mx-auto px-[20px] md:px-[50px] lg:px-[80px]">
        <h2 className="font-serif text-[42px] md:text-[52px] text-espresso mb-16 leading-tight">
          Projects that show
          <span className="text-peacock italic">how I work.</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-[30px]">
          {projects.map((project, i) => {
            const style = cardStyles[i % cardStyles.length]
            return (
              <article
                key={project.id}
                className={`group ${style.container} p-[36px] md:p-[44px] transition-all cursor-pointer hover:border-pastel-teal`}
              >
                {/* Project number */}
                <div className="flex items-center justify-between mb-8">
                  <span
                    className={`font-serif text-[28px] transition-colors ${style.number}`}
                  >
                    {project.id}
                  </span>
                  <span
                    className={`text-[13px] font-semibold px-[16px] py-[6px] rounded-full ${style.role}`}
                  >
                    {project.role}
                  </span>
                </div>

                {/* Project name */}
                <h3 className="font-serif text-[26px] md:text-[30px] text-deep-teal mb-3 leading-tight">
                  {project.name}
                </h3>

                {/* Description */}
                <p className="text-[16px] leading-[28px] text-espresso/75 mb-6">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`text-[12px] font-medium px-[12px] py-[4px] rounded-full ${style.tag}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Link */}
                <a
                  href={`#project-${project.id}`}
                  className="inline-flex items-center gap-2 text-[15px] font-semibold text-deep-teal no-underline group-hover:text-peacock transition-colors"
                >
                  View case study
                  <span className="group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </a>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}