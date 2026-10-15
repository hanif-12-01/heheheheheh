# Project ownership correction: targeted regression

Executed on the updated production build at `http://localhost:3012` on 15 October 2026 using Chromium 151.0.7922.34. This run tests the owner's clarification that the friend-developed SIMOBS project must not be attributed to this portfolio.

**40/40 targeted checks passed.** Full results are in `browser-results.json`; eight project-section screenshots are in `screenshots/`.

## Website checks

- Tested Pixel EN, Pixel ID, Professional EN, and Professional ID at **1440px and 390px**. Home and project-directory checks produced **16 route/viewport observations** without horizontal overflow or broken loaded images.
- Home contains exactly **five** project chapters, in this order: WattWise AI, Purwokerto Intelligence Layer, Lapor Mangan, Bernas MBG, and Fuzzy Rain Risk Index.
- Each remaining chapter retains its expected GitHub URL and case-study link. Canonical checks retain project years/statuses, WattWise's Top 10 result, PIL's 3rd Place result and simulated-data disclosure, Bernas's proof-of-concept description, GPA 3.66, Semester 5, and expected graduation 2027.
- The directory contains **five featured projects plus three experiments**, with **eight articles** and the matching archive counter.
- No visible home/profile/directory text or links contains the removed project name, removed case-study URL, or removed repository destination.
- All **five retained case-study URLs return 200**, with correct title/repository and both languages exercised.
- The removed `/projects/simobs-bengkel` URL returns **404**, and all four language/mode combinations display the recovery page without project attribution. Its raw response contains generic `Project Not Found` metadata and the 404 fallback. The old slug remains only as the requested routing parameter in Next.js's serialized response; it is not presented as a portfolio project. Supplemental raw-response assertions are saved in `server-response-audit.json`.
- Sitemap returned 200 and omits the removed route. It currently contains zero URLs because a verified deployment domain is still pending.

## CV checks

- Each of the four language/mode combinations resolved all locale-specific CV action links correctly and completed a real native browser PDF download. Every downloaded hash matched the regenerated file on disk.
- English and Indonesian print HTML opened with visible text and no removed project: 5,580 and 5,593 visible characters respectively.
- Legacy PDF HTTP download matched both its disk file and the regenerated English PDF.
- Strict PDF parsing and text extraction checked every page of EN, ID, and legacy artifacts. Each remains two pages, contains the three selected CV projects (WattWise AI, PIL, Fuzzy Rain Risk Index), and has no removed project name/URL/repository.

| PDF | Page 1 characters | Page 2 characters | Bytes |
|---|---:|---:|---:|
| EN | 4,248 | 1,200 | 121,211 |
| ID | 4,315 | 1,134 | 119,234 |
| Legacy EN copy | 4,248 | 1,200 | 121,211 |

This targeted script did not regenerate documents or repeat the native print-dialog/print-engine workflow. The CV worker separately owns that validation.

## Diagnostics and historical evidence

No unexpected console errors, runtime exceptions, failed requests, or HTTP errors occurred. Chromium emitted four expected 404 console messages when the test deliberately visited the removed URL; these are recorded with their exact location URL under `expectedDiagnostics`. The first pass treated those expected messages as generic errors; `browser-results-first-pass.json` preserves that test-harness finding. The final pass explicitly classifies only a 404 message located at the removed route as expected.

Historical design baselines and protected-hash inventories were **not rewritten**. Canonical removal and regenerated CV outputs are intentional ownership corrections, so the old blanket hash assertion was not rerun as an acceptance test.

## Reproduction

```text
rtk proxy node scripts/qa-project-ownership.cjs
```
