export function PickupDeliveryMiniPreview() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none relative h-[210px] select-none overflow-hidden rounded-[11px] border border-[rgba(13,60,36,0.11)] bg-white shadow-[0_10px_25px_rgba(20,53,35,0.09),0_2px_6px_rgba(20,53,35,0.05)] sm:h-[220px] lg:h-[250px]"
    >
      <div className="space-y-2.5 p-3.5 sm:p-4">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#3d5a48]">
            Enter your address
          </p>
          <div className="mt-1.5 rounded-md border border-[rgba(13,60,36,0.12)] bg-[#f7faf8] px-2.5 py-2 text-[11px] leading-snug text-[#6b7f72]">
            Street address, city, or ZIP code
          </div>
        </div>

        <div className="rounded-lg border border-[rgba(16,130,71,0.14)] bg-[linear-gradient(180deg,#f3faf6_0%,#ffffff_100%)] px-3 py-2.5">
          <div className="flex items-center justify-between gap-2">
            <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#3d5a48]">
              Estimated Trip
            </p>
            <span className="rounded-full bg-[rgba(16,185,129,0.12)] px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-[0.06em] text-[#08763f]">
              Example estimate
            </span>
          </div>
          <p className="mt-1 font-display text-[22px] font-extrabold leading-none text-[#159451]">
            $125 – $165
          </p>
          <p className="mt-1 text-[10px] font-semibold text-[#536159]">
            Est. time: 60–90 min
          </p>
        </div>

        <div className="relative h-[72px] overflow-hidden rounded-md border border-[rgba(13,60,36,0.1)] bg-[#e8f1ec]">
          <MiniRouteMap />
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-3 z-[1] flex justify-center gap-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-[#c5d4cb]" />
        <span className="h-1.5 w-1.5 rounded-full bg-[#159451]" />
        <span className="h-1.5 w-1.5 rounded-full bg-[#c5d4cb]" />
        <span className="h-1.5 w-1.5 rounded-full bg-[#c5d4cb]" />
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-b from-transparent to-white/[0.98]"
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
      <rect width="220" height="72" fill="#e8f1ec" />
      <path
        d="M0 48 C40 42, 55 58, 90 52 S140 38, 180 44 L220 40"
        stroke="#c5d4cb"
        strokeWidth="10"
        strokeLinecap="round"
      />
      <path
        d="M0 28 C35 34, 60 18, 95 26 S145 44, 220 30"
        stroke="#d7e4dc"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <path
        d="M18 54 C48 40, 78 30, 110 34 S155 48, 198 22"
        stroke="#3b82f6"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <circle cx="18" cy="54" r="5" fill="#3b82f6" stroke="white" strokeWidth="2" />
      <circle cx="198" cy="22" r="5" fill="#159451" stroke="white" strokeWidth="2" />
      <circle cx="55" cy="20" r="7" fill="rgba(255,255,255,0.55)" />
      <circle cx="150" cy="58" r="9" fill="rgba(255,255,255,0.4)" />
    </svg>
  );
}
