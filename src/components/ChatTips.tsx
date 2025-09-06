'use client'

import { useEffect, useMemo, useState } from 'react'
import { useI18n } from '@/lib/i18n'

const BASE_TIPS_EN = [
  'Ask for 3 verses on a topic and one action step.',
  'Request a short prayer you can pray right now.',
  'Ask for a 7-day Bible reading plan for your topic.',
  'Summarize in 3 bullet points with verses.',
  'Draft a gentle message to encourage a friend (with a verse).',
  'Give journaling prompts based on today\'s verses.',
  'Compare two verses that seem to disagree.',
  'Memory verse + a simple mnemonic.',
  'One next step I can do in 10 minutes.',
  'Rewrite this for a teen in simpler words.',
  'Mini devotional: verse, reflection, prayer.',
  'Verses + short prayer for gratitude.',
  'Verses for forgiveness & reconciliation.',
  'Verses to fight temptation; add a plan.',
  'How to confess sin biblically (with verses).',
  'Verses for assurance of salvation.',
  'Create a prayer using Psalm 23.',
  'Turn these verses into an "I will…" statement.',
]

const BASE_TIPS_KO = [
  '주제에 대한 3개의 성경 구절과 하나의 행동 단계를 요청하세요.',
  '지금 바로 기도할 수 있는 짧은 기도를 요청하세요.',
  '주제에 대한 7일 성경 읽기 계획을 요청하세요.',
  '성경 구절과 함께 3개의 요점으로 요약하세요.',
  '친구를 격려하는 부드러운 메시지를 작성하세요 (성경 구절과 함께).',
  '오늘의 성경 구절을 바탕으로 한 일기 작성 안내를 주세요.',
  '서로 다른 것처럼 보이는 두 성경 구절을 비교하세요.',
  '암송 구절 + 간단한 기억법.',
  '10분 안에 할 수 있는 다음 단계 하나.',
  '이것을 십대를 위해 더 간단한 말로 다시 써주세요.',
  '미니 묵상: 성경 구절, 묵상, 기도.',
  '감사에 대한 성경 구절 + 짧은 기도.',
  '용서와 화해에 대한 성경 구절.',
  '시험과 싸우기 위한 성경 구절; 계획을 추가하세요.',
  '성경적으로 죄를 고백하는 방법 (성경 구절과 함께).',
  '구원의 확신에 대한 성경 구절.',
  '시편 23편을 사용하여 기도를 만들어보세요.',
  '이 성경 구절들을 "나는...하겠습니다"라는 선언문으로 바꿔보세요.',
]

export default function ChatTips({
  offline = false,
  className = '',
  count = 3,            // how many tips to show at once
  intervalMs = 7000,    // rotate speed
  onPick,               // optional: click to fill input
}: {
  offline?: boolean
  className?: string
  count?: number
  intervalMs?: number
  onPick?: (tip: string) => void
}) {
  const { t, locale } = useI18n()
  
  const tips = useMemo(() => {
    const baseTips = locale === 'ko' ? BASE_TIPS_KO : BASE_TIPS_EN
    
    return offline
      ? [
          locale === 'ko' 
            ? 'LLM_OFFLINE=on — API 키 없이 테스트. 끄고 API 키를 설정하여 실시간 모델을 사용하세요.'
            : 'LLM_OFFLINE=on — test without an API key. Turn it off and set an API key to use a live model.',
          ...baseTips,
        ]
      : baseTips
  }, [offline, locale])

  // start at a deterministic position to avoid hydration mismatch
  const [i, setI] = useState(0)
  
  // Set random starting position after hydration
  useEffect(() => {
    setI(Math.floor(Math.random() * tips.length))
  }, [tips.length])
  
  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % tips.length), intervalMs)
    return () => clearInterval(id)
  }, [intervalMs, tips.length])

  const window = Array.from({ length: Math.min(count, tips.length) }, (_, k) => tips[(i + k) % tips.length])

  return (
    <div className={`mt-3 text-sm ${className}`}>
      <div className="uppercase tracking-wide opacity-80 mb-1">{t('chat.tips')}</div>

      <ul className="space-y-1">
        {window.map((tip, idx) => (
          <li key={idx}>
            <button
              type="button"
              onClick={onPick ? () => onPick(tip) : undefined}
              className={`text-left underline underline-offset-4 hover:opacity-90 ${
                onPick ? '' : 'cursor-default'
              }`}
            >
              {tip}
            </button>
          </li>
        ))}
      </ul>

      {/* Controls */}
      <div className="mt-2 flex gap-2 opacity-80">
        <button
          type="button"
          onClick={() => setI((n) => (n - 1 + tips.length) % tips.length)}
          className="rounded px-2 py-0.5 border border-white/30 hover:bg-white/10"
          aria-label={t('chat.previousTip')}
        >
          ◀
        </button>
        <button
          type="button"
          onClick={() => setI((n) => (n + 1) % tips.length)}
          className="rounded px-2 py-0.5 border border-white/30 hover:bg-white/10"
          aria-label={t('chat.nextTip')}
        >
          ▶
        </button>
      </div>
    </div>
  )
}
