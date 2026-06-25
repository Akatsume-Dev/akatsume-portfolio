import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const { name, email, type, message } = await req.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: 'charlodessenneville@gmail.com',
      replyTo: email,
      subject: `New project request: ${type || 'General'} from ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #fff; padding: 32px; border-radius: 8px;">
          <div style="border-bottom: 1px solid #C9A84C33; padding-bottom: 20px; margin-bottom: 24px;">
            <h1 style="color: #C9A84C; font-size: 22px; margin: 0;">New Client Request</h1>
            <p style="color: #888; font-size: 13px; margin: 6px 0 0;">Via your portfolio contact form</p>
          </div>

          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; color: #888; font-size: 13px; width: 120px;">Name</td>
              <td style="padding: 10px 0; color: #fff; font-size: 14px; font-weight: 600;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #888; font-size: 13px;">Email / Discord</td>
              <td style="padding: 10px 0; color: #C9A84C; font-size: 14px;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #888; font-size: 13px;">Project Type</td>
              <td style="padding: 10px 0; color: #fff; font-size: 14px;">${type || 'Not specified'}</td>
            </tr>
          </table>

          <div style="margin-top: 24px; background: #141414; border-radius: 6px; padding: 20px; border-left: 3px solid #C9A84C;">
            <p style="color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; margin: 0 0 10px;">Message</p>
            <p style="color: #e0e0e0; font-size: 15px; line-height: 1.7; margin: 0;">${message.replace(/\n/g, '<br>')}</p>
          </div>

          <p style="color: #555; font-size: 12px; margin-top: 32px; text-align: center;">
            Sent from akatsume-portfolio.vercel.app
          </p>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}
