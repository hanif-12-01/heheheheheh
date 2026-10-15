"use client";

import { useLocale } from "@/i18n/LocaleProvider";
import { CV_COPY } from "@/i18n/cv";
import { resolveCv } from "@/lib/cv";

type CvActionsProps = {
  className?: string;
  downloadClassName?: string;
  printClassName?: string;
  showPrint?: boolean;
};

export function CvActions({ className = "", downloadClassName, printClassName, showPrint = true }: CvActionsProps) {
  const { locale } = useLocale();
  const cv = resolveCv(locale);
  const copy = CV_COPY[locale];

  return (
    <>
      <a href={cv.pdfUrl} download={cv.filename} aria-label={copy.downloadLabel}
        className={downloadClassName ?? className}>
        {copy.download} <span aria-hidden="true">PDF ↓</span>
      </a>
      {showPrint && (
        <a href={cv.printUrl} target="_blank" rel="noopener noreferrer" aria-label={copy.printLabel}
          className={printClassName ?? className}>
          {copy.print} <span aria-hidden="true">↗</span>
        </a>
      )}
    </>
  );
}
