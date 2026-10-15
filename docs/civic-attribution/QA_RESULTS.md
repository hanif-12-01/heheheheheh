# Civic project attribution: targeted browser regression

Executed against the updated production build at `http://localhost:3012` on 15 October 2026 using Chromium 151.0.7922.34.

**37/37 focused checks passed.** The machine-readable evidence is `browser-results.json`; `screenshots/` contains 36 current captures.

## Scope and results

The corrected contract assigns the UNITY UNY 2026 **3rd Place** outcome to **CIVICTWIN Semarang**, with repository `https://github.com/hanif-12-01/Unity-semarang`. Purwokerto Intelligence Layer remains separate experimental material with simulated data and its existing repository.

- Tested Pixel/English, Pixel/Indonesian, Professional/English, and Professional/Indonesian at **1440px and 390px**. Home, project directory, CIVICTWIN detail, and PIL detail produced **32 route/viewport observations**. No horizontal overflow, clipped controls, or broken loaded images were found.
- Home contains six project chapters in order: WattWise AI, CIVICTWIN Semarang, Purwokerto Intelligence Layer, Lapor Mangan, Bernas MBG, and Fuzzy Rain Risk Index. The two main featured exhibits are WattWise and CIVICTWIN.
- CIVICTWIN's card uses the correct GitHub link, 3rd Place outcome, competition proof-of-concept label, and simulated-data disclosure. PIL's card keeps its repository and uses **“Experimental material · Simulated data” / “Bahan eksperimen · Data simulasi”**, without an award badge or UNITY/3rd Place claim.
- The project directory contains **six projects plus three laboratory experiments**, with nine articles and the matching archive counter.
- Keyboard selection of the Smart City trophy displays CIVICTWIN's award description and CIVICTWIN case-study link. Selecting the PLN trophy first confirms the record actually changes. No PIL award link remains.
- Research record `rc-1`, the selected Semester 4 record, and Pixel Mode's Smart City interest evidence identify CIVICTWIN. The Interests section no longer links PIL as the award project.
- CIVICTWIN and PIL detail URLs return **200** in all four language/mode combinations. CIVICTWIN displays the award and demonstration-data/browser-storage disclosures; PIL displays experimental maturity with no award badge or UNITY/3rd Place claim.
- New Indonesian labels and changed descriptions are localized. The tested Indonesian card/detail surfaces do not leak the new English maturity/disclosure labels or source prose.
- The previously removed SIMOBS route remains **404** in all four combinations, with no visible attribution or link restored. Sitemap excludes that removed route.

## CV regression

Both localized print pages visibly distinguish CIVICTWIN's award from experimental PIL. The actual text blocks are retained in `browser-results.json`. The approved CV template contains no individual project repository anchors; repository-link assertions therefore apply to website cards/details, where those controls exist.

Native browser downloads resolved to the correct language and matched the regenerated disk artifacts:

| Locale | Bytes | SHA-256 |
|---|---:|---|
| EN | 122,975 | `72d188ad5811c0d2acedce6c00f9392d2f2b8b7746a281e448630ea0de0a57e3` |
| ID | 120,828 | `e9ddb2ded81c9c8cc766a9ce9333f1e95d93af53b925ca0d139b79edfb541044` |

This script did not regenerate CVs or repeat the CV worker's three-browser printing validation.

## Diagnostics and limits

No unexpected console errors, runtime exceptions, failed requests, or HTTP errors were recorded. Four Chromium 404 diagnostics are expected because the script deliberately visits the removed SIMOBS URL; each is classified only when its exact console location is that removed route.

`browser-results-first-pass.json` preserves the initial test-harness assumption that CV project anchors existed. The website/content checks passed on that run; the corrected focused suite then passed all 37 checks without an application change.

This is a targeted attribution regression at two widths, not a new eight-width visual audit, Lighthouse run, deployment test, or comprehensive accessibility audit. Historical visual baselines and protected-hash inventories were not rewritten or used to reject the intentional canonical/CV correction.

## Reproduction

```text
rtk proxy node scripts/qa-civic-attribution.cjs
```
