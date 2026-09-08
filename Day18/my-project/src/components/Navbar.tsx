const navLinks = ['Home', 'About', 'Project', 'Experience', 'Skills', 'Achievements', 'Contact']

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-[20px] md:px-[50px] lg:px-[78px] py-[20px] md:py-[35px] max-w-[1440px] mx-auto">
      <span className="text-[18px] md:text-[20px] font-bold text-deep-teal tracking-tight font-sans">
        Motaze Louis
      </span>
      <ul className="hidden md:flex items-center gap-[24px] lg:gap-[40px] list-none m-0 p-0">
        {navLinks.map((link) => (
          <li key={link}>
            <a
              href={`#${link.toLowerCase()}`}
              className="text-[13px] md:text-[15px] font-medium text-espresso no-underline hover:text-peacock transition-colors"
            >
              {link}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}