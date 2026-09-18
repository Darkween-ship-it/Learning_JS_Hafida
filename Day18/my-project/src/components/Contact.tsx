import {Globe, Mail, MessageCircle} from 'lucide-react'
import {useEffect, useRef, useState} from 'react'
import type {ComponentType, MouseEvent} from 'react'
import type {Profile} from '../sanity/content'

type ChannelKind = 'linkedin' | 'whatsapp' | 'github' | 'facebook' | 'instagram' | 'link'

const classify = (label: string): ChannelKind => {
  const l = label.toLowerCase()
  if (l.includes('linkedin')) return 'linkedin'
  if (l.includes('whatsapp')) return 'whatsapp'
  if (l.includes('github')) return 'github'
  if (l.includes('facebook')) return 'facebook'
  if (l.includes('instagram')) return 'instagram'
  return 'link'
}

function LinkedinIcon({size = 18}: {size?: number}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

function GithubIcon({size = 18}: {size?: number}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  )
}

function FacebookIcon({size = 18}: {size?: number}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

function InstagramIcon({size = 18}: {size?: number}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}

type Channel = {
  key: string
  href: string
  label: string
  icon: ComponentType<{size?: number}>
  external?: boolean
}

export default function Contact({profile}: {profile?: Profile | null}) {
  const [copied, setCopied] = useState(false)
  const copyTimer = useRef<number | undefined>(undefined)

  useEffect(() => () => { if (copyTimer.current) window.clearTimeout(copyTimer.current) }, [])

  const title = profile?.title || 'Project Management Student & Intern'
  const email = profile?.email || 'hello@example.com'
  const links = profile?.links || []
  const year = new Date().getFullYear()
  const mailto = email ? `mailto:${email}` : ''

  const whatsappUrl = profile?.whatsappUrl || links.find((l) => classify(l.label) === 'whatsapp')?.url

  const channels: Channel[] = []

  if (mailto) {
    channels.push({key: 'email', href: mailto, label: `Email`, icon: Mail})
  }

  const linkedIn = links.find((l) => classify(l.label) === 'linkedin')
  if (linkedIn) {
    channels.push({key: linkedIn._key ?? 'linkedin', href: linkedIn.url, label: 'LinkedIn', icon: LinkedinIcon, external: true})
  }

  if (whatsappUrl) {
    channels.push({key: 'whatsapp', href: whatsappUrl, label: 'WhatsApp', icon: MessageCircle, external: true})
  }

  const gitHub = links.find((l) => classify(l.label) === 'github')
  if (gitHub) {
    channels.push({key: gitHub._key ?? 'github', href: gitHub.url, label: 'GitHub', icon: GithubIcon, external: true})
  }

  const facebook = links.find((l) => classify(l.label) === 'facebook')
  if (facebook) {
    channels.push({key: facebook._key ?? 'facebook', href: facebook.url, label: 'Facebook', icon: FacebookIcon, external: true})
  }

  const instagram = links.find((l) => classify(l.label) === 'instagram')
  if (instagram) {
    channels.push({key: instagram._key ?? 'instagram', href: instagram.url, label: 'Instagram', icon: InstagramIcon, external: true})
  }

  links
    .filter((l) => classify(l.label) === 'link')
    .forEach((l, i) => {
      channels.push({key: l._key ?? `link-${i}`, href: l.url, label: l.label, icon: Globe, external: true})
    })

  const copyEmail = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    if (!email) return
    try {
      void navigator.clipboard?.writeText(email)
    } catch {
      const el = document.createElement('textarea')
      el.value = email
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
    }
    setCopied(true)
    if (copyTimer.current) window.clearTimeout(copyTimer.current)
    copyTimer.current = window.setTimeout(() => setCopied(false), 2000)
  }

  const navLinks = [
    {label: 'Home', href: '#hero'},
    {label: 'Projects', href: '#project'},
    {label: 'Experience', href: '#experience'},
    {label: 'Contact', href: '#contact'},
  ]

  return (
    <section id="contact" className="bg-deep-teal text-ivory">
      {/* Closing CTA + channels */}
      <div className="max-w-[980px] mx-auto px-[20px] md:px-[40px] pt-[80px] md:pt-[100px] pb-[60px]">
        <p className="text-[11px] font-bold text-soft-aqua tracking-[2px] uppercase mb-4">
          Contact
        </p>
        <h2 className="font-serif text-[38px] md:text-[50px] leading-[1.05] text-ivory">
          LET'S WORK
          <br />
          <span className="italic text-soft-aqua">TOGETHER.</span>
        </h2>
        <p className="mt-5 max-w-[420px] text-[15px] md:text-[16px] leading-[26px] text-ivory/60">
          Have a project, opportunity, or idea you'd like to discuss? Let's connect.
        </p>

        {channels.length > 0 && (
          <div className="mt-10 grid sm:grid-cols-2 gap-x-12 gap-y-4 max-w-[600px]">
            {channels.map((c) =>
              c.key === 'email' ? (
                <a
                  key={c.key}
                  href={c.href}
                  onClick={copyEmail}
                  className="group inline-flex items-center gap-4 py-2"
                >
                  <span className="w-[42px] h-[42px] rounded-full border border-soft-aqua/40 flex items-center justify-center text-soft-aqua transition-colors duration-300 group-hover:bg-soft-aqua group-hover:text-deep-teal">
                    <c.icon size={18} />
                  </span>
                  <span className="text-[15px] md:text-[16px] font-semibold text-ivory/90 group-hover:text-soft-aqua transition-colors" aria-live="polite">
                    {copied ? 'Email copied!' : c.label}
                  </span>
                  {copied ? (
                    <span className="text-soft-aqua text-[13px] font-bold">✓</span>
                  ) : (
                    <span className="text-soft-aqua/50 group-hover:text-soft-aqua transition-colors">↗</span>
                  )}
                </a>
              ) : (
                <a
                  key={c.key}
                  href={c.href}
                  target={c.external ? '_blank' : undefined}
                  rel={c.external ? 'noreferrer' : undefined}
                  className="group inline-flex items-center gap-4 py-2"
                >
                  <span className="w-[42px] h-[42px] rounded-full border border-soft-aqua/40 flex items-center justify-center text-soft-aqua transition-colors duration-300 group-hover:bg-soft-aqua group-hover:text-deep-teal">
                    <c.icon size={18} />
                  </span>
                  <span className="text-[15px] md:text-[16px] font-semibold text-ivory/90 group-hover:text-soft-aqua transition-colors">
                    {c.label}
                  </span>
                  {c.external && (
                    <span className="text-soft-aqua/50 group-hover:text-soft-aqua transition-colors">
                      ↗
                    </span>
                  )}
                </a>
              ),
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-ivory/10">
        <div className="max-w-[980px] mx-auto px-[20px] md:px-[40px] py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-[13px] font-semibold text-ivory/70">{email}</p>
            <p className="text-[12px] text-ivory/40">{title}</p>
          </div>
          <div className="flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[12px] text-ivory/40 hover:text-soft-aqua transition-colors"
              >
                {link.label}
              </a>
            ))}
            <span className="text-[12px] text-ivory/30">{year}</span>
          </div>
        </div>
      </div>
    </section>
  )
}