const THUMB_IMAGES = [
  { src: "/images/service-repairs.jpg", alt: "" },
  { src: "/images/equipment-sales.jpg", alt: "" },
  { src: "/images/parts-accessories.jpg", alt: "" },
] as const;

export function ServiceRequestMiniPreview() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none relative h-[210px] select-none overflow-hidden rounded-[11px] border border-[rgba(13,60,36,0.11)] bg-white shadow-[0_10px_25px_rgba(20,53,35,0.09),0_2px_6px_rgba(20,53,35,0.05)] sm:h-[220px] lg:h-[250px]"
    >
      <div className="space-y-3 p-3.5 sm:p-4">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#3d5a48]">
            Describe the issue
          </p>
          <p className="mt-0.5 text-[9px] leading-snug text-[#6b7f72]">
            What seems to be the problem?
          </p>
          <div className="mt-1.5 rounded-md border border-[rgba(13,60,36,0.12)] bg-[#f7faf8] px-2.5 py-2 text-[11px] leading-snug text-[#6b7f72]">
            Example: Engine won&apos;t start
          </div>
        </div>

        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#3d5a48]">
            Upload photos{" "}
            <span className="font-semibold normal-case tracking-normal text-[#6b7f72]">
              (optional)
            </span>
          </p>
          <p className="mt-0.5 text-[9px] text-[#6b7f72]">Add up to 5 photos</p>
          <div className="mt-1.5 flex gap-1.5">
            {THUMB_IMAGES.map((img) => (
              <div
                key={img.src}
                className="h-11 w-11 overflow-hidden rounded-md border border-[rgba(13,60,36,0.1)] bg-[#eef5f0] sm:h-12 sm:w-12"
              >
                {/* Decorative only — not interactive */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.src}
                  alt=""
                  className="h-full w-full object-cover"
                  draggable={false}
                />
              </div>
            ))}
            <div className="flex h-11 w-11 items-center justify-center rounded-md border border-dashed border-[rgba(16,130,71,0.35)] bg-[rgba(16,185,129,0.04)] text-sm font-bold text-[#08763f] sm:h-12 sm:w-12">
              +
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-3 z-[1] flex justify-center gap-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-[#159451]" />
        <span className="h-1.5 w-1.5 rounded-full bg-[#c5d4cb]" />
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
