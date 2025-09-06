'use client'

import Link from 'next/link'
import { useI18n } from '@/lib/i18n'
import { Card } from '@/lib/content'

interface HomeClientProps {
  cards: Card[]
}

export default function HomeClient({ cards }: HomeClientProps) {
  const { t, locale } = useI18n()
  
  // Filter cards by current language, with fallback to English
  const filteredCards = cards.filter(card => {
    if (locale === 'ko') {
      return card.language === 'ko' || !card.language // Show Korean cards and English cards without language specified
    }
    return card.language === 'en' || !card.language // Show English cards and cards without language specified
  })

  // Prefer Anxiety; fallback to first topic
  const start =
    filteredCards.find(
      (c) =>
        c.id?.toLowerCase() === 'anxiety' ||
        c.title?.toLowerCase() === 'anxiety' ||
        c.slug?.toLowerCase().includes('anxiety')
    ) ?? filteredCards[0]

  const vod = pickVerseOfDay(filteredCards)

  return (
    <div className="w-full -mx-4 px-4 py-16 bg-blue-700 text-white">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold">{t('home.title')}</h1>

        {/* Disclaimer card */}
        <div className="mx-auto mt-6 max-w-3xl rounded-2xl bg-blue-600 text-white p-5 text-left shadow-lg border border-white/20">
          <p className="leading-relaxed">
            {t('home.welcome')}
          </p>
        </div>

        {/* CTAs */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          {start && (
            <Link
              href={`/topics/${start.slug}`}
              className="px-5 py-2 rounded-xl border bg-white text-blue-700"
            >
              {t('home.getStarted')}
            </Link>
          )}
          <Link href="/topics" className="px-5 py-2 rounded-xl border">
            {t('home.browseTopics')}
          </Link>
          <Link href="/chat" className="px-5 py-2 rounded-xl border">
            {t('home.tryAssistant')}
          </Link>
          <Link href="/about" className="px-5 py-2 rounded-xl border">
            {t('home.learnMore')}
          </Link>
        </div>

        {/* Verse of the Day */}
        {vod && (
          <div className="mx-auto mt-10 max-w-3xl text-left rounded-2xl p-5 border border-white/20 bg-white/5">
            <div className="text-xs uppercase tracking-wide opacity-80">{t('home.verseOfDay')}</div>
            <p className="mt-2 leading-relaxed">{vod.text}</p>
            <div className="mt-3">
              <Link href={`/topics/${vod.slug}`} className="underline underline-offset-4">
                {t('home.explore')}: {vod.title}
              </Link>
            </div>
          </div>
        )}

        {/* Language indicator */}
        <div className="mt-6 text-sm text-white/60">
          {locale === 'ko' ? '한국어로 서비스되고 있습니다' : 'Serving in English'}
        </div>

        {/* Content count indicator */}
        <div className="mt-4 text-xs text-white/40">
          {filteredCards.length > 0 
            ? locale === 'ko' 
              ? `${filteredCards.length}개의 주제가 준비되어 있습니다` 
              : `${filteredCards.length} topics available`
            : locale === 'ko' 
              ? '준비된 주제가 없습니다' 
              : 'No topics available'
          }
        </div>

        {/* Korean welcome message */}
        {locale === 'ko' && (
          <div className="mt-6 p-4 bg-blue-600 rounded-lg">
            <p className="text-lg font-medium">한국어 성경 중심 상담에 오신 것을 환영합니다!</p>
            <p className="text-sm mt-2 opacity-90">
              성경 말씀을 통해 여러분의 삶의 도전과 상황에 대한 권면과 안내를 받으실 수 있습니다.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

// Helper to pick a verse of the day
function pickVerseOfDay(cards: Card[]) {
  if (!cards || cards.length === 0) return null
  
  const list: { text: string; slug: string; title: string }[] = []
  for (const c of cards) {
    if (c.verses && c.verses.length > 0) {
      for (const v of c.verses) {
        list.push({ text: v, slug: c.slug, title: c.title })
      }
    }
  }
  
  if (list.length === 0) return null
  
  const today = new Date().toISOString().slice(0, 10)
  const idx = hash(today) % list.length
  return list[idx]
}

function hash(s: string) { let h = 0; for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0; return h }
