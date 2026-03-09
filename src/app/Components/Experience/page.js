"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { 
  FiCalendar, 
  FiMapPin, 
  FiExternalLink,
  FiBriefcase,
  FiArrowRight
} from "react-icons/fi";
import { 
  HiOutlineOfficeBuilding,
  HiOutlineCode,
  HiOutlineDatabase,
  HiOutlineDeviceMobile
} from "react-icons/hi";
import { 
  SiReact, 
  SiNextdotjs, 
  SiExpress, 
  SiMongodb,
  SiTailwindcss 
} from "react-icons/si";

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const experiences = [
    {
      role: "Full Stack Developer",
      company: "Adecho Technologies",
      period: "Dec 2023 - July 2024",
      duration: "7 months",
      location: "Remote",
      details: [
        "Developed full-stack web applications using React.js for frontend and Express.js with MongoDB for backend",
        "Built responsive and dynamic user interfaces with React.js and Tailwind CSS",
        "Designed and implemented RESTful APIs using Express.js for seamless data flow",
        "Worked with MongoDB for database design, queries, and data modeling",
        "Collaborated with team members to deliver features in an agile environment"
      ],
      technologies: [
        { name: "React.js", icon: SiReact, color: "text-sky-400" },
        { name: "Express.js", icon: SiExpress, color: "text-gray-300" },
        { name: "MongoDB", icon: SiMongodb, color: "text-green-400" },
        { name: "Tailwind CSS", icon: SiTailwindcss, color: "text-cyan-400" }
      ],
      type: "Full-time",
      responsibilities: ["Frontend Development", "API Development", "Database Design"]
    },
    {
      role: "Frontend Developer",
      company: "LNV Digital System",
      period: "April 2025 - Present",
      duration: "Current",
      location: "On-site",
      details: [
        "Working on ERP system development using Next.js and React.js for enterprise solutions",
        "Implementing responsive and performant user interfaces with Next.js and Tailwind CSS",
        "Gaining hands-on experience with React Native basics for mobile app development",
        "Collaborating with cross-functional teams to deliver ERP modules and features",
        "Contributing to code optimization and best practices implementation"
      ],
      technologies: [
        { name: "Next.js", icon: SiNextdotjs, color: "text-white" },
        { name: "React.js", icon: SiReact, color: "text-sky-400" },
        { name: "React Native", icon: SiReact, color: "text-emerald-400" },
        { name: "Tailwind CSS", icon: SiTailwindcss, color: "text-cyan-400" }
      ],
      type: "Full-time",
      responsibilities: ["ERP Development", "UI/UX Implementation", "Mobile Basics"]
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
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

  return (
    <section
      id="experience"
      ref={ref}
      className="relative py-20 md:py-28 overflow-hidden bg-black"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#4f4f4f1a_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f1a_1px,transparent_1px)] bg-[size:64px_64px]" />
        
        {/* Gradient Orbs */}
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
          className="absolute top-20 -left-20 w-96 h-96 bg-blue-500/5 rounded-full mix-blend-screen filter blur-3xl"
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
          className="absolute bottom-20 -right-20 w-96 h-96 bg-purple-500/5 rounded-full mix-blend-screen filter blur-3xl"
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
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-white/90 bg-clip-text text-transparent">
              Work Experience
            </span>
          </h2>
          <div className="w-24 h-1 bg-white/70 mx-auto mb-6 rounded-full" />
          <p className="text-gray-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
            <span className="text-blue-400 font-semibold">1.7+ years</span> of hands-on experience across{' '}
            <span className="text-purple-400 font-semibold">2 companies</span> in full-stack and frontend development
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-5xl mx-auto">
          {/* Timeline Line - Hidden on mobile */}
          <div className="hidden md:block absolute left-[120px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500/30 via-purple-500/30 to-pink-500/30" />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-8 md:space-y-12"
          >
            {experiences.map((exp, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="relative group"
              >
                <div className="flex flex-col md:flex-row gap-4 md:gap-8">
                  {/* Timeline Left - Date & Type */}
                  <div className="md:w-[200px] flex-shrink-0">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl p-4 md:p-5 border border-white/5 backdrop-blur-sm"
                    >
                      <div className="flex items-center gap-2 text-blue-400 mb-2">
                        <FiCalendar className="w-4 h-4" />
                        <span className="text-sm font-medium">{exp.period}</span>
                      </div>
                      <div className="flex items-center gap-2 text-purple-400 mb-2">
                        <FiBriefcase className="w-4 h-4" />
                        <span className="text-xs font-medium bg-white/5 px-2 py-1 rounded-full">
                          {exp.type}
                        </span>
                      </div>
                      {exp.location && (
                        <div className="flex items-center gap-2 text-gray-400 text-xs">
                          <FiMapPin className="w-3 h-3" />
                          <span>{exp.location}</span>
                        </div>
                      )}
                      {exp.duration === "Current" && (
                        <div className="mt-3">
                          <span className="text-xs font-medium bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-400 px-2 py-1 rounded-full animate-pulse">
                            Currently Working
                          </span>
                        </div>
                      )}
                    </motion.div>
                  </div>

                  {/* Timeline Right - Content */}
                  <div className="flex-1">
                    <motion.div
                      whileHover={{ y: -4 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="bg-gradient-to-b from-[#1a1a1f] to-[#0f0f13] rounded-2xl p-5 md:p-6 lg:p-8 border border-white/5 hover:border-blue-500/20 transition-all duration-500 shadow-xl hover:shadow-2xl relative overflow-hidden"
                    >
                      {/* Background gradient on hover */}
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      {/* Header */}
                      <div className="relative z-10">
                        <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                          <div>
                            <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">
                              {exp.role}
                            </h3>
                            <div className="flex items-center gap-2 text-gray-300">
                              <HiOutlineOfficeBuilding className="w-4 h-4 text-purple-400" />
                              <span className="text-sm sm:text-base font-medium">
                                {exp.company}
                              </span>
                              <span className={`text-xs px-2 py-0.5 rounded-full ${
                                exp.duration === "Current" 
                                  ? "bg-green-500/20 text-green-400" 
                                  : "bg-blue-500/20 text-blue-400"
                              }`}>
                                {exp.duration}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Responsibilities Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {exp.responsibilities.map((resp, i) => (
                            <span
                              key={i}
                              className="px-2 py-1 text-xs bg-white/5 rounded-lg border border-white/5 text-gray-300"
                            >
                              {resp}
                            </span>
                          ))}
                        </div>

                        {/* Details List */}
                        <ul className="space-y-3 mb-4">
                          {exp.details.map((detail, i) => (
                            <motion.li
                              key={i}
                              initial={{ opacity: 0, x: -20 }}
                              animate={isInView ? { opacity: 1, x: 0 } : {}}
                              transition={{ delay: 0.5 + i * 0.1 }}
                              className="flex items-start gap-3 text-sm sm:text-base text-gray-400"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 mt-2 flex-shrink-0" />
                              <span>{detail}</span>
                            </motion.li>
                          ))}
                        </ul>

                        {/* Technologies */}
                        <div className="flex flex-wrap gap-3">
                          {exp.technologies.map((tech, i) => {
                            const Icon = tech.icon;
                            return (
                              <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                transition={{ delay: 0.8 + i * 0.05 }}
                                className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg border border-white/5 hover:border-blue-500/30 transition-colors cursor-default group/tech"
                              >
                                <Icon className={`w-4 h-4 ${tech.color} group-hover/tech:scale-110 transition-transform`} />
                                <span className="text-xs font-medium text-gray-300">
                                  {tech.name}
                                </span>
                              </motion.div>
                            );
                          })}
                        </div>

                        {/* Tech Stack Summary for 1st Company */}
                        {idx === 0 && (
                          <div className="mt-4 p-3 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-lg border border-white/5">
                            <p className="text-xs text-gray-400 flex items-center gap-2">
                              <HiOutlineDatabase className="w-3 h-3 text-blue-400" />
                              <span>Full Stack: React.js + Express.js + MongoDB</span>
                            </p>
                          </div>
                        )}

                        {/* Tech Stack Summary for 2nd Company */}
                        {idx === 1 && (
                          <div className="mt-4 p-3 bg-gradient-to-r from-emerald-500/5 to-cyan-500/5 rounded-lg border border-white/5">
                            <p className="text-xs text-gray-400 flex items-center gap-2">
                              <HiOutlineDeviceMobile className="w-3 h-3 text-emerald-400" />
                              <span>ERP Development: Next.js + React Native (Basics)</span>
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Hover Gradient Line */}
                      <motion.div
                        initial={{ width: "0%" }}
                        whileHover={{ width: "100%" }}
                        transition={{ duration: 0.3 }}
                        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-b-2xl"
                      />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Summary Banner */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1, duration: 0.5 }}
            className="mt-12 p-6 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl border border-white/5 backdrop-blur-sm"
          >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                  <HiOutlineCode className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h4 className="text-white font-semibold">Tech Stack Overview</h4>
                  <p className="text-sm text-gray-400">
                    React.js • Next.js • Express.js • MongoDB • React Native (Basics)
                  </p>
                </div>
              </div>
              <motion.button
                whileHover={{ x: 5 }}
                className="flex items-center gap-2 text-blue-400 hover:text-purple-400 transition-colors group"
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <span className="text-sm font-medium">View Projects</span>
                <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};