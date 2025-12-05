'use client'

import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

import { cn } from '@/shared/utils/class-names'

interface AuroraBackgroundProps {
  children: ReactNode
  className?: string
  showRadialGradient?: boolean
}

export function AuroraBackground({
  children,
  className,
  showRadialGradient = true,
}: AuroraBackgroundProps) {
  return (
    <div
      className={cn(
        'relative flex h-screen w-full flex-col overflow-hidden bg-linear-to-br from-teal-50 via-emerald-50 to-cyan-50',
        className,
      )}
    >
      <div className='absolute inset-0 overflow-hidden'>
        <div
          className={cn(
            'pointer-events-none absolute -inset-[10px] opacity-50 blur-[10px] invert dark:invert-0',
            `[--aurora:repeating-linear-gradient(100deg,var(--teal-500)_10%,var(--emerald-500)_15%,var(--cyan-500)_20%,var(--blue-500)_25%,var(--teal-400)_30%)]`,
            'after:animate-aurora after:absolute after:inset-0 after:bg-[--aurora] after:mix-blend-difference after:content-[""]',
            showRadialGradient &&
              'before:absolute before:inset-0 before:bg-[radial-gradient(ellipse_at_100%_0%,var(--teal-300)_10%,transparent_70%)] before:mix-blend-overlay before:content-[""]',
          )}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
          className='absolute top-0 left-0 size-64 rounded-full bg-linear-to-br from-teal-400/30 to-emerald-500/30 blur-3xl'
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
            delay: 1,
          }}
          className='absolute right-0 bottom-0 size-80 rounded-full bg-linear-to-br from-cyan-400/30 to-blue-500/30 blur-3xl'
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
            delay: 2,
          }}
          className='absolute top-1/2 left-1/2 size-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-linear-to-br from-emerald-400/20 to-teal-500/20 blur-3xl'
        />
      </div>

      <div className='relative z-10'>{children}</div>
    </div>
  )
}
