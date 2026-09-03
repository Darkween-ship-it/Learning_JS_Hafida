import AvailabilityBadge from './AvailabilityBadge'

export default function Hero() {
  return (
    <section className="flex items-center justify-between px-[110px] pt-[10px] pb-[80px] max-w-[1440px] mx-auto gap-[60px]">
      {/* Left Content */}
      <div className="flex flex-col max-w-[560px]">
        <h1 className="text-[65px] font-bold text-teal leading-none mb-[60px] tracking-tight">
          Turning ideas into Measurable outcomes<span className="cursor-blink">|</span>
        </h1>

        <p className="text-[28px] leading-[40px] text-text-body mb-[50px] font-normal">
          Hey, I'm Amara N. Mbarga an aspiring project
          Manager passionate about bringing peoples,
          ideas and execution together, through digital,
          community and Tech projects. I have learned
          how to coordinate challenges and turn plans
          into meaningful results
        </p>

        <div className="flex gap-[18px]">
          <a
            href="#project"
            className="bg-teal-dark text-white px-[36px] py-[16px] rounded-[14px] text-[18px] font-medium no-underline hover:opacity-90 transition-opacity text-center"
          >
            View my Work
          </a>
          <a
            href="#contact"
            className="border border-border-light bg-transparent text-[#1a1a1a] px-[36px] py-[16px] rounded-[14px] text-[18px] font-medium no-underline hover:bg-white/50 transition-colors text-center"
          >
            Let's Connect
          </a>
        </div>
      </div>

      {/* Right - Hero Image with arched left edge */}
      <div className="relative flex-shrink-0">
        <img
          src="/download.jpg"
          alt="Amara Mbarga"
          className="w-[520px] h-[640px] object-cover"
          style={{ borderRadius: '220px 0px 0px 220px' }}
        />
        <AvailabilityBadge />
      </div>
    </section>
  )
}
