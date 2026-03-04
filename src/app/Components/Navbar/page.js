"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaBars, FaTimes } from "react-icons/fa";
import { BsLinkedin } from "react-icons/bs";
import { SiLeetcode } from "react-icons/si";
import { FiDownload, FiHome, FiCode, FiBriefcase, FiFolder } from "react-icons/fi";

export default function Navbar() {
  const [activeLink, setActiveLink] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu when clicking a link
  const handleLinkClick = (value) => {
    setActiveLink(value);
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { href: "#home", label: "Home", icon: FiHome },
    { href: "#skills", label: "Skills", icon: FiCode },
    { href: "#experience", label: "Experience", icon: FiBriefcase },
    { href: "#projects", label: "Projects", icon: FiFolder },
  ];

  const socialLinks = [
    { 
      icon: FaGithub, 
      href: "https://github.com/janhavibandhane", 
      label: "GitHub",
      color: "hover:text-gray-300"
    },
    { 
      icon: BsLinkedin, 
      href: "https://www.linkedin.com/in/janhavi-bandhane-b6362b255?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", 
      label: "LinkedIn",
      color: "hover:text-blue-400"
    },
    { 
      icon: SiLeetcode, 
      href: "https://leetcode.com/u/janhavibandhane/", 
      label: "LeetCode",
      color: "hover:text-orange-400"
    },
  ];

  return (
    <>
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`navbar fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? "bg-black/80 backdrop-blur-md shadow-lg border-b border-white/10" 
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8 py-3">
          {/* Logo */}
          <Link href="/" className="relative group">
            <motion.span 
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
            >
              Janhavi.
            </motion.span>
            <motion.div 
              initial={{ width: 0 }}
              whileHover={{ width: "100%" }}
              transition={{ duration: 0.3 }}
              className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setActiveLink(link.label.toLowerCase())}
                  className="relative group"
                >
                  <span className={`flex items-center gap-2 text-base font-medium transition-colors duration-300 ${
                    activeLink === link.label.toLowerCase() 
                      ? "text-blue-400" 
                      : "text-white/80 hover:text-white"
                  }`}>
                    <Icon className="w-4 h-4" />
                    {link.label}
                  </span>
                  {activeLink === link.label.toLowerCase() && (
                    <motion.div 
                      layoutId="activeNav"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right Section - Social Icons & Resume */}
          <div className="flex items-center gap-3">
            {/* Social Icons */}
            <div className="hidden md:flex items-center gap-2">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-2 rounded-lg bg-white/5 border border-white/10 hover:border-blue-500/30 transition-all duration-300 group`}
                  aria-label={social.label}
                >
                  <social.icon className={`w-4 h-4 text-white/60 group-hover:text-blue-400 transition-colors`} />
                </motion.a>
              ))}
            </div>

            {/* Resume Button */}
            <Link href="/img/JanhaviBandhane.pdf" target="_blank">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden md:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-medium rounded-lg shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-300"
              >
                <FiDownload className="w-4 h-4" />
                Resume
              </motion.button>
            </Link>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-white/5 border border-white/10 hover:border-blue-500/30 transition-all duration-300"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <FaTimes className="w-5 h-5 text-white/80" />
              ) : (
                <FaBars className="w-5 h-5 text-white/80" />
              )}
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
            />
            
            {/* Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-64 bg-black/95 backdrop-blur-xl border-l border-white/10 z-50 md:hidden"
            >
              <div className="flex flex-col h-full p-6">
                {/* Mobile Menu Header */}
                <div className="flex justify-between items-center mb-8">
                  <span className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Menu
                  </span>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <FaTimes className="w-4 h-4 text-white/80" />
                  </button>
                </div>

                {/* Navigation Links */}
                <div className="flex-1 space-y-4">
                  {navLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => handleLinkClick(link.label.toLowerCase())}
                        className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${
                          activeLink === link.label.toLowerCase()
                            ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30"
                            : "hover:bg-white/5"
                        }`}
                      >
                        <Icon className={`w-5 h-5 ${
                          activeLink === link.label.toLowerCase() 
                            ? "text-blue-400" 
                            : "text-white/60"
                        }`} />
                        <span className={`text-base ${
                          activeLink === link.label.toLowerCase()
                            ? "text-white font-medium"
                            : "text-white/80"
                        }`}>
                          {link.label}
                        </span>
                      </Link>
                    );
                  })}
                </div>

                {/* Mobile Social Links */}
                <div className="pt-6 border-t border-white/10">
                  <div className="flex items-center justify-center gap-4 mb-4">
                    {socialLinks.map((social) => (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileTap={{ scale: 0.95 }}
                        className="p-3 bg-white/5 rounded-lg border border-white/10 hover:border-blue-500/30 transition-all duration-300"
                        aria-label={social.label}
                      >
                        <social.icon className="w-5 h-5 text-white/60 hover:text-blue-400 transition-colors" />
                      </motion.a>
                    ))}
                  </div>

                  {/* Mobile Resume Button */}
                  <Link href="/img/JanhaviBandhane.pdf" target="_blank">
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-medium rounded-lg shadow-lg"
                    >
                      <FiDownload className="w-4 h-4" />
                      Download Resume
                    </motion.button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};