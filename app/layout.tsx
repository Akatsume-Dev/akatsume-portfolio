import type { Metadata } from 'next'
import { Inter, Playfair_Display, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Akatsume — Elite Roblox Scripter',
  description: 'Premium Roblox scripting services. 3 years of experience building elite game systems, UI, multiplayer mechanics, and more. Hire a professional Roblox developer today.',
  keywords: ['Roblox scripter', 'Roblox developer', 'Roblox scripting', 'Lua programmer', 'hire Roblox dev', 'Roblox game development'],
  authors: [{ name: 'Akatsume' }],
  openGraph: {
    title: 'Akatsume — Elite Roblox Scripter',
    description: 'Premium Roblox scripting services. Turning ideas into elite Roblox experiences.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Akatsume — Elite Roblox Scripter',
    description: 'Premium Roblox scripting services. 3 years of crafting elite game experiences.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${jetbrains.variable}`}>
      <body className="bg-dark-900 text-white antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}
