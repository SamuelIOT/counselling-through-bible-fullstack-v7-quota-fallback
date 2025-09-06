'use client'

import { useI18n } from '@/lib/i18n'
import { Card } from '@/lib/content'

interface TopicClientProps {
  card: Card
}

export default function TopicClient({ card }: TopicClientProps) {
  const { locale } = useI18n()

  const scriptureLabel = locale === 'ko' ? '성경 말씀' : 'Scripture'
  const assistantLabel = locale === 'ko' ? '도우미' : 'Assistant'
  const prayerLabel = locale === 'ko' ? '기도' : 'Prayer'

  return (
    <article className="mx-auto max-w-4xl space-y-6">
      <h1 className="text-3xl font-bold">{card.title}</h1>

      {/* Scripture */}
      {card.verses?.length ? (
        <div className="rounded-2xl border border-white/20 bg-white/5 p-5 leading-relaxed">
          <div className="text-sm uppercase tracking-wide opacity-80 mb-2">{scriptureLabel}</div>
          <div className="text-[17px] leading-8 space-y-3">
            {card.verses.map((v, i) => (
              <p key={i} className="break-words">{v}</p>
            ))}
          </div>
        </div>
      ) : null}

      {/* Guidance / body */}
      {card.body ? (
        <div className="rounded-2xl border border-white/20 bg-white/5 p-5 leading-relaxed">
          <div className="text-sm uppercase tracking-wide opacity-80 mb-2">{assistantLabel}</div>
          {card.body}
        </div>
      ) : null}

      {/* Prayer */}
      {card.prayer ? (
        <div className="rounded-2xl border border-white/20 bg-white/5 p-5 leading-relaxed">
          <div className="text-sm uppercase tracking-wide opacity-80 mb-2">{prayerLabel}</div>
          <p className="leading-relaxed whitespace-pre-line">{card.prayer}</p>
        </div>
      ) : null}
    </article>
  )
}
