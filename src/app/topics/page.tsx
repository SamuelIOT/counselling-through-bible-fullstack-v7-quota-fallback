import { loadAllCards } from '@/lib/content'
import Link from 'next/link'
import { Card } from '@/lib/content'
import TopicsClient from '@/components/TopicsClient'

export const dynamic = 'force-static'

export default function Topics() {
  const allCards = loadAllCards()
  
  // Pass all cards to client component - let it handle language filtering
  return <TopicsClient cards={allCards} />
}
