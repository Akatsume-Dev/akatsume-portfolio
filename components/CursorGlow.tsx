'use client'

import { useEffect, useRef } from 'react'

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const glow = glowRef.current
    if (!glow) return

    let raf: number
    let x = 0, y = 0
    let cx = 0, cy = 0

    const onMove = (e: MouseEvent) => {
      x = e.clientX
      y = e.clientY
    }

    const animate = () => {
      cx += (x - cx) * 0.08
      cy += (y - cy) * 0.08
      glow.style.left = cx + 'px'
      glow.style.top = cy + 'px'
      raf = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMove)
    raf = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div
      ref={glowRef}
      className="cursor-glow hidden lg:block"
      style={{ position: 'fixed', pointerEvents: 'none', zIndex: 9999 }}
    />
  )
}
