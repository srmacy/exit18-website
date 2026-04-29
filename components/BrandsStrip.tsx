import { siteContent } from "@/content/siteContent";

export function BrandsStrip() {
  const { brands } = siteContent;

  return (
    <div className="flex items-center gap-3 overflow-x-auto bg-exit-dark px-5 py-7 md:gap-4 md:px-[60px]">
      <span className="mr-1 shrink-0 whitespace-nowrap text-[10px] font-bold uppercase tracking-[2px] text-white/30">
        {brands.stripLabel}
      </span>
      {brands.names.map((name) => (
        <span
          key={name}
          className="inline-flex shrink-0 items-center rounded-[20px] border border-white/12 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-white/50 transition hover:border-exit-lime hover:text-exit-lime"
        >
          {name}
        </span>
      ))}
    </div>
  );
}
