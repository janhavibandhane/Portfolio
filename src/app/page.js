import Image from "next/image";
import { Navbar } from "./Components/Navbar/page";
import { Banner } from "./Components/Banner/page";
import { Skills } from "./Components/Skills/page";
import Contact from "./Components/Contact/page";
import Footer from "./Components/Footer/page";

export default function Home() {
  return (
    <>
    <Navbar></Navbar>
    <Banner></Banner>
    <Skills></Skills>
    <Contact></Contact>
    <Footer></Footer>
    </>
  );
}
