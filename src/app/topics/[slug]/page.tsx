import { loadAllCards } from '@/lib/content'
import BackHome from '@/components/BackHome'
import TopicClient from '@/components/TopicClient'
import TopicNotFound from '@/components/TopicNotFound'

export const dynamic = 'force-static'

export default function TopicPage({ params }: { params: { slug: string } }) {
  const card = loadAllCards().find(c => c.slug === params.slug)
  if (!card) {
    return (
      <div className="w-full -mx-4 px-4 py-10 bg-blue-700 text-white">
        <BackHome linkClass="text-white/90 hover:text-white" sepClass="text-white/60" />
        <TopicNotFound />
      </div>
    )
  }

  return (
    <div className="w-full -mx-4 px-4 py-10 bg-blue-700 text-white">
      <BackHome linkClass="text-white/90 hover:text-white" sepClass="text-white/60" />
      <TopicClient card={card} />
    </div>
  )
}
