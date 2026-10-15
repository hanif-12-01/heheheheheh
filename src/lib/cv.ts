export type CvLocale = "en" | "id";

/** Single target resolver for every CV link. The legacy fixed URL remains an English alias. */
export function resolveCv(locale: CvLocale = "en") {
  const language = locale.toUpperCase();
  const filename = `M-Hanif-Al-Faiz-CV-${language}.pdf`;
  return {
    filename,
    pdfUrl: `/cv/${filename}`,
    printUrl: `/cv/print-${language}.html`,
  };
}
