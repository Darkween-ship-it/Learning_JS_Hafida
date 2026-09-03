import { useState } from 'react'

const stages = [
  { id: '01', title: 'Empathize', sub: 'Understand people' },
  { id: '02', title: 'Define', sub: 'Frame the problem' },
  { id: '03', title: 'Ideate', sub: 'Explore ideas' },
  { id: '04', title: 'Prototype', sub: 'Make it tangible' },
  { id: '05', title: 'Test', sub: 'Learn & adapt' },
]

export default function Philosophy() {
  // -1 = nothing hovered; otherwise 0..4 for EMPATHIZE..TEST
  const [hovered, setHovered] = useState(-1)

  // Line progress 0 (none) → 1 (all five). Hovering a stage fills up to it.
  const progress = hovered < 0 ? 0 : (hovered + 1) / stages.length

  return (
    <section id="philosophy" className="bg-ivory py-[90px] md:py-[110px]">
      <div className="max-w-[1200px] mx-auto px-[20px] md:px-[40px]">
        {/* Heading above the band */}
        <p className="text-[13px] font-bold text-ocean tracking-[2px] uppercase mb-4">
          How I approach projects
        </p>
        <h2 className="font-serif text-[38px] md:text-[46px] text-espresso mb-5 leading-tight">
          Every project starts with
          <span className="text-peacock italic"> understanding.</span>
        </h2>
        <p className="text-[16px] md:text-[18px] leading-[30px] text-espresso/75 max-w-[560px] mb-[50px]">
          I start with people, define the problem, explore possibilities, then
          build and learn.
        </p>

        {/* Deep teal band */}
        <div
          onMouseLeave={() => setHovered(-1)}
          className="relative bg-deep-teal rounded-[24px] px-8 py-10 md:px-12"
        >
          {/* Header row of numbers/dots */}
          <div className="relative mb-8">
            {/* Track line */}
            <div className="absolute top-3 left-4 right-4 h-[3px] bg-white/20 rounded-full"></div>
            {/* Progress line that draws left→right */}
            <div
              className="absolute top-3 left-4 h-[3px] bg-soft-aqua rounded-full transition-all duration-500"
              style={{ width: `${progress * 85}%` }}
            ></div>

            {/* Stage items laid out horizontally */}
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
                    <span className={`mt-4 font-serif text-[13px] md:text-[15px] transition-colors ${active ? 'text-white' : 'text-white/50'}`}>
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

          {/* Iterate note below band */}
          <p className="mt-8 text-center font-serif italic text-[16px] md:text-[19px] text-pastel-teal/90 leading-snug">
            Projects rarely move in a straight line.
            <span className="text-white"> I learn, adapt and iterate along the way.</span>
          </p>
        </div>
      </div>
    </section>
  )
}