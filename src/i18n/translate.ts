import { ID, type TranslationKey } from "./id";
import type { Locale } from "./config";

const dictionary: Readonly<Record<string, string>> = ID;
export function t(key: TranslationKey, locale: Locale): string {
  return locale === "id" ? ID[key] : key;
}

/** Source-key catalogue lookup plus typed semantic templates for runtime counts and names.
 * This only changes presentation. Never feed its output back into filters, IDs or routes. */
export function translate(source: string, locale: Locale, depth = 0): string {
  if (locale === "en" || depth > 4) return source;
  const text = source.trim().replace(/\s+/g, " ");
  if (!text) return source;
  const direct = dictionary[text];
  let result = direct;
  const tr = (value: string) => translate(value, locale, depth + 1);
  if (result === undefined) {
    let match: RegExpMatchArray | null;
    if ((match = text.match(/^Switch portfolio mode\. Current mode: (pixel|recruiter)$/))) result = `Ganti mode portofolio. Mode saat ini: ${match[1] === "pixel" ? "Pixel" : "Profesional"}`;
    else if ((match = text.match(/^Pixel Hanif companion, current action: (.+)\. Click for dialogue\.$/))) result = `Pendamping Pixel Hanif, aktivitas saat ini: ${tr(match[1])}. Klik untuk berbicara.`;
    else if ((match = text.match(/^Talk to Pixel Hanif \((.+), (\d+) clicks\)$/))) result = `Sapa Pixel Hanif (${tr(match[1])}, ${match[2]} klik)`;
    else if ((match = text.match(/^Companion dialogue: ["“](.+)["”]\. Click or press Escape to dismiss\.$/))) result = `Dialog pendamping: "${tr(match[1])}". Klik atau tekan Escape untuk menutup.`;
    else if ((match = text.match(/^Active Pet State: (.+)$/))) result = `Aktivitas pendamping: ${tr(match[1])}`;
    else if ((match = text.match(/^Open (.+) repository(?: on GitHub)? \(opens in new tab\)$/))) result = `Buka repositori ${match[1]} di GitHub (tab baru)`;
    else if ((match = text.match(/^Open (.+) live prototype \(opens in new tab\)$/))) result = `Buka purwarupa langsung ${match[1]} (tab baru)`;
    else if ((match = text.match(/^View (.+) case study$/))) result = `Lihat studi kasus ${match[1]}`;
    else if ((match = text.match(/^(.+) technologies$/))) result = `Teknologi ${match[1]}`;
    else if ((match = text.match(/^(.+) focus topics$/))) result = `Topik fokus ${tr(match[1])}`;
    else if ((match = text.match(/^(.+) evidence areas$/))) result = `Bidang bukti ${tr(match[1])}`;
    else if ((match = text.match(/^(.+) capabilities$/))) result = `Keahlian ${tr(match[1])}`;
    else if ((match = text.match(/^(Detailed milestones|Activities list) for Semester (\d+)$/))) result = `${match[1] === "Detailed milestones" ? "Rincian pencapaian" : "Daftar kegiatan"} Semester ${match[2]}`;
    else if ((match = text.match(/^Semester (\d+) selected\. (\d+) documented milestones\.$/))) result = `Semester ${match[1]} dipilih. ${match[2]} pencapaian terdokumentasi.`;
    else if ((match = text.match(/^(\d+) (?:record|records) displayed for (.+) filter\.$/))) result = `${match[1]} catatan ditampilkan untuk filter ${tr(match[2])}.`;
    else if ((match = text.match(/^Academic progress: Semesters 1 through (\d+) completed, Semester (\d+) currently in progress, Semesters (\d+) through (\d+) upcoming\.$/))) result = `Kemajuan akademik: Semester 1 sampai ${match[1]} selesai, Semester ${match[2]} sedang berjalan, Semester ${match[3]} sampai ${match[4]} mendatang.`;
    else if ((match = text.match(/^Semester (\d+) — (.+)$/))) result = `Semester ${match[1]} — ${tr(match[2])}`;
    else if ((match = text.match(/^(SEMESTER|LEVEL) (\d+)$/))) result = `${match[1] === "LEVEL" ? "TINGKAT" : "SEMESTER"} ${match[2]}`;
    else if ((match = text.match(/^Send email to M\. Hanif Al Faiz at (.+)$/))) result = `Kirim surel kepada M. Hanif Al Faiz melalui ${match[1]}`;
    else if ((match = text.match(/^Open M\. Hanif Al Faiz on (.+) \(opens in new tab\)$/))) result = `Buka profil M. Hanif Al Faiz di ${match[1]} (tab baru)`;
    else if ((match = text.match(/^(.+) channel \(link pending\)$/))) result = `Kanal ${match[1]} (tautan belum tersedia)`;
    else if ((match = text.match(/^Portrait of (.+)$/))) result = `Foto potret ${match[1]}`;
    else if ((match = text.match(/^Interface screenshot of (.+)$/))) result = `Tangkapan layar antarmuka ${match[1]}`;
    else if ((match = text.match(/^Architecture schematic preview for (.+)$/))) result = `Ilustrasi arsitektur ${match[1]}`;
    else if ((match = text.match(/^(SCHEMATIC|VIEWPORT) \/\/ (.+)$/))) result = `${match[1] === "SCHEMATIC" ? "SKEMA" : "TAMPILAN"} // ${match[2]}`;
    else if ((match = text.match(/^Return to (.+) overview$/i))) result = `Kembali ke ringkasan ${match[1]}`;
    else if ((match = text.match(/^STATUS: (.+)$/))) result = `STATUS: ${tr(match[1])}`;
    else if ((match = text.match(/^(\d+) DOCUMENTED MILESTONES$/))) result = `${match[1]} PENCAPAIAN TERDOKUMENTASI`;
  }
  if (result === undefined) return source;
  const leading = source.match(/^\s*/)?.[0] || "";
  const trailing = source.match(/\s*$/)?.[0] || "";
  return leading + result + trailing;
}
