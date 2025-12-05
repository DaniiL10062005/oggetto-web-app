'use client'

import { motion, useSpring, useTransform } from 'framer-motion'
import { useEffect } from 'react'

import { cn } from '@/shared/utils/class-names'

interface NumberTickerProps {
  value: number
  className?: string
  duration?: number
}

export function NumberTicker({ value, className, duration = 2 }: NumberTickerProps) {
  const spring = useSpring(0, {
    bounce: 0,
    duration: duration * 1000,
  })

  const display = useTransform(spring, current => Math.round(current))

  useEffect(() => {
    spring.set(value)
  }, [spring, value])

  return (
    <motion.span className={cn('tabular-nums', className)}>
      {display}
    </motion.span>
  )
}
