import {Fragment} from 'react'
import type {Profile} from '../sanity/content'
import {urlFor} from '../sanity/image'

const fallbackHeadline = [
  {_key: 'fallback-1', lead: 'Turn', accent: 'Ideas'},
  {_key: 'fallback-2', lead: 'Into', accent: 'Action.'},
]

const fallbackIntro =
  "Hey, I'm Louis Motaze, an aspiring Project Manager passionate about bringing people, ideas and execution together. I enjoy turning complex challenges into clear plans and helping teams move from an idea to a meaningful result."

export default function Hero({profile}: {profile?: Profile | null}) {
  const label = profile?.heroLabel || profile?.title || 'Aspiring Project Manager'
  const intro = profile?.heroIntro || profile?.shortMessage || fallbackIntro
  const headline = profile?.heroHeadline?.length ? profile.heroHeadline : fallbackHeadline
  const heroImageUrl = profile?.heroImage?.asset
    ? urlFor(profile.heroImage).width(1200).url()
    : undefined
  const heroImageAlt =
    profile?.heroImage?.alt || profile?.name || 'Portrait of Louis Motaze'

  return (
    <section
      id="hero"
      className="relative flex flex-col md:flex-row-reverse items-center justify-between gap-10 max-w-[1600px] mx-auto px-6 md:px-0 md:pl-[110px] pt-[40px] md:pt-0 pb-20 md:pb-0 md:min-h-[calc(100vh-90px)]"
    >
      {/* Hero Image - first in DOM so it stacks ABOVE the text on mobile */}
      <div className="relative flex-shrink-0 md:self-stretch">
        <img
          src={heroImageUrl ?? '/Louis.jpeg'}
          alt={heroImageAlt}
          className="w-[220px] h-[280px] md:w-[480px] lg:w-[560px] md:h-[calc(100vh-90px)] object-cover object-top rounded-[20px] md:rounded-tl-[250px] md:rounded-tr-[0px] md:rounded-br-[0px] md:rounded-bl-[0px]"
        />
      </div>

      {/* Left Content */}
      <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-[340px] md:max-w-[620px]">
        {/* Small label */}
        <p className="text-[13px] font-bold text-ocean tracking-[2px] mb-6 uppercase">
          {label} <span className="border-t-2 border-peacock"></span>
        </p>

        {/* Headline - serif */}
        <h1 className="font-serif text-[clamp(2.5rem,11vw,4rem)] md:text-[64px] lg:text-[76px] leading-[0.95] text-espresso mb-7">
          {headline.map((line, i) => (
            <Fragment key={line._key ?? i}>
              {line.lead} <span className="text-peacock">{line.accent}</span>
              {i < headline.length - 1 && <br />}
            </Fragment>
          ))}
          <span className="cursor-blink text-peacock"></span>
        </h1>

        {/* Intro Paragraph */}
        <p className="text-[16px] md:text-[20px] lg:text-[22px] leading-[34px] text-cocoa mb-9 font-normal">
          {intro}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col md:flex-row w-full md:w-auto gap-[14px] md:gap-[18px]">
          <a
            href="#project"
            className="bg-deep-teal text-white px-[32px] md:px-[40px] py-[16px] md:py-[18px] rounded-[14px] text-[16px] md:text-[18px] font-semibold no-underline hover:bg-peacock transition-colors text-center w-full md:w-auto"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="border-2 border-sand bg-transparent text-espresso px-[32px] md:px-[40px] py-[16px] md:py-[18px] rounded-[14px] text-[16px] md:text-[18px] font-semibold no-underline hover:bg-beige/50 transition-colors text-center w-full md:w-auto"
          >
            Let's Connect
          </a>
        </div>
      </div>
    </section>
  )
}