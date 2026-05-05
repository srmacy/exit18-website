"use client";

import { useId, useState } from "react";

const paraClass =
  "mb-4 text-[15px] leading-[1.8] text-exit-gray [&_strong]:text-exit-dark";

type StoryExpandableParagraphsProps = {
  firstParagraph: string;
  restParagraphs: readonly string[];
};

export function StoryExpandableParagraphs({
  firstParagraph,
  restParagraphs,
}: StoryExpandableParagraphsProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const hasMore = restParagraphs.length > 0;

  return (
    <div>
      <p
        className={paraClass}
        dangerouslySetInnerHTML={{ __html: firstParagraph }}
      />
      {hasMore && (
        <div
          id={panelId}
          role="region"
          aria-label="Full story text"
          hidden={!open}
          className="transition-opacity duration-200 ease-out"
        >
          {restParagraphs.map((p, i) => (
            <p
              key={i}
              className={paraClass}
              dangerouslySetInnerHTML={{ __html: p }}
            />
          ))}
        </div>
      )}
      {hasMore && (
        <button
          type="button"
          className="mt-1 text-left text-sm font-semibold text-exit-green underline underline-offset-[3px] transition duration-200 ease-out hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-exit-green/40"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={panelId}
        >
          {open ? "Show less" : "Learn more"}
        </button>
      )}
    </div>
  );
}
