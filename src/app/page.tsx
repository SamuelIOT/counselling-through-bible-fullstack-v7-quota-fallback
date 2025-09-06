import Link from 'next/link'
import { loadAllCards } from '@/lib/content'
import { Card } from '@/lib/content'
import HomeClient from '@/components/HomeClient'

export const revalidate = 60 * 60 * 24 // rotate verse daily

// Server component for the Home page
export default function Home() {
  const allCards = loadAllCards()
  
  // Pass all cards to client component - let it handle language filtering
  return <HomeClient cards={allCards} />
}

// Helper to pick a verse of the day
function pickVerseOfDay(cards: Card[]) {
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
