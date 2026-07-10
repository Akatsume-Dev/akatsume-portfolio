import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const { name, role, text, rating } = await req.json()

    if (!name || !role || !text || !rating) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    await resend.emails.send({
      from: 'Portfolio Reviews <onboarding@resend.dev>',
      to: 'charlodessenneville@gmail.com',
      subject: `New review from ${name} - ${rating}/5 stars`,
      html: `
        <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto; background: #0a0a0a; color: #fff; padding: 32px; border-radius: 8px;">
          <h2 style="color: #C9A84C; margin: 0 0 20px;">New Review Submission</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #888; font-size: 13px; width: 80px;">Name</td><td style="color: #fff; font-weight: 600;">${name}</td></tr>
            <tr><td style="padding: 8px 0; color: #888; font-size: 13px;">Role</td><td style="color: #fff;">${role}</td></tr>
            <tr><td style="padding: 8px 0; color: #888; font-size: 13px;">Rating</td><td style="color: #C9A84C; font-weight: 700;">${'★'.repeat(rating)}${'☆'.repeat(5 - rating)} (${rating}/5)</td></tr>
          </table>
          <div style="margin-top: 20px; background: #141414; border-radius: 6px; padding: 16px; border-left: 3px solid #C9A84C;">
            <p style="color: #e0e0e0; font-size: 15px; line-height: 1.7; margin: 0;">${text}</p>
          </div>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 })
  }
}
