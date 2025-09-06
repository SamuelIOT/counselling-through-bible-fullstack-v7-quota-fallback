import AboutClient from '@/components/AboutClient'

export const dynamic = 'force-static'

export const metadata = {
  title: 'About — Biblical Counselling',
  description:
    'What this site is for, how it works, and ways to seek care in person.',
}

export default function AboutPage() {
  return <AboutClient />
}
