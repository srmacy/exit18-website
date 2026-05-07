type Variant =
  | "intoGreen"
  | "outOfGreen"
  | "intoServices"
  | "warmToGreen"
  | "warmToOff"
  /** Warm hero → white; subtle emerald-tinted swoosh (e.g. /equipment hub only) */
  | "warmToEquipmentBrands"
  | "offTowarm"
  | "warmToDark"
  | "darkToGreen"
  /** Service hero green → brands strip (dark) */
  | "greenToDark"
  /** Brands strip (dark) → off-white section */
  | "darkToOff";

type WaveFill =
  | { pathFill: string }
  | {
      pathGradient: {
        stops: readonly { offset: `${number}%` | string; color: string }[];
      };
    };

type VariantConfig = { containerClass: string; pathD: string } & WaveFill;

const fills: Record<Variant, VariantConfig> = {
  /** Dark bar above → green section */
  intoGreen: {
    containerClass: "bg-exit-dark",
    pathD: "M0,0 C360,48 1080,48 1440,0 L1440,48 L0,48 Z",
    pathFill: "#1a5c2a",
  },
  /** Warm/light section → green */
  warmToGreen: {
    containerClass: "bg-exit-warm",
    pathD: "M0,0 C360,48 1080,48 1440,0 L1440,48 L0,48 Z",
    pathFill: "#1a5c2a",
  },
  /** Warm → off-white (#f4f2ee) */
  warmToOff: {
    containerClass: "bg-exit-warm",
    pathD: "M0,0 C360,48 1080,48 1440,0 L1440,48 L0,48 Z",
    pathFill: "#f4f2ee",
  },
  /** Same curve as warmToOff; emerald tint → fade (equipment hub swoosh) */
  warmToEquipmentBrands: {
    containerClass: "border-t border-emerald-900/10 bg-exit-warm",
    pathD: "M0,0 C360,48 1080,48 1440,0 L1440,48 L0,48 Z",
    pathGradient: {
      stops: [
        { offset: "0%", color: "rgb(6 78 60 / 0.20)" },
        { offset: "50%", color: "rgb(6 78 60 / 0.10)" },
        { offset: "100%", color: "rgb(6 78 60 / 0)" },
      ],
    },
  },
  /** Off-white → warm (#faf7f2) */
  offTowarm: {
    containerClass: "bg-exit-off-white",
    pathD: "M0,0 C360,48 1080,48 1440,0 L1440,48 L0,48 Z",
    pathFill: "#faf7f2",
  },
  /** Warm → dark strip (brands) */
  warmToDark: {
    containerClass: "bg-exit-warm",
    pathD: "M0,0 C360,48 1080,48 1440,0 L1440,48 L0,48 Z",
    pathFill: "#0e1a0f",
  },
  /** Green section → warm */
  outOfGreen: {
    containerClass: "bg-exit-warm",
    pathD: "M0,48 C360,0 1080,0 1440,48 L1440,0 L0,0 Z",
    pathFill: "#1a5c2a",
  },
  /** Off-white above → warm-filled wave */
  intoServices: {
    containerClass: "bg-exit-off-white",
    pathD: "M0,0 C360,48 1080,48 1440,0 L1440,48 L0,48 Z",
    pathFill: "#faf7f2",
  },
  /** Dark strip → green CTA band */
  darkToGreen: {
    containerClass: "bg-exit-dark",
    pathD: "M0,0 C360,48 1080,48 1440,0 L1440,48 L0,48 Z",
    pathFill: "#1a5c2a",
  },
  /** Green hero band → dark strip (same geometry as warm → dark) */
  greenToDark: {
    containerClass: "bg-exit-green",
    pathD: "M0,0 C360,48 1080,48 1440,0 L1440,48 L0,48 Z",
    pathFill: "#0e1a0f",
  },
  /** Dark strip → off-white (#f4f2ee; same curve as warm → off) */
  darkToOff: {
    containerClass: "bg-exit-dark",
    pathD: "M0,0 C360,48 1080,48 1440,0 L1440,48 L0,48 Z",
    pathFill: "#f4f2ee",
  },
};

const WARM_TO_EQUIPMENT_BRANDS_GRAD_ID = "wave-warmToEquipmentBrands";

export function WaveDivider({ variant }: { variant: Variant }) {
  const c = fills[variant];

  return (
    <div
      className={`block w-full overflow-hidden leading-none ${c.containerClass}`}
      aria-hidden
    >
      <svg
        viewBox="0 0 1440 48"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="block h-10 w-full md:h-12"
      >
        {"pathGradient" in c ? (
          <>
            <defs>
              <linearGradient
                id={WARM_TO_EQUIPMENT_BRANDS_GRAD_ID}
                x1="0"
                y1="0"
                x2="0"
                y2="48"
                gradientUnits="userSpaceOnUse"
              >
                {c.pathGradient.stops.map((s) => (
                  <stop
                    key={`${s.offset}-${s.color}`}
                    offset={s.offset}
                    stopColor={s.color}
                  />
                ))}
              </linearGradient>
            </defs>
            <path d={c.pathD} fill={`url(#${WARM_TO_EQUIPMENT_BRANDS_GRAD_ID})`} />
          </>
        ) : (
          "pathFill" in c && (
            <path d={c.pathD} fill={c.pathFill} />
          )
        )}
      </svg>
    </div>
  );
}
