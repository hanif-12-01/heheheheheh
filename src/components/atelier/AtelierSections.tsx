"use client";
import { useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { PROFILE_DATA } from "@/data/profile";
import { INTERESTS_DATA } from "@/data/interests";
import { JOURNEY_LEVELS } from "@/data/journey";
import { ACHIEVEMENTS_DATA } from "@/data/achievements";
import { RESEARCH_COMPETITIONS_DATA } from "@/data/researchCompetitions";
import { SKILLS_INVENTORY } from "@/data/skills";
import { GITHUB_EXPERIMENTS } from "@/data/projects";
import { SOCIAL_LINKS, CONTACT_COPY } from "@/data/socials";
import { useLocalize } from "@/i18n/useTranslations";
import { CvActions } from "@/components/ui/CvActions";
import { AtelierRoomScene } from "./AtelierRoomScene";

const DOMAIN_ART: Record<string, string> = {
  ai: "/pixel/tech/tech-ai-chip.webp",
  "smart-city": "/pixel/tech/tech-smart-city.webp",
  "software-engineering": "/pixel/tech/tech-code-editor.webp",
  "startup-product": "/pixel/journey/semester-5-rocket.webp",
  "research-experimentation": "/pixel/journey/semester-4-research-flask.webp",
};

function honorArt(item: { category?: string; id: string }) {
  if (item.category === "grant") return "/pixel/journey/semester-4-research-document.webp";
  if (item.id === "smart-city-uny-2026") return "/pixel/achievements/achievement-trophy.webp";
  if (item.id === "genbi-2026") return "/pixel/achievements/achievement-laurel.webp";
  return "/pixel/achievements/achievement-medal.webp";
}

function Room({ id, number, title, subtitle, children, className = "" }: { id: string; number: string; title: string; subtitle: string; children: ReactNode; className?: string }) {
  const localize = useLocalize();
  return localize(<section id={id} className={`atelier-room ${className}`} aria-labelledby={`atelier-${id}-title`}>
    <header className="atelier-room__heading"><span className="atelier-room__number" aria-hidden="true">{number}</span><div><h2 id={`atelier-${id}-title`}>{title}</h2><p>{subtitle}</p></div><span className="atelier-room__ornament" aria-hidden="true">✦</span></header>
    {children}
  </section>);
}

export function AtelierProfile() {
  const localize = useLocalize();
  return localize(<Room id="profile" number="01" title="Academic foundation." subtitle="A foundation in informatics. A practice shaped by building.">
    <div className="atelier-academic-stage">
      <AtelierRoomScene variant="library" />
      <div className="atelier-academic">
      <div className="atelier-academic__institution"><span className="atelier-kicker">Academic Profile</span><h3>{PROFILE_DATA.university}</h3><p>{PROFILE_DATA.degree}</p><p className="atelier-academic__status">Semester {PROFILE_DATA.currentLevel} · In Progress</p><p>Expected graduation <strong>{PROFILE_DATA.expectedGraduation}</strong></p></div>
      <div className="atelier-academic__gpa"><span>Cumulative GPA</span><strong>{PROFILE_DATA.gpa.split(" /")[0]}</strong><span>/ 4.00</span><p>Academic standing</p></div>
      </div>
    </div>
    <div className="atelier-capabilities">{PROFILE_DATA.stats.map(stat=><article key={stat.id}><h3>{stat.name}</h3><p>{stat.rank}</p><span>{stat.highlight}</span></article>)}</div>
  </Room>);
}

export function AtelierAbout() {
  const localize = useLocalize();
  return localize(<Room id="about" number="02" title="The person behind the work." subtitle="An evolving practice in software, research, and shared responsibility." className="atelier-personal">
    <div className="atelier-narrative"><div><p className="atelier-kicker">Professional Overview</p>{PROFILE_DATA.bioExtended.slice(0,2).map(p=><p key={p}>{p}</p>)}</div><div className="atelier-narrative__reflection"><AtelierRoomScene variant="library" /><blockquote>{PROFILE_DATA.bioExtended[2]}<span aria-hidden="true">— M. Hanif Al Faiz</span></blockquote></div></div>
  </Room>);
}

export function AtelierInterests() {
  const localize=useLocalize();
  return localize(<Room id="interests" number="03" title="Fields of inquiry." subtitle="Connected disciplines, explored through practical work." className="atelier-inquiry">
    <div className="atelier-domains">{INTERESTS_DATA.map((item,index)=><article key={item.id}><Image className="atelier-domain-art" src={DOMAIN_ART[item.id]} alt="" aria-hidden="true" width={64} height={64} unoptimized loading="lazy" /><span className="atelier-index" aria-hidden="true">0{index+1}</span><div><h3>{item.title}</h3><p>{item.summary}</p><span className="atelier-domain-focus">{item.keyFocus}</span><ul>{item.topics.map(topic=><li key={topic}>{topic}</li>)}</ul></div></article>)}</div>
  </Room>);
}

export function AtelierJourney() {
  const localize=useLocalize();
  const [selected,setSelected]=useState(5);
  const level=JOURNEY_LEVELS.find(item=>item.semester===selected)!;
  return localize(<Room id="journey" number="04" title="A developing practice." subtitle="Education, responsibility, and a growing body of work.">
    <div className="atelier-passage"><AtelierRoomScene variant="arcade" /><nav className="atelier-semesters" aria-label="Semester Milestones Navigator">{JOURNEY_LEVELS.map(item=><button key={item.semester} id={`semester-selector-${item.semester}`} type="button" onClick={()=>setSelected(item.semester)} aria-pressed={selected===item.semester} aria-current={selected===item.semester?"step":undefined} aria-controls="atelier-journey-record"><span>Semester {item.semester}</span><strong>{item.title}</strong><small>{item.status==="current"?"In Progress":"Completed"}</small></button>)}</nav></div>
    <div id="atelier-journey-record" className="atelier-journey-record" role="region" aria-live="polite" aria-labelledby="atelier-semester-title"><div><p className="atelier-kicker">Semester {selected} · {level.status==="current"?"In Progress":"Completed"}</p><h3 id="atelier-semester-title">{level.title}</h3><p>{level.subtitle}</p><p>{level.summary}</p></div><ol>{level.activities.map(activity=><li key={activity.title}><h4>{activity.title}</h4><p>{activity.description}</p></li>)}</ol></div>
  </Room>);
}

export function AtelierHonors() {
  const localize=useLocalize();
  const [selected,setSelected]=useState(ACHIEVEMENTS_DATA[0].id);
  const record=ACHIEVEMENTS_DATA.find(item=>item.id===selected)!;
  return localize(<Room id="trophies" number="05" title="Honors, in perspective." subtitle="Exact outcomes. Documented contributions. Each with its own story.">
    <div className="atelier-honors-stage"><AtelierRoomScene variant="gallery" /><div className="atelier-honors" role="group" aria-label="Achievement selection">{ACHIEVEMENTS_DATA.map(item=><button id={`trophy-selector-${item.id}`} type="button" key={item.id} aria-pressed={selected===item.id} aria-controls="achievement-dossier" onClick={()=>setSelected(item.id)}><Image className="atelier-honor-art" src={honorArt(item)} alt="" aria-hidden="true" width={112} height={120} unoptimized loading="lazy" /><span>{item.year}</span><strong>{item.result}</strong><span>{item.title}</span></button>)}</div></div>
    <article id="achievement-dossier" className="atelier-honor-record" aria-live="polite"><div><Image src={honorArt(record)} alt="" aria-hidden="true" width={112} height={120} unoptimized loading="lazy" /><div><p className="atelier-kicker">{record.result}</p><h3>{record.title}</h3><span>{record.organizer}</span></div></div><div><p>{record.description}</p>{record.relatedProject&&<Link href={`/projects/${record.relatedProject}`} className="atelier-text-link">Read case study <span aria-hidden="true">↗</span></Link>}</div></article>
  </Room>);
}

export function AtelierResearch() {
  const localize=useLocalize();
  const [filter,setFilter]=useState("all");
  const filters=[{id:"all",label:"All notes"},{id:"competitions",label:"Competitions"},{id:"research",label:"Research & PKM"},{id:"presentations",label:"Presentations"}];
  const records=RESEARCH_COMPETITIONS_DATA.filter(item=>filter==="all"||(filter==="research"&&["Research","PKM"].includes(item.category))||(filter==="presentations"&&item.category==="Public Speaking")||(filter==="competitions"&&["Smart City","Business Competition","Hackathon","GEMASTIK"].includes(item.category)));
  return localize(<Room id="research" number="07" title="Research & contributions." subtitle="Student research, technical collaboration, and ideas presented in public.">
    <div className="atelier-research-layout"><aside><AtelierRoomScene variant="observatory" /><p>Roles reflect documented student contributor, developer, presenter, and participant status. Competition results are distinguished from participation and presentation.</p></aside><div><div className="atelier-filters" role="group" aria-label="Filter research and competition records">{filters.map(item=><button type="button" key={item.id} aria-pressed={filter===item.id} aria-controls="research-records" onClick={()=>setFilter(item.id)}>{item.label}</button>)}</div><p role="status" className="sr-only">{`${records.length} records displayed for ${filter==="all"?"all categories":filter} filter.`}</p><div id="research-records">{records.map(item=><article key={item.id} className="atelier-research-record"><span>{item.year} · {item.category}</span><h3>{item.title}</h3><p className="atelier-research-record__role">{item.role}</p><p>{item.highlight}</p><small>{item.event} · {item.status}</small></article>)}</div></div></div>
  </Room>);
}

export function AtelierSkills() {
  const localize=useLocalize();
  return localize(<Room id="skills" number="08" title="Technical repertoire." subtitle="Capabilities grounded in coursework, software prototypes, and collaboration.">
    <div className="atelier-archive-heading"><AtelierRoomScene variant="observatory" /></div>
    <div className="atelier-skills">{SKILLS_INVENTORY.map((group,index)=><article key={group.id}><span className="atelier-index" aria-hidden="true">0{index+1}</span><div><h3>{group.name}</h3><p>{group.description}</p><ul>{group.items.map(item=><li key={item}>{item}</li>)}</ul></div></article>)}</div>
  </Room>);
}

export function AtelierExperiments() {
  const localize=useLocalize();
  return localize(<Room id="experiments" number="09" title="From the technical archive." subtitle="Coursework explorations, algorithmic testbeds, and academic laboratory prototypes." className="atelier-workbench">
    <div className="atelier-experiments">{GITHUB_EXPERIMENTS.map(item=><article key={item.slug}><h3>{item.title}</h3><p>{item.shortDescription}</p><ul>{item.technologies.map(tech=><li key={tech}>{tech}</li>)}</ul>{item.githubUrl?<a href={item.githubUrl} target="_blank" rel="noopener noreferrer" className="atelier-text-link">View repository <span aria-hidden="true">↗</span></a>:<span className="atelier-archive-note">Coursework record</span>}</article>)}</div>
  </Room>);
}

export function AtelierContact() {
  const localize=useLocalize();
  return localize(<Room id="contact" number="10" title="An invitation to connect." subtitle={CONTACT_COPY.tagline} className="atelier-reception">
    <div className="atelier-reception-scene"><AtelierRoomScene variant="arcade" /></div>
    <div className="atelier-contact-layout"><div><p>{CONTACT_COPY.subtext}</p><div className="atelier-contact-cv"><p className="atelier-kicker">The professional dossier</p><p>Harvard-style academic & software engineering CV. A4 format, 2 pages, verified portfolio data.</p><CvActions className="atelier-button" /></div></div><div className="atelier-socials">{SOCIAL_LINKS.map(link=>link.isPlaceholder?<span key={link.id}>{link.name}</span>:<a key={link.id} href={link.url} target={link.id==="email"?undefined:"_blank"} rel={link.id==="email"?undefined:"noopener noreferrer"}><strong>{link.name}</strong><span>{link.id==="email"?link.handle:`@${link.handle}`}</span><span aria-hidden="true">↗</span></a>)}</div></div>
  </Room>);
}
