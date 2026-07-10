'use client'

import { motion } from 'framer-motion'
import { CSSProperties } from 'react'

export default function TiltCard({ children, className, style }: {
  children: React.ReactNode
  className?: string
  style?: CSSProperties
}) {
  return (
    <motion.div
      className={className}
      style={style}
      whileHover={{ rotateX: 4, rotateY: -4, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.div>
  )
}
