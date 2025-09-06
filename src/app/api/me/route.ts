import { NextResponse } from 'next/server'
import { hasActiveSubscription, readStripeCustomerIdFromCookie } from '@/lib/subscription'
export async function GET() {
  // HARDCODE: Always enable free tier for AI to work online
  const isFree = true // Force free tier to always be enabled
  if (isFree) return NextResponse.json({ active: true })
  try {
    const cust = readStripeCustomerIdFromCookie()
    const active = await hasActiveSubscription(cust)
    return NextResponse.json({ active })
  } catch {
    return NextResponse.json({ active: false })
  }
}
