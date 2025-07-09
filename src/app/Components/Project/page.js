'use client';

import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { ProjectCard } from '../ReuseableComponent/ProjectCard/page';
import colorSharp2 from '../../../../public/img/color-sharp2.png';
import Link from 'next/link';

const Projects = () => {
  const { ref, inView } = useInView({ triggerOnce: true });
  const [activeTab, setActiveTab] = useState(1);

  const tab1Projects = [
    {
      title: 'Adecho Technologies Website',
      imgUrl: '/img/image.png',
      link: 'https://servicebased.netlify.app/',
    },
    {
      title: '700 Form',
      imgUrl: '/img/img2.png',
      link: 'https://github.com/VAPStechnology/frontend-700-Form-',
    },
    {
      title: 'AvayaanInfra-Structure',
      imgUrl: 'https://github.com/VAPStechnology/AvayaanInfra-Structure/blob/main/public/images/image6.jpg?raw=true', // Add a placeholder image to /public/img/
      link: 'https://github.com/VAPStechnology/AvayaanInfra-Structure',
    },
  ];

  const tab2Projects = [
    {
      title: 'Portfolio Website',
      imgUrl: '/img/Portfolio.png',
      link: 'https://janhavibandhaneportfolio.netlify.app/',
    },
    // {
    //   title: 'E-commerce Site',
    //   imgUrl: '/img/project-img3.png',
    //   link: '#',
    // },
    // {
    //   title: 'Portfolio Website',
    //   imgUrl: '/img/image.png',
    //   link: '#',
    // },
  ];

  const tab3Projects = [
    // {
    //   title: 'Admin Panel',
    //   imgUrl: '/img/project-img3.png',
    //   link: '#',
    // },
    // {
    //   title: 'Chat Application',
    //   imgUrl: '/img/img2.png',
    //   link: '#',
    // },
    // {
    //   title: 'Landing Page',
    //   imgUrl: '/img/image.png',
    //   link: '#',
    // },
  ];

  const getProjects = () => {
    if (activeTab === 1) return tab1Projects;
    if (activeTab === 2) return tab2Projects;
    return tab3Projects;
  };

  const getTabHeading = () => {
    if (activeTab === 1) return 'Projects at Adecho Technologies';
    if (activeTab === 2) return 'Personal Projects';
    return 'Personal Projects';
  };

  return (
    <section
      id="projects"
      className="relative bg-black py-20"
      style={{
        backgroundImage: `url(${colorSharp2.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'end',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="container mx-auto px-4" ref={ref}>
        <div
          className={`text-center transition-opacity duration-1000 ${
            inView ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <h2 className="text-4xl font-bold text-white">Projects</h2>
          <p className="text-gray-400 text-lg mt-4 mx-auto max-w-2xl">
            Explore my work across company, personal, and demo projects.
          </p>

          {/* Tabs */}
          <div className="flex justify-center mt-8">
            <div className="flex space-x-2 rounded-full overflow-hidden bg-white/10 w-3/4 md:w-2/3">
              <button
                onClick={() => setActiveTab(1)}
                className={`w-1/3 py-2 text-white ${
                  activeTab === 1
                    ? 'bg-gradient-to-r from-pink-500 to-purple-500'
                    : 'hover:bg-gradient-to-r from-pink-500 to-purple-500'
                }`}
              >
                Adecho Projects
              </button>
              <button
                onClick={() => setActiveTab(2)}
                className={`w-1/3 py-2 text-white ${
                  activeTab === 2
                    ? 'bg-gradient-to-r from-pink-500 to-purple-500'
                    : 'hover:bg-gradient-to-r from-pink-500 to-purple-500'
                }`}
              >
                Other Projects
              </button>
              <button
                onClick={() => setActiveTab(3)}
                className={`w-1/3 py-2 text-white ${
                  activeTab === 3
                    ? 'bg-gradient-to-r from-pink-500 to-purple-500'
                    : 'hover:bg-gradient-to-r from-pink-500 to-purple-500'
                }`}
              >
                Other Projects
              </button>
            </div>
          </div>

          {/* Tab-specific heading */}
          <h3 className="text-2xl text-white font-semibold mt-12">
            {getTabHeading()}
          </h3>

          {/* Project Cards */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {getProjects().map((project, index) => (
              <Link href={project.link} key={index}>
                <ProjectCard imgUrl={project.imgUrl} title={project.title} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
