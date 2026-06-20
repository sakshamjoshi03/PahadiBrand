import "./About.css";

import HeroSection from "./HeroSection";
import StorySection from "./StorySection";
import MissionVision from "./MissionVision";
import ValuesGrid from "./ValuesGrid";

export default function About() {
  return (
    <main className="about-page">

      <HeroSection />

      <StorySection />

      <MissionVision />

      <ValuesGrid />

    </main>
  );
}