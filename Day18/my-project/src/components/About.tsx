export default function About() {
  return (
    <section id="about" className="bg-beige py-[100px] md:py-[120px]">
      <div className="max-w-[1100px] mx-auto px-[20px] md:px-[50px] lg:px-[80px]">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-[40px] md:gap-[300px] mb-10">
          {/* Heading */}
          <h2 className="font-serif text-[60px] md:text-[72px] text-espresso leading-tight">
            A little
            <br></br>
            <span className="text-peacock italic">about me.</span>
          </h2>

          <div className="group relative w-[300px] h-[250px] shrink-0 grid place-items-center">
            {/* rotating dashed ring */}
            <div
              className="absolute inset-0 rounded-full border-[2px] border-dashed border-peacock/40 animate-spin"
              style={{ animationDuration: '30s' }}
            ></div>
            {/* smaller solid accent ring */}
            <div className="absolute inset-[25px] rounded-full border border-pastel-teal"></div>

            {/* image - regular circle */}
            <img
              src="/Misty Morning Hikes & Wilderkind Moods _ UK Travel Aesthetic.jpg"
              alt="Hiking in the mist"
              className="w-[200px] h-[190px] object-cover rounded-full transition-transform duration-700 group-hover:scale-105"
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

      </div>
    </section>
  )
}