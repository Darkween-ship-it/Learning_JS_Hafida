export default function Hero() {
  return (
    <section className="relative flex items-center justify-between pl-[110px] pr-0 max-w-[1600px] mx-auto min-h-[calc(100vh-90px)] gap-10">
      {/* Left Content */}
      <div className="flex flex-col max-w-[620px]">
        {/* Small label */}
        <p className="text-[13px] font-bold text-ocean tracking-[2px] mb-6 uppercase">
          Aspiring Project Manager <span className="border-t-2 border-peacock"></span>
        </p>

        {/* Headline - serif */}
        <h1 className="font-serif text-[52px] md:text-[64px] lg:text-[76px] leading-[0.95] text-espresso mb-7">
          Turn{' '}
          <span className="text-peacock">Ideas</span>
          <br />
          Into{' '}
          <span className="text-peacock">Action.</span>
          <span className="cursor-blink text-peacock">|</span>
        </h1>

        {/* Intro Paragraph */}
        <p className="text-[16px] md:text-[20px] lg:text-[22px] leading-[34px] text-cocoa mb-9 font-normal">
          Hey, I'm Amara N. Mbarga, an aspiring Project Manager passionate
          about bringing people, ideas and execution together. I enjoy turning
          complex challenges into clear plans and helping teams move from an
          idea to a meaningful result.
        </p>

        {/* CTA Buttons */}
        <div className="flex gap-[14px] md:gap-[18px] flex-wrap">
          <a
            href="#project"
            className="bg-deep-teal text-white px-[32px] md:px-[40px] py-[16px] md:py-[18px] rounded-[14px] text-[16px] md:text-[18px] font-semibold no-underline hover:bg-peacock transition-colors text-center"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="border-2 border-sand bg-transparent text-espresso px-[32px] md:px-[40px] py-[16px] md:py-[18px] rounded-[14px] text-[16px] md:text-[18px] font-semibold no-underline hover:bg-beige/50 transition-colors text-center"
          >
            Let's Connect
          </a>
        </div>

        
      </div>

      {/* Right - Hero Image with arched left edge */}
      <div className="relative flex-shrink-0 self-stretch pr-0">
        <img
          src="/download.jpg"
          alt="Amara Mbarga"
          className="w-[420px] md:w-[480px] lg:w-[560px] object-cover h-[calc(100vh-90px)]"
          style={{ borderRadius: '250px 0px 0px 0px' }}
        />
        
      </div>
    </section>
  )
}