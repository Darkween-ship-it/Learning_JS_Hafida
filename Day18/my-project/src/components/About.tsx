export default function About() {
  return (
    <section id="about" className="bg-beige py-[100px] md:py-[120px]">
      <div className="max-w-[1100px] mx-auto px-[20px] md:px-[50px] lg:px-[80px]">
        <h2 className="font-serif text-[42px] md:text-[52px] text-espresso mb-10 leading-tight">
          A little
          <br />
          <span className="text-peacock italic">about me.</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-[40px] md:gap-[60px]">
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
            <div className="bg-ivory rounded-[20px] p-[36px] border border-pastel-teal/40 hover:shadow-lg transition-shadow overflow-hidden">
              <img
                src="/The Independent Photographer Has Released The Winners Of Its Travel Photography Contest.jpg"
                alt="Photography"
                className="w-full h-[200px] object-cover rounded-[14px] mb-6"
              />
              <h4 className="font-serif text-[22px] text-deep-teal mb-2">Photography</h4>
              <p className="text-[15px] leading-[26px] text-espresso/70">
                Capturing details, people and places.
              </p>
            </div>

            {/* Exploring card */}
            <div className="bg-ivory rounded-[20px] p-[36px] border border-pastel-teal/40 hover:shadow-lg transition-shadow overflow-hidden">
              <img
                src="/explorer.jpg"
                alt="Exploring new places"
                className="w-full h-[200px] object-cover rounded-[14px] mb-6"
              />
              <h4 className="font-serif text-[22px] text-deep-teal mb-2">Exploring new places</h4>
              <p className="text-[15px] leading-[26px] text-espresso/70">
                Discovering new environments, cultures and perspectives.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}