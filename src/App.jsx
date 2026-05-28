import "./index.css";
import { Analytics } from "@vercel/analytics/react";
import Nav from "./components/Nav";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Gallery from "./components/Gallery";
import Press from "./components/Press";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <About />
        <Gallery />
        <Experience />
        <Projects />
        <Press />
        <Contact />
      </main>
      <Footer />
      <Analytics />
    </>
  );
}
