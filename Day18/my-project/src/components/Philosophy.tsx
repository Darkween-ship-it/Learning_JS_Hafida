const principles = [
  {
    id: '01',
    title: 'Understand first.',
    text: 'Before creating a plan, understand the problem and the people involved.',
  },
  {
    id: '02',
    title: 'Make the plan visible.',
    text: 'Clear goals, responsibilities and timelines help everyone know where we\u2019re going.',
  },
  {
    id: '03',
    title: 'Communicate early.',
    text: 'Small problems are easier to solve when they\u2019re identified early.',
  },
  {
    id: '04',
    title: 'Learn after delivery.',
    text: 'Every project should leave you with something you can do better next time.',
  },
]

export default function Philosophy() {
  return (
    <section id="philosophy" className="bg-pastel-teal py-[100px] md:py-[120px]">
      <div className="max-w-[1100px] mx-auto px-[20px] md:px-[50px] lg:px-[80px]">
        <p className="text-[13px] font-bold text-deep-teal tracking-[2px] uppercase mb-4">
          My approach
        </p>
        <h2 className="font-serif text-[42px] md:text-[52px] text-deep-teal mb-16 leading-tight">
          How I approach
          <br />
          <span className="italic">projects.</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-[30px]">
          {principles.map((principle) => (
            <div
              key={principle.id}
              className="bg-ivory rounded-[20px] p-[36px] border border-soft-aqua/30 hover:bg-white transition-colors"
            >
              <span className="font-serif text-[24px] text-peacock block mb-4">
                {principle.id}
              </span>
              <h3 className="font-serif text-[22px] text-espresso mb-3">
                {principle.title}
              </h3>
              <p className="text-[15px] leading-[28px] text-espresso/70">
                {principle.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}