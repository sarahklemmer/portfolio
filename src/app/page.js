"use client";

import dynamic from "next/dynamic";
import HeroSection from "../components/HeroSection";
import Loading from "../components/ui/loading";
import SectionLoading from "../components/ui/section-loading";
import { albums } from "../lib/albums";
import StravaWidget from "../components/StravaWidget";
import Footer from "../components/Footer";
import ParallaxBackground from "../components/ParallaxBackground";

const Projects = dynamic(() => import("../components/Projects"), {
  loading: () => <Loading />,
  ssr: false,
});

const Experience = dynamic(() => import("../components/Experience"), {
  loading: () => <SectionLoading />,
  ssr: false,
});

const GoalsSection = dynamic(() => import("../components/GoalsSection"), {
  loading: () => <SectionLoading />,
  ssr: false,
});

const AlbumCarousel = dynamic(() => import("../components/AlbumCarousel"), {
  loading: () => <SectionLoading />,
  ssr: false,
});

export default function Home() {
  return (
    <div className="min-h-screen">
      <ParallaxBackground />
      <div id="header" className="relative z-10">
        <HeroSection />
      </div>

      <section id="projects" className="container py-16 relative z-0">
        <h2 className="text-4xl font-extrabold mb-12 text-center">Projects</h2>
        <Projects />
      </section>

      <section id="experience" className="container py-16">
        <Experience />
      </section>

      <section id="interests" className="container py-16">
        <h2 className="text-4xl font-extrabold mb-12 text-center">
          My Interests
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-6">Personal Goals</h3>
            <GoalsSection />
          </div>
        </div>
        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-6 text-center">
            My Favorite Albums
          </h3>
          <AlbumCarousel albums={albums} speed={50} />
        </div>
      </section>
      <div className="h-32" />
      <Footer />
    </div>
  );
}
