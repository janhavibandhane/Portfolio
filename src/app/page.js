import Image from "next/image";
import { Navbar } from "./Components/Navbar/page";
import { Banner } from "./Components/Banner/page";
import { Skills } from "./Components/Skills/page";
import Contact from "./Components/Contact/page";
import Footer from "./Components/Footer/page";
import { ProjectCard } from "./Components/ReuseableComponent/ProjectCard/page";
import Project from "./Components/Project/page";
import ProjectVideo from "./Components/ReuseableComponent/ProjectVideo/page";
import { Experience } from "./Components/Experience/page";


export default function Home() {
  return (
    <>
    <Navbar></Navbar>
    <Banner></Banner>
    <Skills></Skills>
    <Experience></Experience>
    <Project></Project>
    <Contact></Contact>
    <Footer></Footer>
    </>
  );
}
