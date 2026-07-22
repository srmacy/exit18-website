const THUMB_IMAGES = [
  { src: "/images/service-repairs.jpg", alt: "" },
  { src: "/images/equipment-sales.jpg", alt: "" },
  { src: "/images/parts-accessories.jpg", alt: "" },
] as const;

export function ServiceRequestMiniPreview() {
  return (
    <div
      aria-hidden="true"
      className="customer-tools-preview pointer-events-none relative h-[clamp(200px,18vw,240px)] select-none overflow-hidden"
    >
      <div className="space-y-2.5 p-3 sm:p-3.5">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-[var(--dealer-accent)]">
            Describe the issue
          </p>
          <p className="mt-0.5 text-[9px] leading-snug text-white/45">
            What seems to be the problem?
          </p>
          <div className="mt-1.5 rounded-md border border-white/12 bg-black/20 px-2.5 py-1.5 text-[11px] leading-snug text-white/42">
            Example: Engine won&apos;t start
          </div>
        </div>

        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-[var(--dealer-accent)]">
            Upload photos{" "}
            <span className="font-semibold normal-case tracking-normal text-white/45">
              (optional)
            </span>
          </p>
          <p className="mt-0.5 text-[9px] text-white/45">Add up to 5 photos</p>
          <div className="mt-1.5 flex gap-1.5">
            {THUMB_IMAGES.map((img) => (
              <div
                key={img.src}
                className="h-10 w-10 overflow-hidden rounded-md border border-white/12 bg-black/25 sm:h-11 sm:w-11"
              >
                {/* Decorative only — not interactive */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.src}
                  alt=""
                  className="h-full w-full object-cover opacity-90"
                  draggable={false}
                />
              </div>
            ))}
            <div className="flex h-10 w-10 items-center justify-center rounded-md border border-dashed border-[rgb(var(--dealer-accent-rgb)/0.45)] bg-[rgb(var(--dealer-accent-rgb)/0.08)] text-sm font-bold text-[var(--dealer-accent)] sm:h-11 sm:w-11">
              +
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-2.5 z-[1] flex justify-center gap-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--dealer-accent)]" />
        <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
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
