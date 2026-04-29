import Image from "next/image";
import { siteContent } from "@/content/siteContent";
import { AboutPhotoPlaceholder } from "./AboutPhotoPlaceholder";

export function AboutTeamFeature() {
  const { teamFeature: t } = siteContent.aboutPage;
  const hasPhoto = typeof t.imageSrc === "string" && t.imageSrc.length > 0;

  return (
    <section
      aria-labelledby="about-team-heading"
      className="bg-exit-warm px-5 py-12 md:px-[60px] md:py-[3.75rem]"
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-11 grid gap-10 lg:mb-14 lg:grid-cols-2 lg:items-center lg:gap-14 xl:gap-20">
          <div className="min-w-0 text-center lg:text-left">
            <h2
              id="about-team-heading"
              className="font-display mb-5 text-[clamp(2rem,3.5vw,3rem)] font-black uppercase leading-[0.95] tracking-[-0.5px] text-exit-dark"
            >
              {t.heading}
            </h2>
            <p className="mx-auto max-w-xl text-[15px] leading-[1.72] tracking-tight text-exit-gray lg:mx-0 lg:max-w-md lg:text-[16px]">
              {t.captionLead}
            </p>
          </div>

          <div className="min-w-0 overflow-hidden rounded-[22px] border border-exit-dark/[0.07] shadow-[0_24px_64px_rgba(0,0,0,0.12)] ring-1 ring-black/[0.04]">
            {hasPhoto ? (
              <Image
                src={t.imageSrc as string}
                alt={t.imageAlt}
                width={1400}
                height={788}
                className="aspect-[16/10] w-full object-cover lg:aspect-[21/11]"
                sizes="(max-width:1024px) 100vw, 50vw"
              />
            ) : (
              <AboutPhotoPlaceholder hint="Large family or crew photo — upload to public/images and set aboutPage.teamFeature.imageSrc." />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
