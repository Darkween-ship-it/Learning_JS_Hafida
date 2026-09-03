const navLinks = ['Home', 'About', 'Project', 'Experience', 'Skills', 'Achievements', 'Contact']

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-[78px] py-[35px] max-w-[1440px] mx-auto">
      <span className="text-[20px] font-medium text-[#1a1a1a] tracking-tight">
        Amara Mbarga
      </span>
      <ul className="flex items-center gap-[40px] list-none m-0 p-0">
        {navLinks.map((link) => (
          <li key={link}>
            <a
              href={`#${link.toLowerCase()}`}
              className="text-[15px] font-medium text-[#1a1a1a] no-underline hover:text-teal transition-colors"
            >
              {link}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
