'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useI18n } from '@/lib/i18n'
import LanguageSwitcher from './LanguageSwitcher'

const links = [
  { href: '/about', labelKey: 'nav.about' },
  { href: '/topics', labelKey: 'nav.topics' },
  { href: '/chat', labelKey: 'nav.chat' },
  { href: '/contact', labelKey: 'nav.contact' },
]

function NavLink({ href, labelKey }: { href: string; labelKey: string }) {
  const pathname = usePathname()
  const { t } = useI18n()

  // treat child routes as active (e.g., /topics/[slug])
  const isActive =
    pathname === href || (href !== '/' && pathname.startsWith(href))

  const base =
    'px-3 py-1.5 rounded-full text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500'
  const rest = isActive
    ? 'bg-blue-600 text-white shadow-sm'
    : 'text-slate-700 hover:text-blue-700 hover:bg-blue-50'

  return (
    <Link href={href} className={`${base} ${rest}`}>
      {t(labelKey)}
    </Link>
  )
}

export default function Nav() {
  const { t } = useI18n()

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-slate-200">
      <div className="mx-auto max-w-6xl h-14 px-4 flex items-center justify-between">
        {/* Brand */}
        <Link
          href="/"
          className="font-extrabold text-blue-700 tracking-tight hover:opacity-90"
        >
          {t('nav.home')}
        </Link>

        {/* Navigation and Language Switcher */}
        <div className="flex items-center gap-2">
          {/* Pill menu */}
          <nav className="flex items-center gap-1 p-1 rounded-full bg-white shadow-sm ring-1 ring-slate-200">
            {links.map((l) => (
              <NavLink key={l.href} {...l} />
            ))}
          </nav>
          
          {/* Language Switcher */}
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  )
}
