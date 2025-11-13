"use client";

import About from "./components/about";
import Carousel from "./components/carousel";
import ProjectList from "./components/project-panel";
import PressPanel from "./components/press-panel";
import Contact from "./components/contact";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen mx-auto py-6 sm:py-8 md:py-12 px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 md:pb-20 text-base sm:text-lg lg:text-base max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl w-full">
      <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8">
        <About />
        <Carousel />
      </div>
      <div className="mt-6">
        <ProjectList />
      </div>
      <div className="flex flex-col lg:flex-row mt-6 sm:mt-8 gap-4 sm:gap-6 lg:gap-8">
        <PressPanel />
        <Contact />
      </div>
    </div>
  );
}
