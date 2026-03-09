"use client";
import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  HiOutlineDocumentText,
  HiOutlineMail,
  HiOutlineCode,
  HiOutlineDeviceMobile,
  HiOutlineServer,
  HiOutlineSparkles,
  HiOutlineChip,
  HiOutlineCube,
  HiOutlineCloud,
} from "react-icons/hi";
import {
  FiGithub,
  FiLinkedin,
  FiArrowRight,
  FiDownload,
  FiAward,
  FiCalendar,
} from "react-icons/fi";
import { SiLeetcode } from "react-icons/si"; // Add this import

import headerImg from "../../../../public/img/janhaviImg.png";

export default function Banner (){
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const containerRef = useRef(null);

  const roles = useMemo(
    () => [
      "React Developer",
      "Next.js Developer",
      "MERN Stack Developer",
      "Full Stack Engineer",
    ],
    [],
  );

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: "-50px",
  });

  // Parallax scroll effects
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);

  // Typing effect
  useEffect(() => {
    const ticker = setInterval(() => {
      const i = loopNum % roles.length;
      const fullText = roles[i];

      if (isDeleting) {
        setText(fullText.substring(0, text.length - 1));
      } else {
        setText(fullText.substring(0, text.length + 1));
      }

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    }, 150);

    return () => clearInterval(ticker);
  }, [text, isDeleting, loopNum, roles]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const imageVariants = {
    hidden: { scale: 0.8, opacity: 0, x: 50 },
    visible: {
      scale: 1,
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: 0.3,
      },
    },
  };

  const floatingIcons = [
    {
      Icon: HiOutlineCode,
      color: "text-blue-400",
      delay: 0,
      position: "top-4 right-4",
      label: "React",
    },
    {
      Icon: HiOutlineServer,
      color: "text-purple-400",
      delay: 1,
      position: "bottom-4 left-4",
      label: "Next.js",
    },
    {
      Icon: HiOutlineDeviceMobile,
      color: "text-emerald-400",
      delay: 2,
      position: "top-1/2 -right-2",
      label: "React Native",
    },
    {
      Icon: HiOutlineChip,
      color: "text-amber-400",
      delay: 1.5,
      position: "top-1/3 -left-4",
      label: "Express",
    },
    {
      Icon: HiOutlineCloud,
      color: "text-cyan-400",
      delay: 2.5,
      position: "bottom-1/3 -right-3",
      label: "MongoDB",
    },
  ];

  const particleCount = 20;
  const particles = useMemo(
    () =>
      Array.from({ length: particleCount }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 1,
        duration: Math.random() * 10 + 10,
        delay: Math.random() * 5,
      })),
    [],
  );

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden bg-black pt-24 pb-20"
    >
      {/* Animated Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_50% at_50%_0%,#000_70%,transparent_110%)]" />

      {/* Animated Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute bg-white/10 rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: particle.size,
              height: particle.size,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Gradient Orbs with Parallax */}
      <motion.div style={{ y, opacity }} className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-20 -left-20 w-96 h-96 bg-blue-500/10 rounded-full mix-blend-screen filter blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-20 -right-20 w-96 h-96 bg-purple-500/10 rounded-full mix-blend-screen filter blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            x: [0, 30, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/5 rounded-full mix-blend-screen filter blur-3xl"
        />
      </motion.div>

      {/* Content Container */}
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20  md:py-0 z-10 ">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20">
          {/* Left Content - Text */}
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="flex-1 text-center lg:text-left"
          >
            {/* Welcome Badge with Glow */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-8 group hover:border-blue-500/50 transition-all duration-300"
            >
              <HiOutlineSparkles className="w-4 h-4 text-blue-400 group-hover:rotate-12 transition-transform" />
              <span className="text-sm font-medium text-white/90">
                Welcome to my Portfolio
              </span>
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              variants={itemVariants}
              className="xl:text-6xl md:text-5xl text-3xl font-bold leading-[1.2]  mb-4"
            >
              <span className="text-white/80">Hi, I'm </span>
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent bg-[length:200%] animate-gradient">
                  Janhavi Bandhane
                </span>
                <motion.span
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                  className="absolute bottom-2 left-0 h-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-md -z-10 rounded-lg"
                />
              </span>
            </motion.h1>

            {/* Dynamic Role with Glitch Effect */}
            <motion.div variants={itemVariants} className="mb-6 relative">
              <span className="text-xl sm:text-2xl lg:text-3xl text-white/60">
                I'm a{" "}
              </span>
              <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text ml-2 relative">
                {text}
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="absolute -right-2 top-1/2 -translate-y-1/2 w-[3px] h-8 bg-gradient-to-b from-blue-400 to-purple-400"
                />
              </span>

              {/* Glitch effect copies */}
              <span className="absolute top-0 left-0 text-xl sm:text-2xl lg:text-3xl font-bold text-blue-400/50 ml-2 blur-sm animate-glitch1 opacity-0">
                {text}
              </span>
              <span className="absolute top-0 left-0 text-xl sm:text-2xl lg:text-3xl font-bold text-purple-400/50 ml-2 blur-sm animate-glitch2 opacity-0">
                {text}
              </span>
            </motion.div>

            {/* Description with Tech Stack */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-white/60 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
            >
              A passionate developer with{" "}
              <span className="text-white font-semibold relative inline-block group">
                1.7+ years of hands-on experience
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white/30 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </span>{" "}
              across 2 companies. Experienced in{" "}
              <span className="text-white font-medium">React.js</span>,{" "}
              <span className="text-white font-medium">Next.js</span>, with
              foundational knowledge of{" "}
              <span className="text-white font-medium">React Native</span>
              , <span className="text-white font-medium">Express.js</span>,
              and <span className="text-white font-medium">MongoDB</span>.
              Currently working at LNV Digital System since April 2025.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center lg:justify-start mb-12"
            >
              <Link href="/img/JanhaviBandhane.pdf" target="_blank">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-300 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <FiDownload className="w-5 h-5 group-hover:animate-bounce" />
                    Download Resume
                  </span>
                  <motion.div
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500"
                  />
                </motion.button>
              </Link>

              <Link href="#contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/10 text-white/90 font-medium rounded-xl hover:bg-white/10 hover:border-blue-500/30 transition-all duration-300 shadow-lg flex items-center justify-center gap-2 group"
                >
                  <HiOutlineMail className="w-5 h-5 group-hover:text-blue-400 transition-colors" />
                  Let's Connect
                  <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 group-hover:text-blue-400 transition-all" />
                </motion.button>
              </Link>
            </motion.div>

            {/* Social Links */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-4 justify-center lg:justify-start"
            >
              {[
                {
                  icon: FiGithub,
                  href: "https://github.com/janhavibandhane",
                  label: "GitHub",
                },
                {
                  icon: FiLinkedin,
                  href: "https://www.linkedin.com/in/janhavi-bandhane-b6362b255?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
                  label: "LinkedIn",
                },
                {
                  icon: SiLeetcode,
                  href: "https://leetcode.com/u/janhavibandhane/",
                  label: "Twitter",
                },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-blue-500/30 hover:bg-white/10 transition-all duration-300 group"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-white/60 group-hover:text-blue-400 transition-colors" />
                </motion.a>
              ))}
            </motion.div>

\
          </motion.div>

          {/* Right Content - Image */}
          {/* Right Content - Image */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="flex-1 relative w-full"
          >
            <div className="relative w-full max-w-[250px] xs:max-w-[280px] sm:max-w-md md:max-w-md lg:max-w-lg mx-auto">
              {/* Background decorative card with glow */}
              <motion.div
                animate={{
                  rotate: [0, 5, 0],
                  scale: [1, 1.02, 1],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-[2rem] blur-3xl"
              />

              {/* Main image container with glass morphism */}
              {/* Main image container with glass morphism */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative z-10 bg-white/5 backdrop-blur-xl rounded-2xl sm:rounded-[2rem] -mt-22 p-3 sm:p-4 md:p-5 lg:p-6 border border-white/10 shadow-2xl"
              >
                {/* Image with gradient overlay */}
                <div className="relative w-full aspect-square rounded-xl sm:rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 mix-blend-overlay z-10" />
                  <Image
                    src={headerImg}
                    alt="Janhavi Bandhane - Developer"
                    fill
                    className="object-contain drop-shadow-2xl"
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>

                {/* Floating tech icons with enhanced animations */}
                {floatingIcons.map(
                  ({ Icon, color, delay, position, label }, index) => (
                    <motion.div
                      key={index}
                      animate={{
                        y: [0, -15, 0],
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 5,
                        delay,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className={`absolute ${position} p-2 sm:p-3 bg-white/10 backdrop-blur-md rounded-lg sm:rounded-xl border border-white/10 shadow-lg group hover:border-blue-500/30 transition-colors cursor-pointer`}
                    >
                      <Icon
                        className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 ${color} group-hover:scale-110 transition-transform`}
                      />

                      {/* Tooltip - hidden on mobile */}
                      <span className="hidden sm:block absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {label}
                      </span>
                    </motion.div>
                  ),
                )}

                {/* Pulse ring effect */}
                <div className="absolute inset-0 rounded-[2rem] border border-blue-500/20 animate-pulse-slow" />
              </motion.div>

              {/* Stats Cards */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
                className=" absolute -bottom-6 -left-6 z-20 p-1 md:p-4 bg-slate-800/90 backdrop-blur-sm rounded-xl border border-white/10 shadow-xl hover:border-blue-500/30 transition-all duration-300 group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <HiOutlineDocumentText className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-white">2</div>
                    <div className="text-xs text-white/40">Companies</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                className="absolute -top-6 -right-6 z-20 p-1 md:p-4 bg-slate-800/90 backdrop-blur-sm rounded-xl border border-white/10 shadow-xl hover:border-purple-500/30 transition-all duration-300 group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-emerald-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <HiOutlineCode className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-white">1.7+</div>
                    <div className="text-xs text-white/40">Years Exp</div>
                  </div>
                </div>
              </motion.div>

              {/* Tech Stack Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 0.5 }}
                className="absolute -bottom-6 -right-6 z-20 p-1 md:p-4 bg-slate-800/90 backdrop-blur-sm rounded-xl border border-white/10 shadow-xl hover:border-emerald-500/30 transition-all duration-300 group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <HiOutlineCube className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-white">MERN</div>
                    <div className="text-xs text-white/40">React/Next.js</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="flex flex-col items-center gap-2 cursor-pointer group"
          onClick={() => {
            document
              .getElementById("about")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <span className="text-xs text-white/40 uppercase tracking-wider group-hover:text-white/60 transition-colors">
            Scroll to Explore
          </span>
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center group-hover:border-blue-400/50 transition-colors">
            <motion.div
              animate={{ y: [0, 16, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-1.5 h-1.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mt-1"
            />
          </div>
        </motion.div>
      </motion.div>

      <style jsx>{`
        @keyframes gradient {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient {
          animation: gradient 3s ease infinite;
          background-size: 200% 200%;
        }

        @keyframes glitch1 {
          0%,
          100% {
            transform: translate(0);
            opacity: 0;
          }
          33% {
            transform: translate(-2px, 1px);
            opacity: 0.5;
          }
          66% {
            transform: translate(2px, -1px);
            opacity: 0.3;
          }
        }

        @keyframes glitch2 {
          0%,
          100% {
            transform: translate(0);
            opacity: 0;
          }
          33% {
            transform: translate(2px, -1px);
            opacity: 0.5;
          }
          66% {
            transform: translate(-2px, 1px);
            opacity: 0.3;
          }
        }

        .animate-glitch1 {
          animation: glitch1 4s infinite;
        }

        .animate-glitch2 {
          animation: glitch2 4s infinite;
        }

        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.8;
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};
