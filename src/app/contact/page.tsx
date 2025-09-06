import ContactClient from '@/components/ContactClient'

export const dynamic = 'force-static'

export const metadata = {
  title: 'Contact — Biblical Counselling',
  description:
    'Get in touch for biblical counselling, prayer, or to support the work.',
}

export default function ContactPage() {
  return <ContactClient />
}
