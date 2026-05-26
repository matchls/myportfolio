/**
 * Card — Style Pixel Art avec bordures 8-bit
 */

import type { ElementType, HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

type Props = HTMLAttributes<HTMLElement> & {
  as?: ElementType;
  interactive?: boolean;
  children: ReactNode;
};

export function Card({
  as: Component = "div",
  interactive = false,
  className,
  children,
  ...rest
}: Props) {
  return (
    <Component
      className={cn(
        "pixel-border card-glow bg-bg p-5",
        "transition-all duration-150",
        interactive && "cursor-pointer",
        className,
      )}
      {...rest}
    >
      {children}
    </Component>
  );
}
