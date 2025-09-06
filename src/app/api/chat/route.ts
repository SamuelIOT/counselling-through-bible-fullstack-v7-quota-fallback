import { NextRequest } from 'next/server'
import { chatStream, llmEnabled } from '@/lib/llm'
import { hasActiveSubscription, readStripeCustomerIdFromCookie } from '@/lib/subscription'
import { searchCards } from '@/lib/content'

export const runtime = 'nodejs'

function detectLanguage(message: string): 'en' | 'ko' {
  // Simple Korean character detection
  const koreanRegex = /[가-힣]/
  if (koreanRegex.test(message)) return 'ko'
  
  // Check for Korean interface indicators in the message
  const koreanInterfaceTerms = [
    '상담', '성경', '기도', '말씀', '도우미', '주제', '격려', '위로', '치유', '화해', '용서', '믿음', '소망', '사랑'
  ]
  
  for (const term of koreanInterfaceTerms) {
    if (message.toLowerCase().includes(term)) return 'ko'
  }
  
  // Default to Korean since it's now the primary language
  return 'ko'
}

function offlineReply(message: string, verses: string[], language: 'en' | 'ko'): string {
  if (language === 'ko') {
    const refs = verses.length ? `성경 구절: ${verses.join(' | ')}` : '성경 구절: (/content/cards에 더 많은 카드를 추가하세요)'
    return [
      'AI (오프라인 모드)',
      '',
      refs,
      '',
      `사용자 메시지: "${message}"`,
      '',
      '격려: 이것을 주님께 기도로 가져가세요. 위의 성경 구절을 묵상하고 오늘 작은 순종의 한 걸음을 내딛으세요.',
    ].join('\n')
  }
  
  const refs = verses.length ? `Scriptures: ${verses.join(' | ')}` : 'Scriptures: (add more cards in /content/cards)'
  return [
    'AI (offline mode)',
    '',
    refs,
    '',
    `Your message: "${message}"`,
    '',
    'Encouragement: Bring this to the Lord in prayer. Meditate on the verses above and take one small step of obedience today.',
  ].join('\n')
}

export async function POST(req: NextRequest) {
  const { message, language: userLanguage } = await req.json()
  const language = userLanguage || detectLanguage(String(message || ''))
  
  // HARDCODE: Always enable free tier for AI to work online
  const isFree = true // Force free tier to always be enabled
  let ok = isFree
  if (!ok) {
    const cust = readStripeCustomerIdFromCookie()
    try { ok = await hasActiveSubscription(cust) } catch { ok = false }
  }
  if (!ok) {
    const errorMessage = language === 'ko' 
      ? '구독이 필요합니다. /contact를 방문하세요.'
      : 'Subscription required. Visit /contact.'
    return new Response(errorMessage, { status: 402 })
  }
  const cards = searchCards(String(message||'').slice(0, 200), 3)
  const versesOnly = cards.flatMap(c => c.verses || [])

  if (!llmEnabled()) {
    const text = offlineReply(String(message||''), versesOnly, language)
    return new Response(text, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
  }

  const system = language === 'ko' 
    ? `당신은 친근한 기독교 상담 도우미입니다. 항상 성경에 근거한 지도를 제공하되 민감하게 접근하세요.`
    : `You are a friendly Christian counselling assistant. Always ground your guidance in Scripture with sensitivity.`
    
  const ctx = cards.map(c => {
    const versesLabel = language === 'ko' ? '성경 구절' : 'Verses'
    const notesLabel = language === 'ko' ? '메모' : 'Notes'
    return `- ${c.title}\n${versesLabel}: ${(c.verses||[]).join(' ')}\n${notesLabel}: ${c.body}`
  }).join('\n\n')
  const userContent = language === 'ko'
    ? `사용자 메시지: ${message}\n\n맥락 카드 (최고 일치):\n${ctx}`
    : `User message: ${message}\n\nContext cards (top matches):\n${ctx}`
  
  const messages = [
    { role: 'system', content: system },
    { role: 'user', content: userContent },
  ] as const

  try {
    const stream = chatStream(messages as any)
    const encoder = new TextEncoder()
    const readable = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) controller.enqueue(encoder.encode(chunk))
        controller.close()
      }
    })
    return new Response(readable, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
  } catch (e:any) {
    const text = offlineReply(String(message||''), versesOnly, language)
    return new Response(text, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
  }
}
