import type { ReactNode } from "react";

export function StoreSectionHeading({ children }: { children: ReactNode }) {
  return (
    <div className="mb-7 flex items-center gap-4 md:mb-10 md:gap-5">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-black/[0.14] to-black/[0.08]" aria-hidden />
      <h2 className="shrink-0 text-center font-display text-[clamp(1.3rem,2.6vw,1.75rem)] font-black uppercase tracking-[0.08em] text-exit-dark md:tracking-[0.12em]">
        {children}
      </h2>
      <div className="h-px flex-1 bg-gradient-to-l from-transparent via-black/[0.14] to-black/[0.08]" aria-hidden />
    </div>
  );
}
