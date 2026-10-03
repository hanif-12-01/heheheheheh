import React from "react";
import { Hero } from "@/components/sections/Hero";
import { PlayerProfile } from "@/components/sections/PlayerProfile";
import { About } from "@/components/sections/About";
import { Interests } from "@/components/sections/Interests";
import { Journey } from "@/components/sections/Journey";
import { TrophyRoom } from "@/components/sections/TrophyRoom";
import { ProjectLab } from "@/components/sections/ProjectLab";
import { ResearchCompetitions } from "@/components/sections/ResearchCompetitions";
import { SkillsInventory } from "@/components/sections/SkillsInventory";
import { GithubExperiments } from "@/components/sections/GithubExperiments";
import { LetsBeFriends } from "@/components/sections/LetsBeFriends";
import { SectionTracker } from "@/components/layout/SectionTracker";

export default function HomePage() {
  return (
    <main className="flex flex-col w-full relative">
      {/* Client Section Observer for reactive companion pet */}
      <SectionTracker />

      {/* 01 — Spawn Point / Hero */}
      <Hero />

      {/* 02 — Player Profile */}
      <PlayerProfile />

      {/* 03 — About Hanif */}
      <About />

      {/* 04 — Tech Interests */}
      <Interests />

      {/* 05 — The Journey */}
      <Journey />

      {/* 06 — Trophy Room */}
      <TrophyRoom />

      {/* 07 — Project Lab */}
      <ProjectLab />

      {/* 08 — Research & Competitions */}
      <ResearchCompetitions />

      {/* 09 — Skill Inventory */}
      <SkillsInventory />

      {/* 10 — GitHub Experiments */}
      <GithubExperiments />

      {/* 11 — Let's Be Friends */}
      <LetsBeFriends />
    </main>
  );
}
