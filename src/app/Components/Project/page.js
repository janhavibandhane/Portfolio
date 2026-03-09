'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ProjectCard from '../ReuseableComponent/ProjectCard/page';
import colorSharp2 from '../../../../public/img/color-sharp2.png';
import Link from 'next/link';
import { 
  FiBriefcase, 
  FiUser, 
  FiCode, 
  FiGithub, 
  FiExternalLink,
  FiFolder,
  FiArrowRight
} from 'react-icons/fi';
import { HiOutlineSparkles, HiOutlineChip } from 'react-icons/hi';

const Projects = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [activeTab, setActiveTab] = useState(1);
  const [hoveredProject, setHoveredProject] = useState(null);

  // Company Projects (Adecho Technologies)
  const companyProjects = [
    {
      id: 1,
      title: 'Adecho Technologies Website',
      description: 'Corporate website built with React and modern UI/UX principles for Adecho Technologies.',
      imgUrl: '/img/image.png',
      link: 'https://servicebased.netlify.app/',
      github: 'https://github.com/VAPStechnology/adecho-website',
      tech: ['React', 'Tailwind CSS', 'Netlify'],
      category: 'Company',
      year: '2024',
      features: ['Responsive Design', 'Modern UI', 'Performance Optimized']
    },
    {
      id: 2,
      title: '700 Form Application',
      description: 'Comprehensive form management system with dynamic fields and validation.',
      imgUrl: '/img/img2.png',
      link: 'https://github.com/VAPStechnology/frontend-700-Form-',
      github: 'https://github.com/VAPStechnology/frontend-700-Form-',
      tech: ['React', 'Node.js', 'MongoDB'],
      category: 'Company',
      year: '2024',
      features: ['Form Validation', 'Dynamic Fields', 'Data Management']
    },
    {
      id: 3,
      title: 'Avayaan Infra-Structure',
      description: 'Infrastructure management platform for construction and real estate projects.',
      imgUrl: 'https://github.com/VAPStechnology/AvayaanInfra-Structure/blob/main/public/images/image6.jpg?raw=true',
      link: 'https://github.com/VAPStechnology/AvayaanInfra-Structure',
      github: 'https://github.com/VAPStechnology/AvayaanInfra-Structure',
      tech: ['Next.js', 'Tailwind CSS', 'MongoDB'],
      category: 'Company',
      year: '2024',
      features: ['Project Management', 'Real-time Updates', 'Dashboard']
    },
  ];

  // Personal Projects
  const personalProjects = [
    {
      id: 4,
      title: 'Portfolio Website',
      description: 'Personal portfolio showcasing my work and skills with modern animations.',
      imgUrl: '/img/Portfolio.png',
      link: 'https://janhavibandhaneportfolio.netlify.app/',
      github: 'https://github.com/janhavibandhane/portfolio',
      tech: ['Next.js', 'Framer Motion', 'Tailwind CSS'],
      category: 'Personal',
      year: '2024',
      features: ['Animations', 'Responsive', 'Dark Theme']
    },
    {
      id: 5,
      title: 'ContentFuel Mobile App',
      description: 'Mobile application for content management and distribution built with React Native.',
      imgUrl: '/img/ContentFuel.jpeg',
      link: 'https://drive.google.com/drive/folders/1SLvOBUpRDD3lmHozuCBkFe-fmG_EdgpA',
      tech: ['React Native', 'Expo', 'Firebase'],
      category: 'Personal',
      year: '2024',
      features: ['Cross-platform', 'Content Management', 'Mobile UI']
    },
  ];

  // Demo Projects (Coming Soon)
  const demoProjects = [];

  const tabs = [
    { 
      id: 1, 
      label: 'Company Projects', 
      icon: FiBriefcase, 
      count: companyProjects.length,
      color: 'from-blue-400 to-blue-600',
      projects: companyProjects 
    },
    { 
      id: 2, 
      label: 'Personal Projects', 
      icon: FiUser, 
      count: personalProjects.length,
      color: 'from-purple-400 to-purple-600',
      projects: personalProjects 
    },
    { 
      id: 3, 
      label: 'Demo Projects', 
      icon: FiCode, 
      count: demoProjects.length,
      color: 'from-emerald-400 to-emerald-600',
      projects: demoProjects 
    },
  ];

  const activeTabData = tabs.find(tab => tab.id === activeTab);
  const currentProjects = activeTabData?.projects || [];

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

  const stats = [
    { label: 'Total Projects', value: companyProjects.length + personalProjects.length, icon: FiFolder },
    { label: 'Technologies Used', value: '8+', icon: HiOutlineChip },
    { label: 'GitHub Repos', value: '5+', icon: FiGithub },
  ];

  return (
    <section
      id="projects"
      ref={ref}
      className="relative py-20 md:py-28 overflow-hidden bg-black"
      style={{
        backgroundImage: `url(${colorSharp2.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundBlendMode: 'overlay',
      }}
    >
      {/* Animated Background */}
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
          className="absolute top-20 -left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
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
          className="absolute bottom-20 -right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f1a_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f1a_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Header */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-white bg-clip-text text-transparent">
                My Projects
              </span>
            </h2>
            <div className="w-24 h-1 bg-white/80 mx-auto mb-6 rounded-full" />
            <p className="text-gray-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed px-4">
              Explore my work across{' '}
              <span className="text-blue-400 font-semibold">company</span>,{' '}
              <span className="text-purple-400 font-semibold">personal</span>, and{' '}
              <span className="text-emerald-400 font-semibold">demo</span> projects
            </p>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="flex flex-wrap justify-center gap-4 mt-8 mb-10"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-white/5 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/10 flex items-center gap-3"
                >
                  <Icon className="w-5 h-5 text-blue-400" />
                  <div>
                    <span className="text-white font-bold">{stat.value}</span>
                    <span className="text-gray-400 text-sm ml-2">{stat.label}</span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex justify-center mt-4"
          >
            <div className="flex flex-wrap justify-center gap-2 p-1 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                const isDisabled = tab.count === 0;
                
                return (
                  <motion.button
                    key={tab.id}
                    onClick={() => !isDisabled && setActiveTab(tab.id)}
                    whileHover={!isDisabled ? { scale: 1.05 } : {}}
                    whileTap={!isDisabled ? { scale: 0.95 } : {}}
                    className={`relative px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl text-sm sm:text-base font-medium transition-all duration-300 flex items-center gap-2 ${
                      isActive
                        ? 'text-white'
                        : isDisabled
                        ? 'text-gray-600 cursor-not-allowed opacity-50'
                        : 'text-gray-400 hover:text-white'
                    }`}
                    disabled={isDisabled}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className={`absolute inset-0 bg-gradient-to-r ${tab.color} rounded-xl`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-2">
                      <Icon className="w-4 h-4" />
                      <span className="hidden sm:inline">{tab.label}</span>
                      <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
                      {tab.count > 0 && (
                        <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                          isActive ? 'bg-white/20' : 'bg-white/10'
                        }`}>
                          {tab.count}
                        </span>
                      )}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="mt-10"
            >
              {/* Tab-specific heading with gradient */}
              <motion.h3 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xl sm:text-2xl font-semibold mb-8 flex items-center justify-center gap-3"
              >
                <HiOutlineSparkles className={`w-5 h-5 ${
                  activeTab === 1 ? 'text-blue-400' : 
                  activeTab === 2 ? 'text-purple-400' : 'text-emerald-400'
                }`} />
                <span className="text-white/80">{activeTabData?.label}</span>
                <HiOutlineSparkles className={`w-5 h-5 ${
                  activeTab === 1 ? 'text-purple-400' : 
                  activeTab === 2 ? 'text-pink-400' : 'text-blue-400'
                }`} />
              </motion.h3>

              {/* Project Cards Grid */}
              {currentProjects.length > 0 ? (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                >
                  {currentProjects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      variants={itemVariants}
                      onHoverStart={() => setHoveredProject(project.id)}
                      onHoverEnd={() => setHoveredProject(null)}
                    >
                      <ProjectCard 
                        {...project}
                        isHovered={hoveredProject === project.id}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-16"
                >
                  <div className="inline-block p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                    <FiCode className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                    <p className="text-gray-300 text-lg font-medium">Coming Soon!</p>
                    <p className="text-gray-500 text-sm mt-2 max-w-sm">
                      I'm currently working on exciting new projects. Stay tuned!
                    </p>
                    
                    {/* Animated Dots */}
                    <div className="flex justify-center gap-2 mt-4">
                      {[1, 2, 3].map((dot) => (
                        <motion.div
                          key={dot}
                          animate={{ y: [0, -5, 0] }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            delay: dot * 0.2,
                          }}
                          className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-400"
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* View All GitHub Button */}
          {currentProjects.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-12"
            >
              <Link href="https://github.com/janhavibandhane" target="_blank">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-300 flex items-center gap-2 mx-auto group"
                >
                  <FiGithub className="w-5 h-5" />
                  <span>View All on GitHub</span>
                  <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>
            </motion.div>
          )}

          {/* Project Stats Summary */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 1 }}
            className="mt-8 text-xs text-gray-500 flex items-center justify-center gap-4"
          >
            <span>✨ {companyProjects.length} Company Projects</span>
            <span className="w-1 h-1 rounded-full bg-gray-600" />
            <span>🚀 {personalProjects.length} Personal Projects</span>
            <span className="w-1 h-1 rounded-full bg-gray-600" />
            <span>💻 MERN Stack</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;