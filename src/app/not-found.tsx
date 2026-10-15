import Link from "next/link";
import { Localize } from "@/i18n/Localize";

export default function NotFound() {
  return (
    <Localize>
      <main id="main-content" tabIndex={-1} className="world-container min-h-[65vh] py-20 space-y-6 outline-none">
        <p className="chapter-eyebrow">404</p>
        <h1 className="font-mono text-3xl font-bold">Page not found</h1>
        <p className="max-w-2xl leading-relaxed text-[var(--color-muted)]">
          This path is outside the documented portfolio. Return to the overview or browse the verified project archive.
        </p>
        <nav aria-label="Page recovery" className="flex flex-wrap gap-6">
          <Link href="/" className="chapter-link">Back to overview</Link>
          <Link href="/projects" className="chapter-link">Browse projects</Link>
        </nav>
      </main>
    </Localize>
  );
}
