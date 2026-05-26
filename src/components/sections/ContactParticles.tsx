"use client";

/**
 * ContactParticles — thin Client Component wrapper for the contact section.
 *
 * Keeps Contact.tsx as a Server Component while isolating the particle
 * side-effect to a minimal client island. Import this in Contact.tsx.
 */

import { ParticleEmitter } from "@/components/ui/ParticleEmitter";

export function ContactParticles() {
  return <ParticleEmitter containerId="contact-particles" count={15} />;
}
