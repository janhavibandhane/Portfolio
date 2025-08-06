"use client";
import colorSharp from "../../../../public/img/color-sharp.png";

export const Skills = () => {
  const skillsData = [
    { percent: 80, label: "React JS" },
    { percent: 80, label: "Next JS" },
    { percent: 80, label: "React Native Expo" },
    { percent: 85, label: "Tailwind CSS" },
    { percent: 70, label: "Express JS" },
    { percent: 70, label: "Mongo DB" },
  ];

  return (
    <section
      id="skills"
      className="relative pb-20 bg-[#131315]"
      style={{
        backgroundImage: `url(${colorSharp.src}) `,
        backgroundSize: "cover",
        backgroundPosition: "end",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="container mx-auto px-4" >
        <div className="flex justify-center">
          <div className="bg-[#151515] rounded-[64px] text-center p-10 -mt-16 max-w-6xl w-full">
            <h2 className="text-white md:text-4xl text-2xl font-bold mb-4">Skills</h2>
            <p className="text-gray-400 text-md md:text-lg mb-12 leading-relaxed">
              Skilled in React, Next.js, React Native, Express.js, and MongoDB with a strong grasp of Tailwind CSS for responsive UI development.
            </p>

            <div className="flex overflow-x-auto gap-12 px-4 py-6 snap-x snap-mandatory scrollbar-hide">
              {skillsData.map(({ percent, label }, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 snap-center flex flex-col items-center bg-[#1e1e1e] p-6 rounded-3xl shadow-xl hover:scale-105 transition-transform duration-300 ease-in-out w-[220px]"
                >
                  <div
                    className="radial-progress text-transparent"
                    style={{
                      "--value": percent,
                      "--size": "13rem",
                      "--thickness": "2rem",
                      background: "conic-gradient(#3b82f6, #ec4899, #8b5cf6)",
                      WebkitMask: `radial-gradient(farthest-side, transparent calc(100% - 2rem), black calc(100% - 2rem))`,
                      mask: `radial-gradient(farthest-side, transparent calc(100% - 2rem), black calc(100% - 2rem))`,
                      color: "rgba(255, 255, 255, 0.4)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    role="progressbar"
                    aria-valuenow={percent}
                  ></div>
                  <div className="text-white font-bold text-xl mt-4">
                    {label}
                  </div>
                  <span className="text-white text-2xl font-semibold ">
                    {percent}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
