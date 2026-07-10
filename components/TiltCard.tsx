'use client'

import { useEffect, useRef } from 'react'
import VanillaTilt from 'vanilla-tilt'

export default function TiltCard({ children, className, disabled }: {
  children: React.ReactNode
  className?: string
  disabled?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current || disabled) return
    VanillaTilt.init(ref.current, {
      max: 6,
      speed: 600,
      glare: true,
      'max-glare': 0.08,
      scale: 1.02,
    })
    return () => {
      if (ref.current && (ref.current as any).vanillaTilt) {
        ;(ref.current as any).vanillaTilt.destroy()
      }
    }
  }, [disabled])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
