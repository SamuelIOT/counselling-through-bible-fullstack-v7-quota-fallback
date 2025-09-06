import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type Locale = 'en' | 'ko'

interface I18nContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string, fallback?: string) => string
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider')
  }
  return context
}

interface I18nProviderProps {
  children: ReactNode
  initialLocale?: Locale
}

export function I18nProvider({ children, initialLocale = 'ko' }: I18nProviderProps) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale)

  useEffect(() => {
    // Force Korean as default - clear any cached English preference
    setLocaleState('ko')
    localStorage.setItem('locale', 'ko')
    
    // Only check saved preference if it's Korean
    const savedLocale = localStorage.getItem('locale') as Locale
    if (savedLocale === 'ko') {
      setLocaleState('ko')
    } else {
      // Force Korean for any other cached language
      setLocaleState('ko')
      localStorage.setItem('locale', 'ko')
    }
  }, [])

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale)
    localStorage.setItem('locale', newLocale)
  }

  const t = (key: string, fallback?: string): string => {
    try {
      const messages = locale === 'ko' ? require('../messages/ko.json') : require('../messages/en.json')
      return messages[key] || fallback || key
    } catch {
      return fallback || key
    }
  }

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  )
}

// Translation function for server-side usage
export function getTranslation(locale: Locale, key: string, fallback?: string): string {
  try {
    const messages = locale === 'ko' ? require('../messages/ko.json') : require('../messages/en.json')
    return messages[key] || fallback || key
  } catch {
    return fallback || key
  }
}
