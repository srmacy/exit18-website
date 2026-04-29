import { cn } from "@/lib/cn";

type PlaceholderTone = "default" | "inset";

/** Dashed placeholders for optional photos — no heavy chrome. */
export function AboutPhotoPlaceholder({
  hint,
  tone = "default",
}: {
  hint: string;
  tone?: PlaceholderTone;
}) {
  return (
    <div
      className={cn(
        "flex min-h-[220px] w-full flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed px-6 text-center sm:min-h-[260px] md:min-h-[280px] lg:min-h-[300px]",
        tone === "default" &&
          "border-exit-green/28 bg-exit-warm-mid/55 text-exit-gray",
        tone === "inset" &&
          "border-white/25 bg-exit-dark/30 text-white/75 backdrop-blur-sm",
      )}
    >
      <span className="select-none text-[2.25rem] opacity-85" aria-hidden>
        📷
      </span>
      <p className="max-w-[18rem] text-sm font-medium leading-snug">{hint}</p>
    </div>
  );
}
