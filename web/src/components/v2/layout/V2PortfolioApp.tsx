"use client";

import { EasterBar } from "@/components/v2/easter-eggs/EasterBar";
import { InteractiveSystemMap } from "@/components/v2/system-map/InteractiveSystemMap";
import { V2Provider } from "@/components/v2/layout/v2-context";
import { V2ExploreEntry } from "@/components/v2/layout/V2ExploreEntry";
import { UnlockToast } from "@/components/v2/system-map/UnlockToast";
import { V2TopBar } from "@/components/v2/layout/V2TopBar";
import { V2TrackSection } from "@/components/v2/layout/V2TrackSection";
import { ExploreMapOverlay } from "@/components/v2/system-map/ExploreMapOverlay";
import { HelloSection } from "@/components/v2/sections/HelloSection";
import { AboutSection } from "@/components/v2/sections/AboutSection";
import { SkillsSection } from "@/components/v2/sections/SkillsSection";
import { PublicationsSection } from "@/components/v2/sections/PublicationsSection";
import { ProjectsSection } from "@/components/v2/sections/ProjectsSection";
import { ExperienceEducationSection } from "@/components/v2/sections/ExperienceEducationSection";
import { BeyondWorkSection } from "@/components/v2/sections/BeyondWorkSection";
import { ContactSection } from "@/components/v2/sections/ContactSection";

function V2Content() {
  return (
    <>
      <EasterBar />
      <InteractiveSystemMap />
      <V2ExploreEntry />
      <UnlockToast />
      <ExploreMapOverlay />
      <div className="v2-main-surface relative z-10 min-h-svh">
        <V2TopBar />
        <main className="v2-main-content">
          <V2TrackSection id="intro" aria-label="Intro">
            <HelloSection />
          </V2TrackSection>
          <V2TrackSection id="about" aria-label="About">
            <AboutSection />
          </V2TrackSection>
          <V2TrackSection id="skills" aria-label="Technical skills">
            <SkillsSection />
          </V2TrackSection>
          <V2TrackSection id="publications" aria-label="Publications">
            <PublicationsSection />
          </V2TrackSection>
          <V2TrackSection id="projects" aria-label="Projects">
            <ProjectsSection />
          </V2TrackSection>
          <V2TrackSection id="experience" aria-label="Experience and education">
            <ExperienceEducationSection />
          </V2TrackSection>
          <V2TrackSection id="beyond" aria-label="Beyond work">
            <BeyondWorkSection />
          </V2TrackSection>
          <V2TrackSection id="contact" aria-label="Contact">
            <ContactSection />
          </V2TrackSection>
        </main>
      </div>
    </>
  );
}

export function V2PortfolioApp() {
  return (
    <V2Provider>
      <V2Content />
    </V2Provider>
  );
}
