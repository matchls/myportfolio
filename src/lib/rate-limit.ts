/**
 * Rate limit en mémoire, simple et sans dépendance.
 *
 * Principe : une Map<ip, timestamps[]>. Chaque appel ajoute `now`, retire les
 * entrées plus vieilles que `windowMs`, et vérifie si la longueur dépasse `max`.
 *
 * Limites (assumées) :
 *  - **Reset au redéploiement** : chaque cold-start Vercel repart de zéro.
 *    Pour un portfolio c'est OK, un bot ne peut pas spammer 3 req/min même après
 *    un redeploy (le redeploy ne se fait que sur push Git, pas à la volée).
 *  - **Pas partagé entre instances** : si Vercel scale à 2 instances en parallèle,
 *    chaque instance a son compteur. Pour un portfolio trafic faible : négligeable.
 *  - **Fuite mémoire théorique** : la Map grandit jusqu'au redeploy. On nettoie
 *    les entrées expirées à chaque appel pour limiter.
 *
 * Si un jour besoin de plus sérieux : Upstash Redis + @upstash/ratelimit.
 */

type Store = Map<string, number[]>;

const store: Store = new Map();

type Options = {
  /** Nombre maximum de requêtes autorisées dans la fenêtre. */
  max: number;
  /** Largeur de la fenêtre glissante, en millisecondes. */
  windowMs: number;
};

export type RateLimitResult = {
  /** `true` si l'IP est sous le quota (requête autorisée). */
  ok: boolean;
  /** Requêtes restantes dans la fenêtre courante. */
  remaining: number;
  /** Timestamp Unix (ms) où la plus vieille requête expire. */
  resetAt: number;
};

/**
 * Vérifie et comptabilise une requête pour une clé donnée (typiquement une IP).
 * À appeler UNE fois par requête entrante.
 */
export function rateLimit(key: string, options: Options): RateLimitResult {
  const now = Date.now();
  const windowStart = now - options.windowMs;

  // Nettoie les entrées trop vieilles pour cette clé.
  const existing = store.get(key) ?? [];
  const fresh = existing.filter((ts) => ts > windowStart);

  if (fresh.length >= options.max) {
    // Quota atteint : on ne pousse pas le nouveau timestamp, inutile.
    return {
      ok: false,
      remaining: 0,
      resetAt: fresh[0] + options.windowMs,
    };
  }

  fresh.push(now);
  store.set(key, fresh);

  return {
    ok: true,
    remaining: options.max - fresh.length,
    resetAt: now + options.windowMs,
  };
}
