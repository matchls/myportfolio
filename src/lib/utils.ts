import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Concatène des classes Tailwind en résolvant les conflits.
 *
 * `clsx` gère les conditions : cn("p-4", isActive && "bg-red-500", { hidden: !visible })
 * `twMerge` résout les conflits Tailwind : cn("p-4 p-2") -> "p-2" (garde la dernière)
 *
 * À utiliser partout où une classe dépend d'une condition ou d'une prop.
 *
 * @example
 * <button className={cn("px-4 py-2 rounded-md", variant === "primary" && "bg-accent")} />
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
