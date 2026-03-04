"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { 
  SiReact, 
  SiNextdotjs, 
  SiTailwindcss, 
  SiExpress, 
  SiMongodb,
  SiExpo,
  SiTypescript,
  SiJavascript,
  SiNodedotjs,
  SiHtml5,
  SiCss3
} from "react-icons/si";
import colorSharp from "../../../../public/img/color-sharp.png";

export const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const skillsData = [
    { 
      label: "React JS", 
      icon: SiReact, 
      color: "text-sky-400",
      bgColor: "from-sky-500/20 to-blue-600/20",
      iconBg: "from-sky-500 to-blue-600",
      level: "Advanced"
    },
    { 
      label: "Next JS", 
      icon: SiNextdotjs, 
      color: "text-white",
      bgColor: "from-gray-500/20 to-gray-800/20",
      iconBg: "from-gray-600 to-gray-800",
      level: "Advanced"
    },
    { 
      label: "React Native", 
      icon: SiExpo, 
      color: "text-purple-400",
      bgColor: "from-purple-500/20 to-pink-600/20",
      iconBg: "from-purple-500 to-pink-600",
      level: "Intermediate"
    },
    { 
      label: "Tailwind CSS", 
      icon: SiTailwindcss, 
      color: "text-cyan-400",
      bgColor: "from-cyan-500/20 to-teal-600/20",
      iconBg: "from-cyan-500 to-teal-600",
      level: "Expert"
    },
    { 
      label: "Express JS", 
      icon: SiExpress, 
      color: "text-gray-300",
      bgColor: "from-gray-600/20 to-gray-800/20",
      iconBg: "from-gray-600 to-gray-800",
      level: "Intermediate"
    },
    { 
      label: "MongoDB", 
      icon: SiMongodb, 
      color: "text-green-400",
      bgColor: "from-green-500/20 to-emerald-600/20",
      iconBg: "from-green-500 to-emerald-600",
      level: "Intermediate"
    },
    { 
      label: "Node.js", 
      icon: SiNodedotjs, 
      color: "text-green-500",
      bgColor: "from-green-600/20 to-emerald-700/20",
      iconBg: "from-green-600 to-emerald-700",
      level: "Intermediate"
    },
    { 
      label: "JavaScript", 
      icon: SiJavascript, 
      color: "text-yellow-400",
      bgColor: "from-yellow-500/20 to-amber-600/20",
      iconBg: "from-yellow-500 to-amber-600",
      level: "Advanced"
    },

  ];

  // Group skills by category
  const categories = {
    "Frontend": skillsData.slice(0, 4),
    "Backend": skillsData.slice(4, 6),
    "Languages": skillsData.slice(6, 9),
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const getLevelColor = (level) => {
    switch(level) {
      case "Expert": return "text-amber-400";
      case "Advanced": return "text-emerald-400";
      case "Intermediate": return "text-blue-400";
      default: return "text-gray-400";
    }
  };

  const getLevelDots = (level) => {
    switch(level) {
      case "Expert": return 5;
      case "Advanced": return 4;
      case "Intermediate": return 3;
      default: return 2;
    }
  };

  return (
    <section
      id="skills"
      ref={ref}
      className="relative py-20 md:py-28 overflow-hidden bg-black"
      style={{
        backgroundImage: `url(${colorSharp.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundBlendMode: "overlay",
      }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
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
          className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
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
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f1a_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f1a_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center">
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="w-full max-w-7xl"
          >
            {/* Header Section */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-center mb-12 md:mb-16"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Technical Expertise
                </span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6 rounded-full" />
              <p className="text-gray-400 text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed px-4">
                A comprehensive toolkit for building modern web and mobile applications. 
                From <span className="text-blue-400 font-semibold">frontend</span> to{' '}
                <span className="text-purple-400 font-semibold">backend</span>, I've got you covered.
              </p>
            </motion.div>

            {/* Skills by Category */}
            {Object.entries(categories).map(([category, skills], categoryIndex) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + categoryIndex * 0.2 }}
                className="mb-10 md:mb-12"
              >
                <h3 className="text-xl sm:text-2xl font-semibold text-white/80 mb-6 flex items-center gap-3">
                  <span className="w-8 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500" />
                  {category}
                  <span className="w-8 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500" />
                </h3>

                <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5"
                >
                  {skills.map((skill, i) => (
                    <motion.div
                      key={i}
                      variants={itemVariants}
                      whileHover={{ 
                        y: -5,
                        transition: { type: "spring", stiffness: 400, damping: 10 }
                      }}
                      className="group relative bg-gradient-to-b from-[#1a1a1f] to-[#0f0f13] rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-white/5 hover:border-blue-500/30 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      {/* Background glow on hover */}
                      <div className={`absolute inset-0 bg-gradient-to-r ${skill.bgColor} opacity-0 group-hover:opacity-100 rounded-xl sm:rounded-2xl transition-opacity duration-300 blur-md`} />
                      
                      <div className="relative z-10">
                        {/* Icon */}
                        <div className="flex justify-center mb-3">
                          <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br ${skill.iconBg} p-0.5`}>
                            <div className="w-full h-full rounded-lg sm:rounded-xl bg-[#1e1e24] flex items-center justify-center">
                              <skill.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${skill.color} group-hover:scale-110 transition-transform duration-300`} />
                            </div>
                          </div>
                        </div>

                        {/* Label */}
                        <h4 className="text-white font-semibold text-sm sm:text-base mb-2 text-center">
                          {skill.label}
                        </h4>

                        {/* Level Indicator */}
                        <div className="flex flex-col items-center gap-1">
                          <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((level) => (
                              <div
                                key={level}
                                className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${
                                  level <= getLevelDots(skill.level)
                                    ? `bg-gradient-to-r ${skill.iconBg}`
                                    : "bg-gray-700"
                                }`}
                              />
                            ))}
                          </div>
                          <span className={`text-[10px] sm:text-xs font-medium ${getLevelColor(skill.level)}`}>
                            {skill.level}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            ))}

            {/* Additional Info Banner */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.2, duration: 0.5 }}
              className="mt-12 p-4 sm:p-6 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-xl sm:rounded-2xl border border-white/5 backdrop-blur-sm"
            >
              <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs sm:text-sm text-gray-300">Expert (5/5)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-400" />
                  <span className="text-xs sm:text-sm text-gray-300">Advanced (4/5)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-purple-400" />
                  <span className="text-xs sm:text-sm text-gray-300">Intermediate (3/5)</span>
                </div>
                <div className="w-px h-4 bg-white/10" />
                <span className="text-xs sm:text-sm text-gray-300">
                  ⚡ <span className="text-blue-400 font-semibold">1.7+ years</span> experience
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};