'use client'

import { I18nProvider } from '@/lib/i18n'

interface I18nWrapperProps {
  children: React.ReactNode
}

export default function I18nWrapper({ children }: I18nWrapperProps) {
  return (
    <I18nProvider>
      {children}
    </I18nProvider>
  )
}
