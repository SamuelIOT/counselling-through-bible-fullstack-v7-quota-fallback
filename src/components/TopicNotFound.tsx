'use client'

import Link from 'next/link'
import { useI18n } from '@/lib/i18n'

export default function TopicNotFound() {
  const { locale } = useI18n()

  if (locale === 'ko') {
    return (
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="text-2xl font-bold mb-4">주제를 찾을 수 없습니다</h1>
        <p className="text-white/80 mb-6">요청하신 주제를 찾을 수 없습니다.</p>
        <Link href="/topics" className="px-4 py-2 rounded-xl border bg-white text-blue-700">
          모든 주제 보기
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl text-center">
      <h1 className="text-2xl font-bold mb-4">Topic Not Found</h1>
      <p className="text-white/80 mb-6">The requested topic could not be found.</p>
      <Link href="/topics" className="px-4 py-2 rounded-xl border bg-white text-blue-700">
        Browse All Topics
      </Link>
    </div>
  )
}
