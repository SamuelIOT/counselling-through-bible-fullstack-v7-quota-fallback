import fs from 'fs'
import path from 'path'

export type Card = {
  id: string
  title: string
  slug: string
  verses?: string[]
  body?: string
  prayer?: string 
  tags?: string[]
  language?: 'en' | 'ko'
}

const contentDir = path.join(process.cwd(), 'content', 'cards')

export function loadAllCards(): Card[] {
  // Check if we're in a browser environment
  if (typeof window !== 'undefined') {
    // Return empty array for client-side - data will be passed as props
    return []
  }

  if (!fs.existsSync(contentDir)) return []
  const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.json'))
  const cards: Card[] = []
  
  for (const f of files) {
    try {
      const raw = fs.readFileSync(path.join(contentDir, f), 'utf8')
      const data = JSON.parse(raw)
      const title: string = data.title || path.basename(f, '.json')
      const slug = (data.slug || title).toLowerCase().replace(/[^a-z0-9]+/g,'-')
      
      // Detect language from filename or content
      let language: 'en' | 'ko' = 'ko'  // Default to Korean
      if (f.includes('_en.') || (!f.includes('_ko.') && !/[가-힣]/.test(title) && !/[가-힣]/.test(data.body || ''))) {
        language = 'en'
      }
      
      cards.push({
        id: data.id || slug,
        title,
        slug,
        verses: data.verses || [],
        body: data.body || (data.content ?? ''),
        prayer: data.prayer || '',    
        tags: data.tags || [],
        language,
      })
    } catch (error) {
      console.warn(`Failed to load card ${f}:`, error)
    }
  }
  
  // Sort cards by language first (Korean first), then by title
  return cards.sort((a, b) => {
    if (a.language === 'ko' && b.language !== 'ko') return -1
    if (a.language !== 'ko' && b.language === 'ko') return 1
    return a.title.localeCompare(b.title)
  })
}

export function loadCardsByLanguage(language: 'en' | 'ko'): Card[] {
  return loadAllCards().filter(card => card.language === language)
}

export function searchCards(query: string, limit=10, language?: 'en' | 'ko'): Card[] {
  const q = query.trim().toLowerCase()
  let allCards = loadAllCards()
  
  // Filter by language if specified
  if (language) {
    allCards = allCards.filter(card => card.language === language)
  }
  
  if (!q) return allCards.slice(0, limit)
  
  const words = q.split(/\s+/).filter(Boolean)
  let scored = allCards.map(card => {
    const hay = (card.title + ' ' + (card.body||'') + ' ' + (card.verses||[]).join(' ') + ' ' + (card.tags||[]).join(' ')).toLowerCase()
    let score = 0
    for (const w of words) { if (hay.includes(w)) score += 1 }
    return { card, score }
  })
  return scored.filter(s => s.score > 0).sort((a,b)=> b.score - a.score).slice(0, limit).map(s => s.card)
}

export function getCardBySlug(slug: string, language?: 'en' | 'ko'): Card | null {
  const cards = loadAllCards()
  let card = cards.find(c => c.slug === slug)
  
  // If language is specified and card doesn't match, try to find language-specific version
  if (language && card && card.language !== language) {
    const langSpecificSlug = language === 'ko' ? `${slug}-ko` : slug.replace('-ko', '')
    card = cards.find(c => c.slug === langSpecificSlug) || card
  }
  
  return card || null
}
