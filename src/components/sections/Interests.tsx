"use client";

import { AtelierInterests } from "@/components/atelier/AtelierSections";

import { useLocalize } from "@/i18n/useTranslations";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { INTERESTS_DATA } from "@/data/interests";
import { techAssets, journeyAssets, WorldAssetItem } from "@/data/worldAssets";
import { PixelSectionTitle } from "@/components/pixel/PixelSectionTitle";
import { PixelCard } from "@/components/pixel/PixelCard";
import { PixelBadge } from "@/components/pixel/PixelBadge";
import { usePortfolioMode } from "@/hooks/usePortfolioMode";
import { Sparkles, Layers } from "lucide-react";
import { cn } from "@/lib/utils";

export function Interests() {
  const localize = useLocalize();
  const { mode } = usePortfolioMode();

  // Map each domain to its normalized world asset from the registry
  const domainAssetMap: Record<string, WorldAssetItem> = {
    ai: techAssets.aiChip,
    "smart-city": techAssets.smartCity,
    "software-engineering": techAssets.codeEditor,
    "startup-product": journeyAssets.rocket,
    "research-experimentation": journeyAssets.researchFlask,
  };

  // Find Smart City as the Tier A featured item
  const smartCityInterest = INTERESTS_DATA.find((i) => i.id === "smart-city");
  const aiInterest = INTERESTS_DATA.find((i) => i.id === "ai");
  const standardInterests = INTERESTS_DATA.filter(
    (i) => i.id !== "smart-city" && i.id !== "ai"
  );

  if (mode === "recruiter") return <AtelierInterests />;

  if (mode === "pixel") {
    const openDomains = INTERESTS_DATA.filter((interest) => interest.id !== "smart-city");
    const propDimensions: Record<string, { width: number; height: number }> = {
      ai: { width: 1038, height: 958 },
      "software-engineering": { width: 1169, height: 835 },
      "startup-product": { width: 1143, height: 1287 },
      "research-experimentation": { width: 840, height: 1106 },
    };

    return localize((
      <section id="interests" aria-labelledby="world-interests-title" className="world-chapter world-interests">
        <div className="world-container">
          <header className="identity-chapter-heading">
            <p className="identity-eyebrow">04 / BEYOND THE WORKSHOP · TECH DOMAINS</p>
            <h2 id="world-interests-title">Primary Tech Interests / Domain Map</h2>
            <p>Core focus domains spanning data intelligence, geospatial systems, and software engineering.</p>
          </header>

          {smartCityInterest && (
            <article className="civic-domain" aria-labelledby="civic-domain-title">
              <figure className="city-diorama">
                <Image
                  src={domainAssetMap["smart-city"].src}
                  alt=""
                  aria-hidden="true"
                  width={1382}
                  height={1007}
                  className="city-diorama-image"
                  unoptimized
                />
                <figcaption>Illustrative Smart City Urban Intelligence Framework</figcaption>
              </figure>
              <div className="civic-domain-copy">
                <p className="identity-small-label">Featured domain / Tier A · CIVICTWIN Semarang</p>
                <h3 id="civic-domain-title">{smartCityInterest.title}</h3>
                <p className="domain-key-focus">{smartCityInterest.keyFocus}</p>
                <p>{smartCityInterest.summary}</p>
                <div className="civic-analytics-note"><h4>Civic Analytics &amp; GIS</h4><p>Connecting multi-criteria decision models (MCDM) with spatial infrastructure mapping to support transparent regional governance.</p></div>
                <ul className="domain-topic-list" aria-label="Smart City key topics">{smartCityInterest.topics.map((topic) => <li key={topic}>{topic}</li>)}</ul>
                <p className="civic-evidence"><Link href="/projects/civictwin-semarang" className="chapter-link">CIVICTWIN Semarang · 3rd Place UNITY UNY</Link></p>
              </div>
            </article>
          )}

          <div className="open-domain-layout">
            {openDomains.map((interest, index) => {
              const asset = domainAssetMap[interest.id];
              const dimensions = propDimensions[interest.id];
              return (
                <article key={interest.id} className={`open-domain open-domain-${interest.id}`} aria-labelledby={`domain-${interest.id}-title`}>
                  <div className="domain-title-line">
                    <div><p className="identity-small-label">Domain 0{index + 1}</p><h3 id={`domain-${interest.id}-title`}>{interest.title}</h3></div>
                    {asset && dimensions && <Image src={asset.src} alt="" aria-hidden="true" width={dimensions.width} height={dimensions.height} className="domain-prop-image" unoptimized />}
                  </div>
                  <p className="domain-key-focus">{interest.keyFocus}</p>
                  <p className="open-domain-summary">{interest.summary}</p>
                  <ul className="domain-topic-list" aria-label={`${interest.title} focus topics`}>{interest.topics.map((topic) => <li key={topic}>{topic}</li>)}</ul>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    ));
  }
  return null;
}

