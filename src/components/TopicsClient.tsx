'use client'

import Link from 'next/link'
import { useI18n } from '@/lib/i18n'
import { Card } from '@/lib/content'
import BackHome from '@/components/BackHome'

interface TopicsClientProps {
  cards: Card[]
}

export default function TopicsClient({ cards }: TopicsClientProps) {
  const { t, locale } = useI18n()
  
  // Filter cards by current language, with fallback to English
  const filteredCards = cards.filter(card => {
    if (locale === 'ko') {
      return card.language === 'ko' || !card.language // Show Korean cards and English cards without language specified
    }
    return card.language === 'en' || !card.language // Show English cards and cards without language specified
  })
  
  return (
    <div className="space-y-6">
      <BackHome
        linkClass="text-white/90 hover:text-white"
        sepClass="text-white/50"
      />

      <h1 className="text-2xl font-bold">{t('topics.title')}</h1>
      <p className="text-white/90 text-lg leading-relaxed">
        {locale === 'ko' 
          ? '다양한 삶의 도전과 상황에 대한 성경 말씀과 도움과 기도 지원을 찾아보세요'
          : t('topics.description')
        }
      </p>
      
      {/* Language indicator */}
      <div className="text-sm text-white/80 font-medium">
        {locale === 'ko' ? '한국어 콘텐츠' : 'English Content'}
      </div>
      
      {/* Content count */}
      <div className="text-sm text-white/80 font-medium">
        {filteredCards.length > 0 
          ? locale === 'ko' 
            ? `${filteredCards.length}개의 주제가 준비되어 있습니다` 
            : `${filteredCards.length} topics available`
          : locale === 'ko' 
            ? '준비된 주제가 없습니다' 
            : 'No topics available'
        }
      </div>
      
      {filteredCards.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-4">
          {filteredCards.map(c => (
            <Link key={c.id} href={`/topics/${c.slug}`} 
              className="block rounded-xl border border-white/30 bg-white/5 px-5 py-4
                       hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30
                       select-none selection:bg-transparent selection:text-inherit"
            >
              <div className="font-semibold">{c.title}</div>
              {c.language && (
                <div className="text-xs text-white/70 mt-1 font-medium">
                  {c.language === 'ko' ? '한국어' : 'English'}
                </div>
              )}
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center text-white/80 py-8 font-medium">
          {locale === 'ko' ? '준비된 주제가 없습니다' : t('topics.noResults')}
        </div>
      )}

      {/* Korean encouragement message */}
      {locale === 'ko' && filteredCards.length === 0 && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-blue-800 text-center">
            한국어 콘텐츠가 곧 준비될 예정입니다. 잠시만 기다려 주세요!
          </p>
        </div>
      )}
    </div>
  )
}
