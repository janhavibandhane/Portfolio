"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { BsLinkedin } from "react-icons/bs";
import { SlOptionsVertical } from "react-icons/sl";

export const Navbar = () => {
  const [activeLink, setActiveLink] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onUpdateActiveLink = (value) => {
    setActiveLink(value);
  };

  return (
    <div
      className={`navbar fixed top-0 z-50 transition-all text-white  ${
        scrolled ? "bg-[rgba(0,0,0,0.5)] shadow" : "bg-[rgba(0,0,0,0)]"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center px-4 py-3">
        <Link href="/" className="text-2xl font-bold text-white">
          MyPortfolio
        </Link>

        <div className="hidden md:flex gap-6 font-semibold text-lg">
          <Link
            href="#home"
            className={` ${
              activeLink === "home" ? "text-primary font-semibold" : ""
            }`}
            onClick={() => onUpdateActiveLink("home")}
          >
            Home
          </Link>
          <Link
            href="#skills"
            className={` ${
              activeLink === "skills" ? "text-primary font-semibold" : ""
            }`}
            onClick={() => onUpdateActiveLink("skills")}
          >
            Skills
          </Link>
          <Link
            href="#projects"
            className={` ${
              activeLink === "projects" ? "text-primary font-semibold" : ""
            }`}
            onClick={() => onUpdateActiveLink("projects")}
          >
            Projects
          </Link>
        </div>

        <div className="flex md:space-x-4 gap-1">
          <div className="flex md:space-x-4 gap-1">
            <Link href="https://github.com/janhavibandhane"><div className=" w-8 h-8 md:w-10 md:h-10 bg-[#1e1e1e] opacity-35 rounded-full border-2 border-white flex justify-center items-center">
              <FaGithub className="text-4xl" />
            </div>
            </Link>
            <div className=" w-8 h-8 md:w-10 md:h-10 bg-[#1e1e1e] opacity-25 rounded-full border-2 border-white flex justify-center items-center">
              <BsLinkedin className="md:text-4xl text-3xl rounded-full" />
            </div>
          </div>
          <div className="hidden md:block">
            <Link href="#connect">
              <button className="btn btn-outline btn-primary">
                Let’s Connect
              </button>
            </Link>
          </div>
          <div className="dropdown dropdown-end md:hidden">
            <div
              tabIndex={0}
              role="button"
              className=" w-8 h-8 md:w-10 md:h-10 bg-[#1e1e1e] opacity-25 rounded-full border-2 border-white flex justify-center items-center"
            >
              <SlOptionsVertical />
            </div>
            <ul
              tabIndex={0}
              className="mt-3 dropdown-content menub bg-[#1e1e1e] border border-[#777373]   rounded-box z-1 w-52 p-2 shadow-sm"
            >
              <li>
                <a>Item 1</a>
              </li>
              <li>
                <a>Item 2</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
