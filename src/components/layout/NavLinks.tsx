'use client'

import { useEffect, useState } from "react"

import { NAV_ITEMS } from "@/lib/constants"
import type { Dictionary } from "@/i18n/dictionaries"

type Props = {
  dict: Dictionary
  mobile?: boolean
}

export function NavLinks({ dict, mobile = false }: Props) {
  const [activeAnchor, setActiveAnchor] = useState<string | null>(null)

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    NAV_ITEMS.forEach(({ anchor }) => {
      const el = document.getElementById(anchor)
      if (!el) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveAnchor(anchor)
        },
        { rootMargin: "-40% 0px -55% 0px" }
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  if (mobile) {
    return (
      <ul className="mx-auto flex max-w-5xl items-center justify-around px-4 py-2">
        {NAV_ITEMS.map((item) => {
          const isActive = activeAnchor === item.anchor
          return (
            <li key={item.anchor}>
              <a
                href={`#${item.anchor}`}
                aria-current={isActive ? "true" : undefined}
                className={`inline-flex flex-col items-center gap-1 transition-colors ${
                  isActive ? "text-accent" : "text-text-muted hover:text-accent"
                }`}
              >
                <span 
                  className={`flex h-6 w-6 items-center justify-center border-2 font-[family-name:var(--font-pixel)] text-[0.4rem] transition-all ${
                    isActive 
                      ? "border-accent bg-accent text-white" 
                      : "border-border bg-transparent text-text-muted"
                  }`}
                  style={{ boxShadow: isActive ? "2px 2px 0 var(--color-pixel-shadow)" : "none" }}
                >
                  {item.number}
                </span>
                <span className="font-[family-name:var(--font-pixel)] text-[0.35rem] uppercase">
                  {dict.nav[item.anchor]}
                </span>
              </a>
            </li>
          )
        })}
      </ul>
    )
  }

  return (
    <ul className="flex items-center gap-4">
      {NAV_ITEMS.map((item) => {
        const isActive = activeAnchor === item.anchor
        return (
          <li key={item.anchor} className="relative">
            <a
              href={`#${item.anchor}`}
              aria-current={isActive ? "true" : undefined}
              className={`group inline-flex items-center gap-2 transition-all ${
                isActive ? "text-accent" : "text-text-muted hover:text-accent"
              }`}
            >
              <span 
                className={`flex h-6 w-6 items-center justify-center border-2 font-[family-name:var(--font-pixel)] text-[0.4rem] transition-all ${
                  isActive 
                    ? "border-accent bg-accent text-white" 
                    : "border-border bg-transparent group-hover:border-accent"
                }`}
                style={{ boxShadow: "2px 2px 0 var(--color-pixel-shadow)" }}
              >
                {item.number}
              </span>
              <span className="font-[family-name:var(--font-pixel)] text-[0.45rem] uppercase">
                {dict.nav[item.anchor]}
              </span>
            </a>
          </li>
        )
      })}
    </ul>
  )
}
