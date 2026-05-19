'use client'

import { useEffect, useRef, type ReactNode } from "react"

type Props = {
  children: ReactNode
  delay?: number
  className?: string
}

export function AnimateIn({ children, delay = 0, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced) {
      el.setAttribute("data-visible", "true")
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.setAttribute("data-visible", "true")
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      data-visible="false"
      style={{ transitionDelay: delay ? `${delay}ms` : undefined }}
      className={`animate-in-wrapper ${className}`}
    >
      {children}
    </div>
  )
}
