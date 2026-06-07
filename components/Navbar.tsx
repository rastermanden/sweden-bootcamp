'use client'
import { useEffect, useState } from 'react'

const NAV_LINKS = [
  ['Om bootcampen', '#om'],
  ['Program',       '#program'],
  ['Ophold & Mad',  '#ophold'],
  ['Priser',        '#priser'],
  ['Nærområdet',    '#naeromraade'],
  ['Kontakt',       '#kontakt'],
] as const

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const close = () => setOpen(false)

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-[0_2px_24px_rgba(27,67,50,.10)] py-3'
          : 'py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#hjem"
          className={`font-serif text-[1.3rem] font-bold transition-colors duration-300 ${
            scrolled ? 'text-forest-900' : 'text-white'
          }`}
        >
          Natur{' '}
          <span className={scrolled ? 'text-forest-700' : 'text-sage-300'}>Bootcamp</span>
        </a>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className={`px-3 py-1.5 text-sm font-medium rounded-full transition-colors duration-200 ${
                scrolled
                  ? 'text-gray-600 hover:text-forest-800 hover:bg-forest-900/5'
                  : 'text-white/85 hover:text-white hover:bg-white/10'
              }`}
            >
              {label}
            </a>
          ))}
          <a
            href="#booking"
            className="ml-3 px-5 py-2 bg-forest-800 hover:bg-forest-900 text-white text-sm font-semibold rounded-full transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
          >
            Book nu
          </a>
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Luk menu' : 'Åbn menu'}
          aria-expanded={open}
          className="lg:hidden flex flex-col gap-1.5 p-2 -mr-2"
        >
          {[
            open ? 'rotate-45 translate-y-2' : '',
            open ? 'opacity-0 scale-x-0' : '',
            open ? '-rotate-45 -translate-y-2' : '',
          ].map((extra, i) => (
            <span
              key={i}
              className={`block w-6 h-[2px] transition-all duration-300 rounded-full ${extra} ${
                scrolled ? 'bg-forest-900' : 'bg-white'
              }`}
            />
          ))}
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          open ? 'max-h-[420px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-forest-900 px-6 pb-6 pt-2 flex flex-col">
          {NAV_LINKS.map(([label, href]) => (
            <a
              key={href}
              href={href}
              onClick={close}
              className="text-white/85 hover:text-white text-[1.05rem] font-medium py-3 border-b border-white/10 last:border-0 transition-colors"
            >
              {label}
            </a>
          ))}
          <a
            href="#booking"
            onClick={close}
            className="mt-4 text-center py-3 bg-forest-700 hover:bg-forest-600 text-white font-semibold rounded-full transition-colors text-base"
          >
            Book nu
          </a>
        </div>
      </div>
    </nav>
  )
}
