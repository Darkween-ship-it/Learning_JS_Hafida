export default function About() {
  return (
    <section id="about" className="bg-beige py-[100px] md:py-[120px]">
      <div className="max-w-[1100px] mx-auto px-[20px] md:px-[50px] lg:px-[80px]">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-[40px] md:gap-[60px] mb-10">
          {/* Heading */}
          <h2 className="font-serif text-[42px] md:text-[52px] text-espresso leading-tight">
            A little
            <br />
            <span className="text-peacock italic">about me.</span>
          </h2>

          <div className="group w-[250px] h-[250px] shrink-0">
            <svg className="w-full h-full block">
              <defs>
                <clipPath id="boneClip" clipPathUnits="objectBoundingBox">
                  <path d="
                    M 0.5 0.02
                    C 0.62 0, 0.72 0.08, 0.68 0.22
                    C 0.86 0.16, 0.98 0.3, 0.94 0.46
                    C 0.98 0.5, 0.98 0.56, 0.9 0.58
                    C 0.92 0.74, 0.8 0.86, 0.66 0.78
                    C 0.62 0.9, 0.55 0.99, 0.45 0.95
                    C 0.4 0.99, 0.34 0.94, 0.38 0.82
                    C 0.24 0.88, 0.1 0.76, 0.16 0.6
                    C 0.06 0.58, 0.05 0.5, 0.12 0.46
                    C 0.1 0.32, 0.2 0.2, 0.34 0.24
                    C 0.36 0.1, 0.44 0.02, 0.5 0.02
                    Z
                  " />
                </clipPath>
              </defs>
            </svg>
            <img
              src="/Misty Morning Hikes & Wilderkind Moods _ UK Travel Aesthetic.jpg"
              alt="Hiking in the mist"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              style={{ clipPath: 'url(#boneClip)' }}
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-[40px] md:gap-[60px] items-start">
          <p className="text-[16px] md:text-[18px] leading-[32px] text-espresso/80">
            I'm Amara, an aspiring Project Manager who enjoys working at the
            intersection of people, ideas and execution.
            <br />
            <br />
            I'm fascinated by what happens between having a great idea and
            actually making it happen. From defining objectives and organizing
            tasks to coordinating people and solving unexpected problems, I enjoy
            creating the structure that helps projects move forward.
          </p>

          <p className="text-[16px] md:text-[18px] leading-[32px] text-espresso/80">
            My experience has grown through digital, community and
            technology-focused projects, where I've learned that successful
            project management isn't only about timelines and deliverables.
            It's also about understanding people, communicating clearly and
            adapting when things don't go according to plan.
          </p>
        </div>

        <blockquote className="mt-[60px] border-l-4 border-soft-aqua pl-[24px] py-2">
          <p className="font-serif text-[22px] md:text-[28px] text-deep-teal leading-snug italic">
            "I don't just want to manage projects. I want to understand the
            people behind them and help turn their ideas into something real."
          </p>
        </blockquote>

        {/* Human side */}
        <div className="mt-[100px]">
          <h3 className="font-serif text-[32px] md:text-[40px] text-espresso mb-8">
            When I'm not managing projects...
          </h3>
          <p className="text-[16px] md:text-[18px] leading-[32px] text-espresso/80 max-w-[700px] mb-10">
            You'll probably find me with a camera in my hands or planning my next
            trip. Photography has taught me to slow down and notice details.
            Exploring new places has taught me to stay curious, adapt quickly and
            appreciate different perspectives.
            <br />
            <br />
            Both have shaped the way I approach projects:{' '}
            <strong className="text-deep-teal">observe, understand, adapt and create.</strong>
          </p>

          <div className="grid md:grid-cols-2 gap-[30px]">
            {/* Photography card */}
            <div className="group relative bg-ivory rounded-[20px] p-[36px] border border-pastel-teal/40 hover:shadow-lg transition-shadow overflow-hidden h-[320px] flex items-end">
              <img
                src="/The Independent Photographer Has Released The Winners Of Its Travel Photography Contest.jpg"
                alt="Photography"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-espresso/50 transition-colors duration-500"></div>
              <div className="relative z-10">
                <h4 className="font-serif text-[22px] text-white mb-2">Photography</h4>
                <p className="text-[15px] leading-[26px] text-white/80">
                  Capturing details, people and places.
                </p>
              </div>
            </div>

            {/* Exploring card */}
            <div className="group relative bg-ivory rounded-[20px] p-[36px] border border-pastel-teal/40 hover:shadow-lg transition-shadow overflow-hidden h-[320px] flex items-end">
              <img
                src="/explorer.jpg"
                alt="Exploring new places"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-espresso/50 transition-colors duration-500"></div>
              <div className="relative z-10">
                <h4 className="font-serif text-[22px] text-white mb-2">Exploring new places</h4>
                <p className="text-[15px] leading-[26px] text-white/80">
                  Discovering new environments, cultures and perspectives.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}