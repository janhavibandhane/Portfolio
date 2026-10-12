import BootScreen from "@/components/BootScreen";
import ContactSection from "@/components/ContactSection";
import Hero from "@/components/Hero";
import Journey from "@/components/Journey";
import Manifesto from "@/components/Manifesto";
import Nav from "@/components/Nav";
import ProjectStack from "@/components/ProjectStack";
import ScrollFx from "@/components/ScrollFx";
import Stack from "@/components/Stack";
import Windows from "@/components/Windows";

export default function Home() {
  return (
    <main>
      <BootScreen />
      <Nav />
      <Hero />
      <Manifesto />
      <Stack />
      <Journey />
      <ProjectStack />
      <ContactSection />
      <Windows />
      <ScrollFx />
    </main>
  );
}
