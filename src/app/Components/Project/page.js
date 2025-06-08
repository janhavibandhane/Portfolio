// components/Projects.js
'use client';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import { ProjectCard } from '../ReuseableComponent/ProjectCard/page';
import adecho from "../../../../public/img/image.png";
import projImg2 from '../../../../public/img/project-img2.png';
import projImg3 from '../../../../public/img/project-img3.png';
import colorSharp2 from '../../../../public/img/color-sharp2.png';
import Link from 'next/link';

const Project = () => {
  const { ref, inView } = useInView({ triggerOnce: true });

//   const projects = [
//     { title: 'Business Startup', description: 'Design & Development', imgUrl: projImg1 },
//     { title: 'Business Startup', description: 'Design & Development', imgUrl: projImg2 },
//     { title: 'Business Startup', description: 'Design & Development', imgUrl: projImg3 },
//     { title: 'Business Startup', description: 'Design & Development', imgUrl: projImg1 },
//     { title: 'Business Startup', description: 'Design & Development', imgUrl: projImg2 },
//     { title: 'Business Startup', description: 'Design & Development', imgUrl: projImg3 },
//   ];

  return (
    <section id="projects" className="relative bg-black py-20"
     style={{
            backgroundImage: `url(${colorSharp2.src}) `,
            backgroundSize: "cover",
            backgroundPosition: "end",
            backgroundRepeat: "no-repeat",
     }}
    >
      <div className="container mx-auto px-4" ref={ref}>
        <div className={`text-center transition-opacity duration-1000 ${inView ? 'opacity-100' : 'opacity-0'}`}>
          <h2 className="text-4xl font-bold text-white">Projects</h2>
          <p className="text-gray-400 text-lg mt-4 mx-auto max-w-2xl">
          </p>

          <div className="flex justify-center mt-8">
            <div className="flex space-x-2 rounded-full overflow-hidden bg-white/10 w-3/4 md:w-2/3">
              <button className="w-1/3 py-2 text-white bg-gradient-to-r from-pink-500 to-purple-500">Tab 1</button>
              <button className="w-1/3 py-2 text-white hover:bg-gradient-to-r from-pink-500 to-purple-500">Tab 2</button>
              <button className="w-1/3 py-2 text-white hover:bg-gradient-to-r from-pink-500 to-purple-500">Tab 3</button>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <Link href='https://servicebased.netlify.app/'>
            <ProjectCard
            imgUrl={'/img/image.png'}
            title={"Adecho Technologies"}
            ></ProjectCard>
            </Link>
           <Link href='/Components/ReuseableComponent/ProjectVideo'>
            <ProjectCard
            imgUrl={'/img/img2.png'}
            title={"700 Form"}
            ></ProjectCard>
            </Link>
            <Link href='https://saleshelper.netlify.app/'>
            <ProjectCard
            imgUrl={'/img/img3.png.png'}
            title={"Sales Helper"}
            ></ProjectCard>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Project;
