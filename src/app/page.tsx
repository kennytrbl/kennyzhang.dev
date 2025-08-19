"use client";

import About from "./components/about";
import Carousel from "./components/carousel";
import ProjectList from "./components/project-panel";
import PressPanel from "./components/press-panel";
import Contact from "./components/contact";
import Socials from "./components/socials";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen mx-auto py-12 text-lg lg:text-base w-6/7 lg:w-4/5">
      <div className="flex flex-col lg:flex-row gap-8">
        <About />
        <Carousel />
      </div>
      <ProjectList />
      <div className="flex flex-col lg:flex-row gap-8">
        <PressPanel />
        <Contact />
      </div>
    </div>
  );
}
