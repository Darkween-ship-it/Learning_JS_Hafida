import {useState} from 'react'
import {Link} from 'react-router-dom'
import {Menu, X} from 'lucide-react'

const navItems = [
  {label: 'Home', to: '/#hero'},
  {label: 'About', to: '/#about'},
  {label: 'Project', to: '/#project'},
  {label: 'Experience', to: '/#experience'},
  {label: 'Skills', to: '/#skills'},
  {label: 'Achievements', to: '/#achievements'},
  {label: 'Contact', to: '/#contact'},
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const close = () => setOpen(false)

  return (
    <>
      <nav className="relative flex items-center justify-between px-[20px] md:px-[50px] lg:px-[78px] py-[20px] md:py-[35px] max-w-[1440px] mx-auto">
        <Link
          to="/#hero"
          className="text-[18px] md:text-[20px] font-bold text-deep-teal tracking-tight font-sans no-underline"
        >
          Motaze Louis
        </Link>

        <ul className="hidden md:flex items-center gap-[24px] lg:gap-[40px] list-none m-0 p-0">
          {navItems.map((item) => (
            <li key={item.label}>
              <Link
                to={item.to}
                className="text-[13px] md:text-[15px] font-medium text-espresso no-underline hover:text-peacock transition-colors"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden flex items-center justify-center w-[44px] h-[44px] rounded-[14px] border-2 border-sand bg-ivory text-deep-teal hover:text-peacock hover:bg-beige/50 transition-colors"
        >
          {open ? <X size={20} strokeWidth={2.5} /> : <Menu size={20} strokeWidth={2.5} />}
        </button>
      </nav>

      {/* Transparent click-catcher: closes the menu on outside taps without a visual scrim */}
      {open && (
        <button
          type="button"
          aria-label="Close menu"
          onClick={close}
          className="md:hidden fixed inset-0 z-40 w-full h-full bg-transparent cursor-default"
        />
      )}

      {/* Mobile floating panel */}
      <div
        id="mobile-nav"
        className={`md:hidden fixed top-[76px] right-[20px] z-50 origin-top-right transition-all duration-300 ease-out ${
          open
            ? 'opacity-100 scale-100 translate-y-0'
            : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
        }`}
      >
        <div className="w-[min(72vw,260px)] rounded-[16px] border border-peacock/30 bg-ivory/95 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.08)] p-[10px]">
          <p className="text-[11px] font-bold text-ocean tracking-[2px] uppercase px-[12px] pt-[8px] pb-[6px]">
            Menu
          </p>
          <ul className="list-none m-0 p-0 divide-y divide-espresso/5 rounded-[12px]">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.to}
                  onClick={close}
                  className="flex items-center justify-between gap-[10px] px-[12px] py-[12px] rounded-[12px] text-[14px] font-medium text-espresso no-underline hover:bg-beige/60 hover:text-peacock transition-colors"
                >
                  {item.label}
                  <span className="w-[6px] h-[6px] rounded-full bg-soft-aqua shrink-0" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}