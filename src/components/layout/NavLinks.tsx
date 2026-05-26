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
                className={`inline-flex flex-col items-center gap-0.5 font-mono text-xs transition-colors ${
                  isActive ? "text-accent-2" : "text-surface/70 hover:text-surface"
                }`}
              >
                <span className={`font-mono text-[0.65rem] ${isActive ? "text-accent-2" : "text-surface/40"}`}>
                  {item.number}
                </span>
                <span>{dict.nav[item.anchor]}</span>
                <span
                  className={`mt-0.5 h-1 w-1 rounded-full bg-accent-2 transition-opacity ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                  aria-hidden="true"
                />
              </a>
            </li>
          )
        })}
      </ul>
    )
  }

  return (
    <ul className="flex items-center gap-5">
      {NAV_ITEMS.map((item) => {
        const isActive = activeAnchor === item.anchor
        return (
          <li key={item.anchor}>
            <a
              href={`#${item.anchor}`}
              aria-current={isActive ? "true" : undefined}
              className={`inline-flex items-center gap-1.5 font-mono text-xs transition-all ${
                isActive
                  ? "text-accent-2 font-bold border-b-2 border-dotted border-accent-2 pb-1"
                  : "text-surface/70 hover:text-surface hover:translate-x-0.5 hover:translate-y-0.5"
              }`}
            >
              <span className={`font-mono text-[0.65rem] ${isActive ? "text-accent-2" : "text-surface/40"}`}>
                {item.number}
              </span>
              <span>{dict.nav[item.anchor]}</span>
            </a>
          </li>
        )
      })}
    </ul>
  )
}
