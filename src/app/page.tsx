import { NavToolbar } from "@/components/nav-toolbar";
import { HeroSection } from "@/components/hero-section";
import { SelectedWorkSection } from "@/components/selected-work-section";
import { StackSection } from "@/components/stack-section";
import { AboutSection } from "@/components/about-section";
import { ExperienceSection } from "@/components/experience-section";
import { WritingSection } from "@/components/writing-section";
import { ContributionGraphSection } from "@/components/contribution-graph-section";
import { SiteFooter } from "@/components/site-footer";

export default function Home() {
  return (
    <>
      <NavToolbar />
      <main className="mx-auto w-full max-w-3xl flex-1 px-6 pt-24">
        <HeroSection />
        <SelectedWorkSection />
        <StackSection />
        <AboutSection />
        <ExperienceSection />
        <WritingSection />
        <ContributionGraphSection />
      </main>
      <SiteFooter />
    </>
  );
}
