"use client";
import { useState } from "react";
import Image from "next/image";
import ContactImg from "../../../../public/img/contact-img.svg";

export default function Contact() {
  const formInitialDetails = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  };

  const [formDetails, setFormDetails] = useState(formInitialDetails);
  const [buttonText, setButtonText] = useState("Send");
  const [status, setStatus] = useState({});

  const onFormUpdate = (category, value) => {
    setFormDetails({ ...formDetails, [category]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonText("Sending...");
    try {
      const response = await fetch("/api/contact", {
        // Assuming Next.js API route at /api/contact
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formDetails),
      });

      const result = await response.json();
      setButtonText("Send");
      setFormDetails(formInitialDetails);

      if (result.code === 200) {
        setStatus({ success: true, message: "Message sent successfully" });
      } else {
        setStatus({
          success: false,
          message: "Something went wrong, please try again later.",
        });
      }
    } catch (error) {
      setButtonText("Send");
      setStatus({
        success: false,
        message: "Network error, please try again later.",
      });
    }
  };

  return (
    <section
      id="connect"
      className="bg-gradient-to-r from-[#a03582] via-[#7a329c] to-[#5830b3] py-16 px-6 md:px-20"
    >
      <div className="max-w-7xl mx-auto flex flex-col items-center lg:flex-row lg:justify-around  gap-12">
        {/* Left Image */}
        <div className="flex-1 md:max-w-xl mt-4">
          <Image
            src={ContactImg}
            alt="Contact Us"
            width={500}
            height={500}
            className="animate-zoomIn"
            priority
          />
        </div>

        {/* Right Form */}
        <div className="flex-1 max-w-2xl  backdrop-blur-md rounded-3xl p-10 ">
          <h2 className="text-4xl font-bold mb-8 text-white">Get In Touch</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                value={formDetails.firstName}
                placeholder="First Name"
                onChange={(e) => onFormUpdate("firstName", e.target.value)}
                className="input input-bordered w-full h-18 rounded-xl border-white bg-white/25 text-white placeholder-white"
                required
              />

              <input
                type="text"
                value={formDetails.firstName}
                placeholder="First Name"
                onChange={(e) => onFormUpdate("firstName", e.target.value)}
                className="input input-bordered  w-full h-18 rounded-xl border-white bg-white/25 text-white placeholder-white"
                required
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                value={formDetails.firstName}
                placeholder="First Name"
                onChange={(e) => onFormUpdate("firstName", e.target.value)}
                className="input input-bordered h-18 rounded-xl w-full border-white bg-white/25 text-white placeholder-white"
                required
              />
              <input
                type="text"
                value={formDetails.firstName}
                placeholder="First Name"
                onChange={(e) => onFormUpdate("firstName", e.target.value)}
                className="input input-bordered h-18 rounded-xl w-full border-white bg-white/25 text-white placeholder-white"
                required
              />
            </div>
            <textarea
              rows="6"
              value={formDetails.message}
              placeholder="Message"
              onChange={(e) => onFormUpdate("message", e.target.value)}
                className="input input-bordered h-24  rounded-xl p-2 w-full border-white bg-white/25 text-white placeholder-white"
              required
            ></textarea>

            <button
              type="submit"
              className="btn btn-primary w-full text-black font-bold h-14 rounded-lg  bg-white hover:bg-gray-200 transition"
            >
              {buttonText}
            </button>

            {status.message && (
              <p
                className={`mt-4 text-center ${
                  status.success ? "text-green-400" : "text-red-500"
                }`}
              >
                {status.message}
              </p>
            )}
          </form>
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes zoomIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-zoomIn {
          animation: zoomIn 1s ease forwards;
        }
      `}</style>
    </section>
  );
}
