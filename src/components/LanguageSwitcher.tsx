'use client'

import { useI18n } from '@/lib/i18n'
import { Globe } from 'lucide-react'

export default function LanguageSwitcher() {
  const { locale, setLocale } = useI18n()

  const toggleLanguage = () => {
    setLocale(locale === 'en' ? 'ko' : 'en')
  }

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 text-slate-700 hover:text-blue-700 hover:bg-blue-50"
      title={locale === 'en' ? '한국어로 변경' : 'Switch to English'}
    >
      <Globe className="w-4 h-4" />
      <span className="hidden sm:inline">
        {locale === 'en' ? '한국어' : 'English'}
      </span>
      <span className="sm:hidden">
        {locale === 'en' ? 'KO' : 'EN'}
      </span>
    </button>
  )
}
