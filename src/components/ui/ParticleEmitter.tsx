"use client";

/**
 * ParticleEmitter — injects animated ember particles into a target container.
 *
 * Why DOM manipulation instead of JSX?
 *  The target container (hero-particles, contact-particles) lives in a Server
 *  Component's markup. We can't insert JSX children there from a sibling
 *  Client Component. Direct DOM append is the cleanest escape hatch — the
 *  container acts as a mounting point without coupling the Server Component.
 *
 * Cleanup: the effect returns a function that clears the container, so
 * particles are removed on unmount (e.g. hot reload, strict mode double-fire).
 *
 * Accessibility: particles are aria-hidden at the container level (set in
 * the Server Component markup) — no extra work needed here.
 */

import { useEffect, useRef } from "react";

type Props = {
  /** id of the DOM element to inject particles into */
  containerId: string;
  /** Number of ember particles to spawn */
  count?: number;
};

export function ParticleEmitter({ containerId, count = 12 }: Props) {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const container = document.getElementById(containerId);
    if (!container) return;

    for (let i = 0; i < count; i++) {
      const ember = document.createElement("div");
      ember.className = "ember";
      ember.style.left = `${Math.random() * 100}%`;
      ember.style.bottom = `${Math.random() * 20}%`;
      ember.style.animationName = "floatEmber";
      ember.style.animationDuration = `${3 + Math.random() * 4}s`;
      ember.style.animationDelay = `${Math.random() * 5}s`;
      ember.style.animationTimingFunction = "linear";
      ember.style.animationIterationCount = "infinite";
      container.appendChild(ember);
    }

    return () => {
      container.innerHTML = "";
    };
  }, [containerId, count]);

  // Renders nothing — all work happens via DOM side effects
  return null;
}
