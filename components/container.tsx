import { clsx } from "clsx";
import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "main";
};

export function Container({ children, className, as: Component = "div" }: ContainerProps) {
  return (
    <Component className={clsx("mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10", className)}>
      {children}
    </Component>
  );
}
