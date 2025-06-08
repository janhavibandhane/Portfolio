 "use client";
import { useState, useEffect, useCallback } from "react";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import headerImg from '../../../../public/img/header-img.svg'; // keep your original header image path

export const Banner = () => {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const toRotate = ["Web Developer", "Web Designer", "UI/UX Designer"];
  const period = 2000;

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  // useCallback to memoize tick so it doesn't cause useEffect to re-run unnecessarily
  const tick = useCallback(() => {
    const i = loopNum % toRotate.length;
    const fullText = toRotate[i];
    const updatedText = isDeleting
      ? fullText.substring(0, text.length - 1)
      : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta((prev) => prev / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setDelta(period);
    } else if (isDeleting && updatedText === "") {
      setIsDeleting(false);
      setLoopNum((prev) => prev + 1);
      setDelta(500);
    }
  }, [isDeleting, loopNum, text, toRotate, period]);

  useEffect(() => {
    const ticker = setInterval(() => tick(), delta);
    return () => clearInterval(ticker);
  }, [delta, tick]);

  return (
    <section id="home" className="relative w-full max-h-screen py-16 bg-base-300 text-white">
      {/* Background image div */}
      <div
        className="absolute inset-0 bg-no-repeat bg-center bg-cover min-h-screen"
        style={{ backgroundImage: "url('/img/banner-bg.png')" }}
      />

      {/* Content container with relative z-index */}
      <div className="relative container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
        {/* Text Content */}
        <div
          ref={ref}
          className={`transition-opacity duration-1000 ${inView ? "opacity-100" : "opacity-0"} w-full md:w-2/3 mt-14 lg:mt-0`}
        >
          <p className="text-sm text-primary uppercase mb-2">Welcome to my Portfolio</p>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 ">
            Hi! I m Janhavi&nbsp;
            <span className="text-white">{text}</span>
          </h1>
          <p className="text-base text-white opacity-50 mb-6">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
          </p>

          <button
            className="btn btn-primary"
            onClick={() => console.log("connect")}
          >
            Let's Connect
          </button>
        </div>

        {/* Header Image */}
        <div
          className={`transition-transform duration-1000 ${inView ? "scale-100" : "scale-90 opacity-0"} w-90 md:w-1/3`}
        >
          <Image
            src={headerImg}
            alt="Header Image"
            className="w-full h-auto"
            priority
          />
        </div>
      </div>
    </section>
  );
};
