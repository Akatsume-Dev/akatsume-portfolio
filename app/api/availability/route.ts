import { NextResponse } from 'next/server'

// Fallback default when KV is not set up
const DEFAULT: Availability = {
  status: 'available',
  note: 'Open to new projects',
  days: { mon: true, tue: true, wed: true, thu: true, fri: true, sat: false, sun: false },
}

export type Availability = {
  status: 'available' | 'busy' | 'limited'
  note: string
  days: Record<string, boolean>
}

async function getKV() {
  try {
    const { kv } = await import('@vercel/kv')
    return kv
  } catch {
    return null
  }
}

export async function GET() {
  try {
    const kv = await getKV()
    if (!kv) return NextResponse.json(DEFAULT)
    const data = await kv.get<Availability>('availability')
    return NextResponse.json(data ?? DEFAULT)
  } catch {
    return NextResponse.json(DEFAULT)
  }
}

export async function POST(req: Request) {
  const password = req.headers.get('x-admin-password')
  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const body = await req.json()
    const kv = await getKV()
    if (!kv) return NextResponse.json({ error: 'KV not configured' }, { status: 500 })
    await kv.set('availability', body)
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
