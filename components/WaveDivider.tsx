type Variant =
  | "intoGreen"
  | "outOfGreen"
  | "intoServices"
  | "warmToGreen"
  | "warmToOff"
  | "offTowarm"
  | "warmToDark"
  | "darkToGreen";

const fills: Record<
  Variant,
  { containerClass: string; pathD: string; pathFill: string }
> = {
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
};

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
        <path d={c.pathD} fill={c.pathFill} />
      </svg>
    </div>
  );
}
