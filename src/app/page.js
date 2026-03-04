"use client";

import Banner from "./Components/Banner/page";
import Skills from "./Components/Skills/page";
import Navbar from "./Components/Navbar/page";
import Experience from "./Components/Experience/page";
import Project from "./Components/Project/page";
import Contact from "./Components/Contact/page";

export default function Home() {
  return (
    <>
      <Navbar />
      <Banner />
      <Skills />
      <Experience />
      <Project />
      <Contact />
    </>
  );
}