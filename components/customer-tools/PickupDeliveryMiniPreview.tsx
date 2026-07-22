export function PickupDeliveryMiniPreview() {
  return (
    <div
      aria-hidden="true"
      className="customer-tools-preview pointer-events-none relative h-[clamp(200px,18vw,240px)] select-none overflow-hidden"
    >
      <div className="space-y-2 p-3 sm:p-3.5">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-[var(--dealer-accent)]">
            Enter your address
          </p>
          <div className="mt-1.5 rounded-md border border-white/12 bg-black/20 px-2.5 py-1.5 text-[11px] leading-snug text-white/42">
            Street address, city, or ZIP code
          </div>
        </div>

        <div className="rounded-lg border border-[rgb(var(--dealer-accent-rgb)/0.28)] bg-[linear-gradient(180deg,rgb(var(--dealer-accent-rgb)/0.1)_0%,rgba(0,0,0,0.18)_100%)] px-3 py-2">
          <div className="flex items-center justify-between gap-2">
            <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-white/70">
              Estimated Trip
            </p>
            <span className="rounded-full bg-[rgb(var(--dealer-accent-rgb)/0.16)] px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-[0.06em] text-[var(--dealer-accent)]">
              Example estimate
            </span>
          </div>
          <p className="mt-1 font-display text-[20px] font-extrabold leading-none text-[var(--dealer-accent)]">
            $125 – $165
          </p>
          <p className="mt-1 text-[10px] font-semibold text-white/55">
            Est. time: 60–90 min
          </p>
        </div>

        <div className="relative h-[58px] overflow-hidden rounded-md border border-white/10 bg-[#0a1510]">
          <MiniRouteMap />
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-2.5 z-[1] flex justify-center gap-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--dealer-accent)]" />
        <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
        <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-7 bg-gradient-to-b from-transparent to-[#09110d]/95"
        aria-hidden
      />
    </div>
  );
}

function MiniRouteMap() {
  return (
    <svg
      className="h-full w-full"
      viewBox="0 0 220 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect width="220" height="72" fill="#0a1510" />
      <path
        d="M0 48 C40 42, 55 58, 90 52 S140 38, 180 44 L220 40"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth="10"
        strokeLinecap="round"
      />
      <path
        d="M0 28 C35 34, 60 18, 95 26 S145 44, 220 30"
        stroke="rgba(255,255,255,0.05)"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <path
        d="M18 54 C48 40, 78 30, 110 34 S155 48, 198 22"
        stroke="var(--dealer-accent)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity="0.85"
      />
      <circle
        cx="18"
        cy="54"
        r="5"
        fill="#60a5fa"
        stroke="rgba(255,255,255,0.7)"
        strokeWidth="2"
      />
      <circle
        cx="198"
        cy="22"
        r="5"
        fill="var(--dealer-accent)"
        stroke="rgba(255,255,255,0.7)"
        strokeWidth="2"
      />
      <circle cx="55" cy="20" r="7" fill="rgba(255,255,255,0.06)" />
      <circle cx="150" cy="58" r="9" fill="rgba(255,255,255,0.04)" />
    </svg>
  );
}
