import type { Metadata } from 'next'
import { Inter, Playfair_Display, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import SmoothScroll from '@/components/SmoothScroll'

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
  title: 'Akatsume , Roblox Scripter, Builder & Modeler',
  description: 'Roblox scripting, building and 3D modeling. 3 years building game systems, UI, and multiplayer mechanics, plus 2 years of Blender: maps, scenes, weapons, armor and accessories. Hire a professional Roblox developer today.',
  keywords: ['Roblox scripter', 'Roblox developer', 'Roblox scripting', 'Lua programmer', 'hire Roblox dev', 'Roblox game development', 'Roblox builder', 'Blender 3D modeling', 'Roblox 3D models', 'Roblox 3D modeler', 'Roblox weapon models', 'Roblox UGC accessories'],
  authors: [{ name: 'Akatsume' }],
  openGraph: {
    title: 'Akatsume , Roblox Scripter, Builder & Modeler',
    description: 'Roblox scripting, building and 3D modeling. Turning ideas into elite Roblox experiences.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Akatsume , Roblox Scripter, Builder & Modeler',
    description: 'Roblox scripting, building and 3D modeling. 3 years of crafting elite game experiences.',
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
        <SmoothScroll />
        {children}
      </body>
    </html>
  )
}
