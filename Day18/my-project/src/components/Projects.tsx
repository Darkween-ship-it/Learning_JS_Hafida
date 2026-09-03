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

export default function Projects() {
  return (
    <section id="project" className="bg-ivory py-[100px] md:py-[120px]">
      <div className="max-w-[1100px] mx-auto px-[20px] md:px-[50px] lg:px-[80px]">
       
        <h2 className="font-serif text-[42px] md:text-[52px] text-espresso mb-16 leading-tight">
          Projects that show
          <br />
          <span className="text-peacock italic">how I work.</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-[30px]">
          {projects.map((project) => (
            <article
              key={project.id}
              className="group bg-beige rounded-[20px] p-[36px] md:p-[44px] border border-transparent hover:border-pastel-teal hover:bg-white transition-all cursor-pointer"
            >
              {/* Project number */}
              <div className="flex items-center justify-between mb-8">
                <span className="font-serif text-[28px] text-soft-aqua group-hover:text-peacock transition-colors">
                  {project.id}
                </span>
                <span className="text-[13px] font-semibold text-white bg-deep-teal px-[16px] py-[6px] rounded-full">
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
                    className="text-[12px] font-medium text-deep-teal bg-pastel-teal/50 px-[12px] py-[4px] rounded-full"
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
          ))}
        </div>
      </div>
    </section>
  )
}